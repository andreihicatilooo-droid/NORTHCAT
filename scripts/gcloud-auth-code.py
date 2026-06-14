#!/usr/bin/env python3
"""gcloud auth login --no-launch-browser с вводом кода в той же сессии (PKCE)."""
import os
import pty
import select
import subprocess
import sys


def main() -> int:
    code = sys.argv[1] if len(sys.argv) > 1 else None

    master, slave = pty.openpty()
    proc = subprocess.Popen(
        ["gcloud", "auth", "login", "--no-launch-browser"],
        stdin=slave,
        stdout=slave,
        stderr=slave,
        close_fds=True,
    )
    os.close(slave)

    buf = b""
    sent = False
    while proc.poll() is None or select.select([master], [], [], 0)[0]:
        ready, _, _ = select.select([master], [], [], 0.2)
        if not ready:
            if proc.poll() is not None:
                break
            continue
        try:
            chunk = os.read(master, 4096)
        except OSError:
            break
        if not chunk:
            break
        buf += chunk
        sys.stdout.buffer.write(chunk)
        sys.stdout.buffer.flush()

        if not sent and b"verification code" in buf.lower():
            if not code:
                try:
                    if sys.stdin.isatty():
                        code = input("\nВставь verification code: ").strip()
                    else:
                        code = sys.stdin.readline().strip()
                except EOFError:
                    print("\nEOF — запусти в терминале Cursor вручную.", file=sys.stderr)
                    proc.terminate()
                    return 1
                if not code:
                    print(
                        "\nОшибка: пустой verification code.",
                        file=sys.stderr,
                    )
                    print(
                        "  python3 scripts/gcloud-auth-code.py <verification-code>",
                        file=sys.stderr,
                    )
                    print(
                        "  или: ./scripts/gcloud-auth-finish.sh <verification-code>",
                        file=sys.stderr,
                    )
                    proc.terminate()
                    return 1
            os.write(master, (code + "\n").encode())
            sent = True

    while True:
        ready, _, _ = select.select([master], [], [], 0.1)
        if not ready:
            break
        try:
            chunk = os.read(master, 4096)
        except OSError:
            break
        if not chunk:
            break
        sys.stdout.buffer.write(chunk)
        sys.stdout.buffer.flush()

    return proc.wait()


if __name__ == "__main__":
    raise SystemExit(main())
