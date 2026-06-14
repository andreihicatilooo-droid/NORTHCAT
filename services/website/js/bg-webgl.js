/* ===================================================================
   NORTHCAT — bg-webgl.js
   Динамический WebGL-фон: абстрактные геометрические сетки,
   которые «дышат» во времени и реагируют на движение мыши.
   Чистый WebGL, без зависимостей. Гасит себя при отсутствии WebGL
   и уважает prefers-reduced-motion.
   =================================================================== */
(function () {
    'use strict';

    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;

    const gl =
        canvas.getContext('webgl', {
            alpha: true,
            premultipliedAlpha: false,
            antialias: true,
            depth: false,
            stencil: false,
            powerPreference: 'low-power'
        }) || canvas.getContext('experimental-webgl');

    if (!gl) { canvas.style.display = 'none'; return; }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ------------------------- Шейдеры ------------------------- */
    const vertSrc = `
        attribute vec2 a_pos;
        void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
    `;

    const fragSrc = `
        precision highp float;
        uniform vec2  u_res;
        uniform vec2  u_mouse;
        uniform float u_time;

        /* --- Шум для рельефа гравюры --- */
        float hash(vec2 p){
            p = fract(p * vec2(127.1, 311.7));
            p += dot(p, p + 45.32);
            return fract(p.x * p.y);
        }
        float vnoise(vec2 p){
            vec2 i = floor(p), f = fract(p);
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(mix(hash(i),               hash(i + vec2(1.0, 0.0)), u.x),
                       mix(hash(i + vec2(0.0,1.0)),hash(i + vec2(1.0, 1.0)), u.x), u.y);
        }
        float fbm(vec2 p){
            float v = 0.0, a = 0.5;
            mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
            for (int i = 0; i < 4; i++){ v += a * vnoise(p); p = m * p; a *= 0.5; }
            return v;
        }

        /* Высота гравированной поверхности: доменный варп + волна у курсора */
        float height(vec2 p, vec2 mp){
            vec2 q = vec2(fbm(p + 0.04 * u_time),
                         fbm(p + vec2(3.1, 1.7) - 0.03 * u_time));
            float h = fbm(p + 1.7 * q);
            float d = length(p - mp);
            h += 0.20 * exp(-d * d * 2.2) * sin(6.5 * d - u_time * 1.7); // рябь-объём у курсора
            return h;
        }

        /* Гравировальная штриховка: триугольная волна, гнущаяся по рельефу */
        float hatch(float coord, float width){
            float tri = abs(fract(coord) - 0.5) * 2.0;       // 0 в центре линии
            return 1.0 - smoothstep(0.0, max(width, 0.001), tri);
        }

        void main(){
            vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
            vec2 m  = (u_mouse        - 0.5 * u_res) / u_res.y;

            vec2 p  = uv * 2.3;
            vec2 mp = m  * 2.3;

            // Рельеф и нормаль (для объёма/тени)
            float e  = 0.0018;
            float hC = height(p,               mp);
            float hX = height(p + vec2(e, 0.0), mp);
            float hY = height(p + vec2(0.0, e), mp);
            vec3  n  = normalize(vec3((hC - hX) / e, (hC - hY) / e, 1.0));

            // Свет следует за курсором — даёт ощущение объёма
            vec3  ldir = normalize(vec3(mp - p, 0.85));
            float diff = clamp(dot(n, ldir) * 0.5 + 0.5, 0.0, 1.0);
            float tone = pow(diff, 1.75);                    // 1 — свет, 0 — тень

            // Базовая штриховка вдоль рельефа; в тени линии толще
            float freq   = 26.0;
            float drift  = u_time * 0.05;
            float coord1 = (p.y * 0.82 + p.x * 0.20) * freq + hC * 9.0 + drift;
            float w1     = mix(0.12, 0.52, 1.0 - tone);
            float l1     = hatch(coord1, w1);

            // Перекрёстная штриховка — проявляется только в тёмных зонах
            float coord2 = (p.y * 0.20 - p.x * 0.82) * freq + hC * 9.0 - drift;
            float w2     = mix(0.0, 0.44, clamp((0.6 - tone) / 0.6, 0.0, 1.0));
            float l2     = hatch(coord2, w2);

            float ink = max(l1, l2);

            // Контурные линии рельефа (как на гравюрах/банкнотах)
            float iso = abs(fract(hC * 7.0) - 0.5) * 2.0;
            float isoLine = (1.0 - smoothstep(0.0, 0.16, iso)) * 0.6;
            ink = max(ink, isoLine);

            // Ореол и блик у курсора
            float dm   = length(uv - m);
            float halo = exp(-dm * dm * 3.0);

            // Цвет: переливы фирменных розового и фиолетового по рельефу
            vec3 pink   = vec3(1.0, 0.231, 0.466);
            vec3 purple = vec3(0.616, 0.149, 0.804);
            float cmix  = 0.5 + 0.5 * sin(u_time * 0.15 + p.x * 1.6 + p.y * 1.2 + hC * 3.5);
            vec3 col    = mix(purple, pink, cmix);
            col += pink * halo * 0.45;

            // Объём: яркость штриха зависит от света + «рим» на крутых склонах
            float shade = 0.42 + 0.58 * diff;
            float rim   = pow(1.0 - n.z, 2.0) * 0.6;         // подсветка кромок рельефа
            float intensity = ink * shade + ink * rim + halo * 0.06;

            // Мягкая виньетка
            intensity *= smoothstep(1.5, 0.1, length(uv));

            float alpha = clamp(intensity * 0.95, 0.0, 0.9);
            gl_FragColor = vec4(col * intensity, alpha);
        }
    `;

    function compile(type, src){
        const sh = gl.createShader(type);
        gl.shaderSource(sh, src);
        gl.compileShader(sh);
        if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)){
            console.warn('NORTHCAT bg shader:', gl.getShaderInfoLog(sh));
            gl.deleteShader(sh);
            return null;
        }
        return sh;
    }

    const vs = compile(gl.VERTEX_SHADER, vertSrc);
    const fs = compile(gl.FRAGMENT_SHADER, fragSrc);
    if (!vs || !fs){ canvas.style.display = 'none'; return; }

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)){ canvas.style.display = 'none'; return; }
    gl.useProgram(prog);

    /* --------------------- Полноэкранный квад --------------------- */
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1, -1,  1, -1,  -1, 1,
        -1,  1,  1, -1,   1, 1
    ]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes   = gl.getUniformLocation(prog, 'u_res');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');
    const uTime  = gl.getUniformLocation(prog, 'u_time');

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    /* ------------------------- Состояние ------------------------- */
    const DPR = Math.min(window.devicePixelRatio || 1, 1.25);
    let W = 0, H = 0;
    let mx, my, tmx, tmy; // текущая и целевая позиция курсора (в пикселях буфера)

    function resize(){
        const w = window.innerWidth, h = window.innerHeight;
        W = Math.max(1, Math.floor(w * DPR));
        H = Math.max(1, Math.floor(h * DPR));
        canvas.width = W;
        canvas.height = H;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        gl.viewport(0, 0, W, H);
        if (mx === undefined){ mx = tmx = W * 0.5; my = tmy = H * 0.55; }
    }
    resize();
    window.addEventListener('resize', resize);

    window.addEventListener('mousemove', e => {
        tmx = e.clientX * DPR;
        tmy = H - e.clientY * DPR; // ось Y в WebGL направлена вверх
    }, { passive: true });

    window.addEventListener('touchmove', e => {
        const t = e.touches && e.touches[0];
        if (!t) return;
        tmx = t.clientX * DPR;
        tmy = H - t.clientY * DPR;
    }, { passive: true });

    /* ------------------------- Рендер ------------------------- */
    const start = performance.now();

    function frame(now){
        mx += (tmx - mx) * 0.06; // плавное «магнитное» следование
        my += (tmy - my) * 0.06;
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform2f(uRes, W, H);
        gl.uniform2f(uMouse, mx, my);
        gl.uniform1f(uTime, (now - start) / 1000);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    let running = true;
    function loop(now){
        if (!running) return;
        frame(now);
        requestAnimationFrame(loop);
    }

    if (reduceMotion){
        // Без анимации: один статичный кадр, перерисовка только при ресайзе.
        frame(performance.now());
        window.addEventListener('resize', () => frame(performance.now()));
    } else {
        document.addEventListener('visibilitychange', () => {
            const wasRunning = running;
            running = !document.hidden;
            if (running && !wasRunning) requestAnimationFrame(loop);
        });
        requestAnimationFrame(loop);
    }
})();
