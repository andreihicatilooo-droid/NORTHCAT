/* ===================================================================
   NORTHCAT NFT — cat-render.js
   Процедурная отрисовка кота на canvas из ДНК (выбранных признаков).
   Координаты в пространстве 1000x1000, масштабируются под размер canvas.
   =================================================================== */
(function (global) {
    'use strict';

    /* ---- Сид-рандом (mulberry32): один токен -> один и тот же кот ---- */
    function mulberry32(seed) {
        let a = seed >>> 0;
        return function () {
            a |= 0; a = (a + 0x6D2B79F5) | 0;
            let t = Math.imul(a ^ (a >>> 15), 1 | a);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }

    function lerpColor(hexA, hexB, t) {
        const a = hex2rgb(hexA), b = hex2rgb(hexB);
        const r = Math.round(a[0] + (b[0] - a[0]) * t);
        const g = Math.round(a[1] + (b[1] - a[1]) * t);
        const bl = Math.round(a[2] + (b[2] - a[2]) * t);
        return `rgb(${r},${g},${bl})`;
    }
    function hex2rgb(h) {
        h = h.replace('#', '');
        if (h.length === 3) h = h.split('').map(c => c + c).join('');
        return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
    }

    /* =============================== ФОН =============================== */
    function drawBackground(ctx, bg, rnd) {
        const W = 1000, H = 1000;
        if (bg.type === 'radial') {
            const g = ctx.createRadialGradient(500, 430, 80, 500, 540, 760);
            g.addColorStop(0, bg.c1); g.addColorStop(1, bg.c2);
            ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        } else {
            const g = ctx.createLinearGradient(0, 0, 0, H);
            g.addColorStop(0, bg.c1); g.addColorStop(1, bg.c2);
            ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        }

        if (bg.type === 'grid') {
            ctx.strokeStyle = bg.line; ctx.lineWidth = 2;
            for (let i = 0; i <= W; i += 62) {
                ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(W, i); ctx.stroke();
            }
        } else if (bg.type === 'rays') {
            ctx.save(); ctx.translate(500, 520);
            ctx.fillStyle = bg.ray;
            for (let i = 0; i < 24; i++) {
                ctx.rotate(Math.PI / 12);
                if (i % 2) continue;
                ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-40, -900); ctx.lineTo(40, -900); ctx.closePath(); ctx.fill();
            }
            ctx.restore();
        } else if (bg.type === 'sigil') {
            ctx.save(); ctx.translate(500, 520);
            ctx.strokeStyle = bg.mark; ctx.lineWidth = 4;
            ctx.beginPath(); ctx.arc(0, 0, 360, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.arc(0, 0, 300, 0, Math.PI * 2); ctx.stroke();
            // пентаграмма
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                const ang = -Math.PI / 2 + i * (Math.PI * 4 / 5);
                const x = Math.cos(ang) * 320, y = Math.sin(ang) * 320;
                i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
            }
            ctx.closePath(); ctx.stroke();
            ctx.restore();
        }
        // лёгкая виньетка
        const vg = ctx.createRadialGradient(500, 520, 280, 500, 520, 720);
        vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.45)');
        ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
    }

    /* ====================== КОНТУР ГОЛОВЫ + УШИ ====================== */
    function headPath(ctx) {
        ctx.beginPath();
        // уши (треугольники с закруглением) + голова единым контуром
        ctx.moveTo(250, 360);                    // левое ухо — внешняя
        ctx.lineTo(300, 150);
        ctx.quadraticCurveTo(330, 120, 380, 180);
        ctx.lineTo(440, 300);
        // верх головы между ушами
        ctx.quadraticCurveTo(500, 270, 560, 300);
        ctx.lineTo(620, 180);                    // правое ухо
        ctx.quadraticCurveTo(670, 120, 700, 150);
        ctx.lineTo(750, 360);
        // правая щека вниз
        ctx.quadraticCurveTo(800, 470, 770, 620);
        ctx.quadraticCurveTo(740, 800, 500, 840);
        // левая щека вверх
        ctx.quadraticCurveTo(260, 800, 230, 620);
        ctx.quadraticCurveTo(200, 470, 250, 360);
        ctx.closePath();
    }

    function drawBody(ctx, fur, rnd) {
        // голова (в face-space) — рисуется отдельно в render через трансформацию
        ctx.save();
        headPath(ctx);
        const grad = ctx.createRadialGradient(440, 420, 60, 500, 520, 460);
        grad.addColorStop(0, fur.light);
        grad.addColorStop(0.55, fur.base);
        grad.addColorStop(1, fur.shade);
        ctx.fillStyle = grad;
        if (fur.ghost) ctx.globalAlpha = 0.82;
        ctx.fill();
        ctx.globalAlpha = 1;

        // металлический блик
        if (fur.metallic) {
            ctx.save(); headPath(ctx); ctx.clip();
            const sh = ctx.createLinearGradient(250, 150, 750, 840);
            sh.addColorStop(0, 'rgba(255,255,255,.35)');
            sh.addColorStop(0.4, 'rgba(255,255,255,0)');
            sh.addColorStop(0.7, 'rgba(0,0,0,.15)');
            ctx.fillStyle = sh; ctx.fillRect(0, 0, 1000, 1000);
            ctx.restore();
        }

        // тату-контур головы (розовое свечение)
        ctx.save();
        headPath(ctx);
        ctx.strokeStyle = fur.ghost ? 'rgba(155,232,255,.9)' : '#ff3b77';
        ctx.lineWidth = 5;
        ctx.shadowColor = ctx.strokeStyle; ctx.shadowBlur = 14;
        ctx.stroke();
        ctx.restore();
        ctx.restore();

        // внутренние уши
        ctx.fillStyle = lerpColor(fur.base, '#ff8fae', 0.5);
        triEar(ctx, 305, 200, 365, 320, 410, 250);
        triEar(ctx, 695, 200, 635, 320, 590, 250);
        // контур ушей
        ctx.strokeStyle = '#ff3b77'; ctx.lineWidth = 3;
        ctx.shadowColor = '#ff3b77'; ctx.shadowBlur = 8;
        ctx.beginPath(); ctx.moveTo(305, 200); ctx.lineTo(365, 320); ctx.lineTo(410, 250); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(695, 200); ctx.lineTo(635, 320); ctx.lineTo(590, 250); ctx.stroke();
        ctx.shadowBlur = 0;
    }

    /* ============ ПОЛНОТЕЛЫЙ КОТ (тату-сфинкс, крадётся) ============ */
    function strokeGlow(ctx, color, w, blur) {
        ctx.strokeStyle = color; ctx.lineWidth = w;
        ctx.shadowColor = color; ctx.shadowBlur = blur;
        ctx.stroke();
        ctx.shadowBlur = 0;
    }

    function fillFur(ctx, fur, y0, y1) {
        const g = ctx.createLinearGradient(0, y0, 0, y1);
        g.addColorStop(0, fur.light); g.addColorStop(0.5, fur.base); g.addColorStop(1, fur.shade);
        ctx.fillStyle = g;
        if (fur.ghost) ctx.globalAlpha = 0.82;
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    // Контур тела (торс) для клипа узора
    function torsoPath(ctx) {
        ctx.beginPath();
        ctx.moveTo(300, 470);
        ctx.bezierCurveTo(420, 380, 600, 380, 690, 460);     // спина (дуга)
        ctx.bezierCurveTo(735, 500, 730, 580, 690, 620);     // круп
        ctx.bezierCurveTo(560, 690, 380, 690, 300, 640);     // живот
        ctx.bezierCurveTo(262, 596, 262, 514, 300, 470);     // грудь
        ctx.closePath();
    }

    function catLeg(ctx, xTop, w, xPaw) {
        const yTop = 600, yBot = 792;
        ctx.beginPath();
        ctx.moveTo(xTop - w / 2, yTop);
        ctx.bezierCurveTo(xTop - w / 2 - 6, yTop + 90, xPaw - w * 0.55, yBot - 40, xPaw - w * 0.5, yBot);
        ctx.lineTo(xPaw + w * 0.5, yBot);
        ctx.bezierCurveTo(xPaw + w * 0.55, yBot - 40, xTop + w / 2 + 6, yTop + 90, xTop + w / 2, yTop);
        ctx.closePath();
    }

    function drawFullBody(ctx, fur, rnd) {
        const outline = fur.ghost ? 'rgba(155,232,255,.95)' : '#ff3b77';

        // ----- Хвост (за телом), длинный, изгибается вверх-вправо -----
        ctx.save();
        ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(660, 470);
        ctx.quadraticCurveTo(860, 470, 880, 300);
        ctx.quadraticCurveTo(892, 180, 838, 150);
        ctx.strokeStyle = fur.base; ctx.lineWidth = 34;
        ctx.stroke();
        // сужающийся кончик
        ctx.beginPath();
        ctx.moveTo(880, 300); ctx.quadraticCurveTo(892, 180, 838, 150);
        ctx.strokeStyle = fur.base; ctx.lineWidth = 20; ctx.stroke();
        // контур-свечение хвоста
        ctx.beginPath();
        ctx.moveTo(660, 470);
        ctx.quadraticCurveTo(860, 470, 880, 300);
        ctx.quadraticCurveTo(892, 180, 838, 150);
        strokeGlow(ctx, outline, 4, 12);
        ctx.restore();

        // ----- Задние и передние лапы -----
        ctx.save();
        // дальние лапы (темнее)
        catLeg(ctx, 430, 64, 432); fillFur(ctx, lerpFurDark(fur), 600, 800);
        catLeg(ctx, 590, 64, 600); fillFur(ctx, lerpFurDark(fur), 600, 800);
        // ближние лапы
        catLeg(ctx, 360, 74, 352);
        fillFur(ctx, fur, 600, 800); catLeg(ctx, 360, 74, 352); strokeGlow(ctx, outline, 4, 10);
        catLeg(ctx, 660, 74, 678);
        fillFur(ctx, fur, 600, 800); catLeg(ctx, 660, 74, 678); strokeGlow(ctx, outline, 4, 10);
        // пальцы на ближних лапах
        ctx.strokeStyle = outline; ctx.lineWidth = 2.5; ctx.shadowColor = outline; ctx.shadowBlur = 6;
        [352, 678].forEach(px => {
            ctx.beginPath();
            ctx.moveTo(px - 14, 788); ctx.lineTo(px - 14, 772);
            ctx.moveTo(px, 792); ctx.lineTo(px, 774);
            ctx.moveTo(px + 14, 788); ctx.lineTo(px + 14, 772);
            ctx.stroke();
        });
        ctx.shadowBlur = 0;
        ctx.restore();

        // ----- Торс -----
        ctx.save();
        torsoPath(ctx); fillFur(ctx, fur, 380, 690);
        // лёгкий объёмный блик
        ctx.save(); torsoPath(ctx); ctx.clip();
        const hl = ctx.createRadialGradient(440, 450, 30, 460, 520, 320);
        hl.addColorStop(0, 'rgba(255,255,255,.18)'); hl.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = hl; ctx.fillRect(0, 0, 1000, 1000);
        ctx.restore();
        torsoPath(ctx); strokeGlow(ctx, outline, 5, 14);
        ctx.restore();

        // ----- Тату-линии тела (рёбра/складки сфинкса) -----
        ctx.save();
        torsoPath(ctx); ctx.clip();
        ctx.strokeStyle = outline; ctx.globalAlpha = 0.5; ctx.lineWidth = 2.5;
        ctx.shadowColor = outline; ctx.shadowBlur = 6;
        for (let i = 0; i < 4; i++) {
            const x = 360 + i * 70;
            ctx.beginPath();
            ctx.moveTo(x, 420); ctx.quadraticCurveTo(x - 26, 540, x + 6, 650);
            ctx.stroke();
        }
        ctx.restore();
        ctx.shadowBlur = 0; ctx.globalAlpha = 1;
    }

    function lerpFurDark(fur) {
        return { base: fur.shade, shade: fur.shade, light: fur.base, ghost: fur.ghost };
    }


    function triEar(ctx, x1, y1, x2, y2, x3, y3) {
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineTo(x3, y3);
        ctx.closePath(); ctx.fill();
    }

    /* ========================= УЗОР ШЕРСТИ ========================= */
    function drawPattern(ctx, pattern, fur, rnd) {
        if (pattern.id === 'plain') return;
        ctx.save();
        headPath(ctx); ctx.clip();
        const ink = fur.shade;
        const glow = pattern.glow;
        ctx.fillStyle = ink; ctx.strokeStyle = ink;

        if (pattern.id === 'tabby') {
            ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.globalAlpha = .5;
            for (let i = 0; i < 7; i++) {
                const y = 330 + i * 60 + rnd() * 12;
                ctx.beginPath();
                ctx.moveTo(280, y);
                ctx.quadraticCurveTo(500, y - 40, 720, y);
                ctx.stroke();
            }
        } else if (pattern.id === 'spots') {
            ctx.globalAlpha = .5;
            for (let i = 0; i < 22; i++) {
                const x = 260 + rnd() * 480, y = 320 + rnd() * 440;
                const r = 14 + rnd() * 26;
                ctx.beginPath(); ctx.ellipse(x, y, r, r * .8, rnd() * 6, 0, 7); ctx.fill();
            }
        } else if (pattern.id === 'patch') {
            ctx.globalAlpha = .55;
            ctx.beginPath();
            ctx.moveTo(500, 300);
            ctx.quadraticCurveTo(780, 360, 760, 640);
            ctx.quadraticCurveTo(700, 820, 500, 820);
            ctx.closePath(); ctx.fill();
        } else if (pattern.id === 'tuxedo') {
            ctx.globalAlpha = .6;
            ctx.beginPath();
            ctx.moveTo(420, 520);
            ctx.quadraticCurveTo(500, 600, 580, 520);
            ctx.quadraticCurveTo(620, 760, 500, 840);
            ctx.quadraticCurveTo(380, 760, 420, 520);
            ctx.closePath(); ctx.fill();
        } else if (pattern.id === 'runes') {
            ctx.globalAlpha = .9; ctx.lineWidth = 6; ctx.lineCap = 'round';
            ctx.strokeStyle = glow ? '#ff3b77' : ink;
            if (glow) { ctx.shadowColor = '#ff3b77'; ctx.shadowBlur = 18; }
            const runes = ['ᚱ', 'ᚨ', 'ᛟ', 'ᛉ', 'ᚦ', 'ᛗ'];
            ctx.font = '70px serif'; ctx.textAlign = 'center'; ctx.fillStyle = glow ? '#ff6a98' : ink;
            for (let i = 0; i < 6; i++) {
                const x = 300 + rnd() * 400, y = 380 + rnd() * 380;
                ctx.fillText(runes[(rnd() * runes.length) | 0], x, y);
            }
        } else if (pattern.id === 'circuit') {
            ctx.globalAlpha = .9; ctx.lineWidth = 4;
            ctx.strokeStyle = '#5fd35f'; ctx.fillStyle = '#5fd35f';
            ctx.shadowColor = '#5fd35f'; ctx.shadowBlur = 12;
            for (let i = 0; i < 12; i++) {
                let x = 280 + rnd() * 440, y = 340 + rnd() * 420;
                ctx.beginPath(); ctx.moveTo(x, y);
                for (let s = 0; s < 3; s++) {
                    if (rnd() > .5) x += (rnd() - .5) * 120; else y += (rnd() - .5) * 120;
                    ctx.lineTo(x, y);
                }
                ctx.stroke();
                ctx.beginPath(); ctx.arc(x, y, 6, 0, 7); ctx.fill();
            }
        }
        ctx.restore();
    }

    /* ============================ ГЛАЗА ============================ */
    function drawEyes(ctx, shape, color, rnd) {
        const positions = [];
        if (shape.id === 'cyclops') positions.push([500, 500, 1.5]);
        else { positions.push([395, 500, 1], [605, 500, 1]); }

        positions.forEach(([x, y, sc]) => drawOneEye(ctx, x, y, sc, shape, color));

        if (shape.id === 'three') {
            ctx.save();
            drawOneEye(ctx, 500, 360, 0.8, { id: 'sharp' }, color);
            ctx.restore();
        }
    }

    function drawOneEye(ctx, x, y, sc, shape, color) {
        ctx.save();
        ctx.translate(x, y); ctx.scale(sc, sc);

        // белок / форма
        ctx.beginPath();
        if (shape.id === 'sleepy') ctx.ellipse(0, 6, 70, 34, 0, 0, 7);
        else if (shape.id === 'sharp') { ctx.moveTo(-72, 0); ctx.quadraticCurveTo(0, -52, 72, 0); ctx.quadraticCurveTo(0, 30, -72, 0); }
        else if (shape.id === 'wide') ctx.ellipse(0, 0, 76, 70, 0, 0, 7);
        else ctx.ellipse(0, 0, 64, 60, 0, 0, 7);
        ctx.closePath();
        ctx.fillStyle = color.dark ? '#05050a' : '#f6f6fb';
        ctx.fill();

        // радужка + зрачок
        const irisR = shape.id === 'wide' ? 40 : 36;
        const ig = ctx.createRadialGradient(-8, -8, 4, 0, 0, irisR);
        ig.addColorStop(0, lerpColor(color.iris, '#ffffff', .4));
        ig.addColorStop(1, color.iris);
        ctx.fillStyle = ig;
        ctx.beginPath(); ctx.arc(0, 2, irisR, 0, 7); ctx.fill();

        ctx.fillStyle = '#070708';
        ctx.beginPath();
        if (shape.id === 'sleepy') ctx.ellipse(0, 4, 8, 22, 0, 0, 7);
        else ctx.ellipse(0, 2, 11, 24, 0, 0, 7);
        ctx.fill();

        // блик
        ctx.fillStyle = 'rgba(255,255,255,.9)';
        ctx.beginPath(); ctx.arc(-12, -12, 7, 0, 7); ctx.fill();

        // свечение
        ctx.shadowColor = color.glow; ctx.shadowBlur = 26;
        ctx.strokeStyle = color.glow; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(0, 2, irisR + 2, 0, 7); ctx.stroke();

        // веко для «сонных»
        if (shape.id === 'sleepy') {
            ctx.shadowBlur = 0;
            ctx.fillStyle = 'rgba(0,0,0,.0)';
        }
        ctx.restore();
    }

    /* ===================== НОС / РОТ / УСЫ ===================== */
    function drawFace(ctx, mouth, fur, rnd) {
        // нос
        ctx.fillStyle = lerpColor(fur.base, '#ff7aa0', .55);
        ctx.beginPath();
        ctx.moveTo(470, 600); ctx.lineTo(530, 600);
        ctx.lineTo(500, 632); ctx.closePath(); ctx.fill();

        // усы
        ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 3; ctx.lineCap = 'round';
        for (let s = -1; s <= 1; s++) {
            const off = s * 16;
            ctx.beginPath(); ctx.moveTo(450, 632 + off); ctx.quadraticCurveTo(330, 626 + off * 2, 250, 650 + off * 3); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(550, 632 + off); ctx.quadraticCurveTo(670, 626 + off * 2, 750, 650 + off * 3); ctx.stroke();
        }

        // рот
        ctx.strokeStyle = '#0a0a0c'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.fillStyle = '#0a0a0c';
        const my = 640;
        if (mouth.id === 'neutral') {
            ctx.beginPath(); ctx.moveTo(500, 632); ctx.lineTo(500, my);
            ctx.moveTo(500, my); ctx.quadraticCurveTo(460, my + 24, 430, my + 6);
            ctx.moveTo(500, my); ctx.quadraticCurveTo(540, my + 24, 570, my + 6); ctx.stroke();
        } else if (mouth.id === 'smile') {
            ctx.beginPath(); ctx.moveTo(500, 632); ctx.lineTo(500, my);
            ctx.moveTo(430, my); ctx.quadraticCurveTo(500, my + 50, 570, my); ctx.stroke();
        } else if (mouth.id === 'smirk') {
            ctx.beginPath(); ctx.moveTo(500, 632); ctx.lineTo(500, my);
            ctx.moveTo(450, my + 8); ctx.quadraticCurveTo(540, my + 40, 588, my - 6); ctx.stroke();
        } else if (mouth.id === 'open') {
            ctx.beginPath(); ctx.moveTo(500, 632); ctx.lineTo(500, my - 4);
            ctx.ellipse(500, my + 22, 34, 30, 0, 0, 7); ctx.fillStyle = '#5a1024'; ctx.fill();
            ctx.fillStyle = '#ff6f91'; ctx.beginPath(); ctx.ellipse(500, my + 34, 18, 14, 0, 0, 7); ctx.fill();
        } else if (mouth.id === 'fangs') {
            ctx.beginPath(); ctx.moveTo(430, my); ctx.quadraticCurveTo(500, my + 40, 570, my); ctx.stroke();
            ctx.fillStyle = '#f6f6fb';
            ctx.beginPath(); ctx.moveTo(458, my + 14); ctx.lineTo(474, my + 14); ctx.lineTo(466, my + 44); ctx.closePath(); ctx.fill();
            ctx.beginPath(); ctx.moveTo(526, my + 14); ctx.lineTo(542, my + 14); ctx.lineTo(534, my + 44); ctx.closePath(); ctx.fill();
        } else if (mouth.id === 'grin') {
            ctx.beginPath(); ctx.moveTo(420, my); ctx.quadraticCurveTo(500, my + 56, 580, my);
            ctx.lineTo(420, my); ctx.closePath(); ctx.fillStyle = '#0a0a0c'; ctx.fill();
            ctx.fillStyle = '#f6f6fb'; ctx.lineWidth = 2; ctx.strokeStyle = '#888';
            for (let i = 0; i < 6; i++) {
                const tx = 436 + i * 26;
                ctx.beginPath(); ctx.rect(tx, my + 2, 20, 22); ctx.fill(); ctx.stroke();
            }
        }
    }

    /* ======================= ГОЛОВНОЙ УБОР ======================= */
    function drawHeadwear(ctx, hw, rnd) {
        if (hw.id === 'none') return;
        ctx.save();
        ctx.lineJoin = 'round';
        if (hw.id === 'halo') {
            ctx.strokeStyle = hw.color; ctx.lineWidth = 16;
            ctx.shadowColor = hw.color; ctx.shadowBlur = 30;
            ctx.beginPath(); ctx.ellipse(500, 140, 150, 40, 0, 0, 7); ctx.stroke();
        } else if (hw.id === 'horns') {
            ctx.fillStyle = hw.color;
            horn(ctx, 320, 230, -1); horn(ctx, 680, 230, 1);
        } else if (hw.id === 'crown') {
            ctx.fillStyle = hw.color; ctx.shadowColor = 'rgba(224,181,59,.6)'; ctx.shadowBlur = 20;
            ctx.beginPath();
            ctx.moveTo(360, 250); ctx.lineTo(400, 150); ctx.lineTo(440, 220);
            ctx.lineTo(500, 130); ctx.lineTo(560, 220); ctx.lineTo(600, 150);
            ctx.lineTo(640, 250); ctx.closePath(); ctx.fill();
            ctx.fillStyle = '#ff3b77';
            [400, 500, 600].forEach(x => { ctx.beginPath(); ctx.arc(x, 200, 10, 0, 7); ctx.fill(); });
        } else if (hw.id === 'tophat') {
            ctx.fillStyle = hw.color;
            ctx.fillRect(360, 70, 280, 150);
            ctx.fillRect(300, 210, 400, 36);
            ctx.fillStyle = '#8e2233'; ctx.fillRect(360, 186, 280, 26);
        } else if (hw.id === 'beanie') {
            ctx.fillStyle = hw.color;
            ctx.beginPath(); ctx.moveTo(300, 250);
            ctx.quadraticCurveTo(500, 60, 700, 250); ctx.closePath(); ctx.fill();
            ctx.fillStyle = lerpColor(hw.color, '#000', .25); ctx.fillRect(300, 234, 400, 34);
            ctx.fillStyle = '#e9eaef'; ctx.beginPath(); ctx.arc(500, 96, 26, 0, 7); ctx.fill();
        } else if (hw.id === 'hood') {
            ctx.fillStyle = hw.color;
            ctx.beginPath();
            ctx.moveTo(230, 360);
            ctx.quadraticCurveTo(500, 40, 770, 360);
            ctx.quadraticCurveTo(640, 250, 500, 250);
            ctx.quadraticCurveTo(360, 250, 230, 360);
            ctx.closePath(); ctx.fill();
        } else if (hw.id === 'wizard') {
            ctx.fillStyle = hw.color; ctx.shadowColor = 'rgba(157,38,205,.6)'; ctx.shadowBlur = 16;
            ctx.beginPath(); ctx.moveTo(330, 250); ctx.lineTo(520, -40); ctx.lineTo(660, 250); ctx.closePath(); ctx.fill();
            ctx.fillStyle = '#ffd96a';
            star(ctx, 500, 120, 16, 5); star(ctx, 560, 200, 10, 5); star(ctx, 440, 190, 9, 5);
        } else if (hw.id === 'flame') {
            ctx.fillStyle = hw.color; ctx.shadowColor = '#ff7a1a'; ctx.shadowBlur = 30;
            for (let i = 0; i < 5; i++) {
                const x = 360 + i * 70 + (rnd() - .5) * 20;
                flame(ctx, x, 250, 80 + rnd() * 70);
            }
        } else if (hw.id === 'antenna') {
            ctx.strokeStyle = hw.color; ctx.lineWidth = 8; ctx.lineCap = 'round';
            ctx.beginPath(); ctx.moveTo(380, 240); ctx.quadraticCurveTo(340, 110, 380, 70); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(620, 240); ctx.quadraticCurveTo(660, 110, 620, 70); ctx.stroke();
            ctx.fillStyle = '#ff3b77'; ctx.shadowColor = '#ff3b77'; ctx.shadowBlur = 16;
            ctx.beginPath(); ctx.arc(380, 64, 16, 0, 7); ctx.fill();
            ctx.beginPath(); ctx.arc(620, 64, 16, 0, 7); ctx.fill();
        }
        ctx.restore();
    }
    function horn(ctx, x, y, dir) {
        ctx.beginPath(); ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x + dir * 90, y - 140, x + dir * 40, y - 220);
        ctx.quadraticCurveTo(x + dir * 10, y - 120, x - dir * 20, y);
        ctx.closePath(); ctx.fill();
    }
    function flame(ctx, x, y, h) {
        ctx.beginPath(); ctx.moveTo(x - 28, y);
        ctx.quadraticCurveTo(x - 14, y - h * .6, x, y - h);
        ctx.quadraticCurveTo(x + 14, y - h * .6, x + 28, y);
        ctx.closePath(); ctx.fill();
    }
    function star(ctx, cx, cy, r, n) {
        ctx.beginPath();
        for (let i = 0; i < n * 2; i++) {
            const rr = i % 2 ? r * .45 : r;
            const a = -Math.PI / 2 + i * Math.PI / n;
            const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr;
            i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.closePath(); ctx.fill();
    }

    /* ============================ ОЧКИ ============================ */
    function drawEyewear(ctx, ew, rnd) {
        if (ew.id === 'none') return;
        ctx.save();
        if (ew.id === 'round') {
            ctx.strokeStyle = ew.color; ctx.lineWidth = 10;
            ctx.beginPath(); ctx.arc(395, 500, 70, 0, 7); ctx.stroke();
            ctx.beginPath(); ctx.arc(605, 500, 70, 0, 7); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(465, 500); ctx.lineTo(535, 500); ctx.stroke();
        } else if (ew.id === 'shades') {
            ctx.fillStyle = ew.color;
            ctx.beginPath(); ctx.roundRect ? ctx.roundRect(318, 462, 150, 90, 16) : ctx.rect(318, 462, 150, 90); ctx.fill();
            ctx.beginPath(); ctx.roundRect ? ctx.roundRect(532, 462, 150, 90, 16) : ctx.rect(532, 462, 150, 90); ctx.fill();
            ctx.strokeStyle = ew.color; ctx.lineWidth = 10;
            ctx.beginPath(); ctx.moveTo(468, 482); ctx.lineTo(532, 482); ctx.stroke();
            ctx.fillStyle = 'rgba(255,59,119,.35)';
            ctx.fillRect(330, 474, 124, 22);
        } else if (ew.id === 'visor') {
            ctx.fillStyle = ew.color; ctx.shadowColor = ew.color; ctx.shadowBlur = 24;
            ctx.beginPath();
            ctx.roundRect ? ctx.roundRect(300, 470, 400, 70, 34) : ctx.rect(300, 470, 400, 70);
            ctx.fill();
            ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fillRect(330, 486, 340, 8);
        } else if (ew.id === 'monocle') {
            ctx.strokeStyle = ew.color; ctx.lineWidth = 10; ctx.shadowColor = 'rgba(224,181,59,.6)'; ctx.shadowBlur = 12;
            ctx.beginPath(); ctx.arc(605, 500, 74, 0, 7); ctx.stroke();
            ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(660, 555); ctx.lineTo(700, 700); ctx.stroke();
        } else if (ew.id === 'eyepatch') {
            ctx.fillStyle = ew.color;
            ctx.beginPath(); ctx.ellipse(395, 500, 86, 74, 0, 0, 7); ctx.fill();
            ctx.strokeStyle = ew.color; ctx.lineWidth = 8;
            ctx.beginPath(); ctx.moveTo(320, 470); ctx.lineTo(250, 430);
            ctx.moveTo(470, 470); ctx.lineTo(760, 410); ctx.stroke();
        } else if (ew.id === 'vr') {
            ctx.fillStyle = '#101319'; ctx.shadowColor = ew.color; ctx.shadowBlur = 26;
            ctx.beginPath(); ctx.roundRect ? ctx.roundRect(300, 452, 400, 110, 24) : ctx.rect(300, 452, 400, 110); ctx.fill();
            ctx.fillStyle = ew.color;
            ctx.fillRect(330, 486, 150, 40); ctx.fillRect(520, 486, 150, 40);
            ctx.strokeStyle = ew.color; ctx.lineWidth = 8;
            ctx.beginPath(); ctx.moveTo(300, 500); ctx.lineTo(240, 480);
            ctx.moveTo(700, 500); ctx.lineTo(760, 480); ctx.stroke();
        }
        ctx.restore();
    }

    /* ====================== АКСЕССУАР НА ШЕЕ ====================== */
    function drawNeckwear(ctx, nw, rnd) {
        if (nw.id === 'none') return;
        ctx.save();
        const ny = 858;
        if (nw.id === 'collar' || nw.id === 'bell') {
            ctx.strokeStyle = nw.id === 'bell' ? '#8e2233' : nw.color; ctx.lineWidth = 28;
            ctx.beginPath(); ctx.moveTo(330, ny); ctx.quadraticCurveTo(500, ny + 46, 670, ny); ctx.stroke();
            // шипы
            ctx.fillStyle = '#cfd6e2';
            for (let i = 0; i < 7; i++) {
                const t = i / 6, x = 330 + (670 - 330) * t, y = ny + Math.sin(t * Math.PI) * 40;
                ctx.beginPath(); ctx.arc(x, y, 7, 0, 7); ctx.fill();
            }
            if (nw.id === 'bell') {
                ctx.fillStyle = nw.color; ctx.shadowColor = 'rgba(224,181,59,.6)'; ctx.shadowBlur = 14;
                ctx.beginPath(); ctx.arc(500, ny + 60, 30, 0, 7); ctx.fill();
                ctx.strokeStyle = '#6b531a'; ctx.lineWidth = 3; ctx.shadowBlur = 0;
                ctx.beginPath(); ctx.moveTo(478, ny + 60); ctx.lineTo(522, ny + 60); ctx.stroke();
                ctx.beginPath(); ctx.arc(500, ny + 72, 5, 0, 7); ctx.fillStyle = '#6b531a'; ctx.fill();
            }
        } else if (nw.id === 'bowtie') {
            ctx.fillStyle = nw.color; ctx.shadowColor = 'rgba(157,38,205,.5)'; ctx.shadowBlur = 12;
            ctx.beginPath(); ctx.moveTo(500, ny); ctx.lineTo(420, ny - 34); ctx.lineTo(420, ny + 34); ctx.closePath(); ctx.fill();
            ctx.beginPath(); ctx.moveTo(500, ny); ctx.lineTo(580, ny - 34); ctx.lineTo(580, ny + 34); ctx.closePath(); ctx.fill();
            ctx.fillStyle = lerpColor(nw.color, '#000', .3); ctx.fillRect(486, ny - 20, 28, 40);
        } else if (nw.id === 'chain') {
            ctx.strokeStyle = nw.color; ctx.lineWidth = 14; ctx.setLineDash([4, 14]); ctx.lineCap = 'round';
            ctx.beginPath(); ctx.moveTo(320, ny - 10); ctx.quadraticCurveTo(500, ny + 70, 680, ny - 10); ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = '#cfd6e2'; ctx.shadowColor = 'rgba(255,255,255,.5)'; ctx.shadowBlur = 12;
            ctx.beginPath(); ctx.arc(500, ny + 56, 22, 0, 7); ctx.fill();
        } else if (nw.id === 'scarf') {
            ctx.fillStyle = nw.color;
            ctx.beginPath(); ctx.moveTo(310, ny - 20);
            ctx.quadraticCurveTo(500, ny + 70, 690, ny - 20);
            ctx.lineTo(690, ny + 20); ctx.quadraticCurveTo(500, ny + 110, 310, ny + 20);
            ctx.closePath(); ctx.fill();
            ctx.fillStyle = lerpColor(nw.color, '#000', .25);
            ctx.beginPath(); ctx.moveTo(560, ny + 30); ctx.lineTo(620, ny + 150); ctx.lineTo(540, ny + 140); ctx.closePath(); ctx.fill();
        } else if (nw.id === 'amulet') {
            ctx.strokeStyle = '#cfd6e2'; ctx.lineWidth = 6;
            ctx.beginPath(); ctx.moveTo(380, ny - 20); ctx.quadraticCurveTo(500, ny + 50, 620, ny - 20); ctx.stroke();
            ctx.fillStyle = nw.color; ctx.shadowColor = nw.color; ctx.shadowBlur = 24;
            ctx.beginPath();
            ctx.moveTo(500, ny + 20); ctx.lineTo(540, ny + 60); ctx.lineTo(500, ny + 110); ctx.lineTo(460, ny + 60);
            ctx.closePath(); ctx.fill();
        }
        ctx.restore();
    }

    /* ===================== АУРА / СПЕЦЭФФЕКТ ===================== */
    function drawAuraBack(ctx, aura, rnd) {
        if (aura.id === 'none') return;
        ctx.save();
        if (aura.id === 'mist') {
            ctx.fillStyle = aura.color; ctx.filter = 'blur(20px)';
            for (let i = 0; i < 5; i++) {
                ctx.beginPath(); ctx.ellipse(300 + rnd() * 400, 400 + rnd() * 300, 120, 70, 0, 0, 7); ctx.fill();
            }
            ctx.filter = 'none';
        } else if (aura.id === 'halo-ring') {
            ctx.strokeStyle = aura.color; ctx.lineWidth = 10; ctx.shadowColor = aura.color; ctx.shadowBlur = 30;
            ctx.beginPath(); ctx.arc(500, 520, 430, 0, 7); ctx.stroke();
        } else if (aura.id === 'flames') {
            ctx.fillStyle = aura.color; ctx.shadowColor = aura.color; ctx.shadowBlur = 30;
            for (let i = 0; i < 10; i++) {
                const x = 120 + i * 80 + (rnd() - .5) * 30;
                flame(ctx, x, 1000, 200 + rnd() * 220);
            }
        }
        ctx.restore();
    }
    function drawAuraFront(ctx, aura, rnd) {
        if (aura.id === 'none') return;
        ctx.save();
        if (aura.id === 'sparks' || aura.id === 'stars') {
            ctx.fillStyle = aura.color; ctx.shadowColor = aura.color; ctx.shadowBlur = 16;
            for (let i = 0; i < 40; i++) {
                const x = rnd() * 1000, y = rnd() * 1000;
                if (aura.id === 'stars') star(ctx, x, y, 4 + rnd() * 8, 5);
                else { ctx.beginPath(); ctx.arc(x, y, 2 + rnd() * 4, 0, 7); ctx.fill(); }
            }
        } else if (aura.id === 'glitch') {
            for (let i = 0; i < 14; i++) {
                const y = rnd() * 1000, h = 4 + rnd() * 16;
                ctx.fillStyle = i % 2 ? 'rgba(95,211,95,.5)' : 'rgba(255,59,119,.4)';
                ctx.fillRect(0, y, 1000, h);
            }
        }
        ctx.restore();
    }

    /* ========================= ГЛАВНАЯ ========================= */
    function render(ctx, size, dna, seed) {
        const rnd = mulberry32(seed || 1);
        ctx.save();
        ctx.clearRect(0, 0, size, size);
        ctx.scale(size / 1000, size / 1000);

        drawBackground(ctx, dna.background, rnd);
        drawAuraBack(ctx, dna.aura, rnd);

        // Полнотелый кот (тату-сфинкс)
        drawFullBody(ctx, dna.fur, rnd);

        // Голова + лицо + аксессуары в «face-space», спроецированном на голову кота.
        // face-space: голова ~ (500,520), глаза ~ (395/605,500) -> проецируем на (340,370)*0.6
        ctx.save();
        ctx.translate(340, 372);
        ctx.scale(0.6, 0.6);
        ctx.translate(-500, -520);

        drawBody(ctx, dna.fur, rnd);                 // голова + уши + контур
        drawPattern(ctx, dna.pattern, dna.fur, rnd);
        drawEyes(ctx, dna.eyeShape, dna.eyeColor, rnd);
        drawFace(ctx, dna.mouth, dna.fur, rnd);
        drawEyewear(ctx, dna.eyewear, rnd);
        drawHeadwear(ctx, dna.headwear, rnd);
        drawNeckwear(ctx, dna.neckwear, rnd);
        ctx.restore();

        drawAuraFront(ctx, dna.aura, rnd);

        ctx.restore();
    }

    global.NC_RENDER = { render, mulberry32 };

})(window);
