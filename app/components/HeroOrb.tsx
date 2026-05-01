"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// ─── Retrowave Orb ────────────────────────────────────────────────────────────
export default function AccentOrb() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const scanlinesRef = useRef<HTMLDivElement>(null);
  const wavesSvgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  // ── Build scanlines imperatively (avoids SSR mismatch) ──────────────────
  useEffect(() => {
    const container = scanlinesRef.current;
    if (!container) return;
    container.innerHTML = "";
    for (let i = 0; i < 8; i++) {
      const line = document.createElement("div");
      const h = 1.2 + i * 0.5;
      const bottom = 10 + i * 10.5;
      const opacity = 0.5 - i * 0.04;
      line.className = "absolute w-full bg-white left-0";
      line.style.cssText = `height:${h}px;bottom:${bottom}%;opacity:${opacity}`;
      container.appendChild(line);
    }
  }, []);

  // ── GSAP animations ─────────────────────────────────────────────────────
  useEffect(() => {
    const scene = sceneRef.current;
    const body = bodyRef.current;
    const svg = wavesSvgRef.current;
    const scanCont = scanlinesRef.current;
    if (!scene || !body || !svg || !scanCont) return;

    const ctx = gsap.context(() => {
      // Float
      gsap.to(scene, {
        y: -14,
        duration: 3.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Slow rotation
      gsap.to(body, {
        rotation: 4,
        duration: 7,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      // Breathe / distort
      gsap.to(body, {
        scaleX: 1.025,
        scaleY: 0.975,
        duration: 4.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      // Wave ellipses
      const waves = svg.querySelectorAll<SVGEllipseElement>("ellipse");
      waves.forEach((el, i) => {
        const baseRy = parseFloat(el.getAttribute("ry") ?? "12");
        const baseCy = parseFloat(el.getAttribute("cy") ?? "185");
        gsap.to(el, {
          attr: { ry: baseRy * 1.55, cy: baseCy - 6 },
          duration: 2.5 + i * 0.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.3,
        });
      });

      // Scanline flicker
      Array.from(scanCont.children as HTMLCollectionOf<HTMLElement>).forEach(
        (el, i) => {
          const base = parseFloat(el.style.opacity);
          gsap.to(el, {
            opacity: base * 1.6,
            duration: 1.8 + i * 0.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 0.15,
          });
        },
      );
    });

    return () => ctx.revert();
  }, []);

  // ── Canvas particle field ────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    // Mouse tracking for anti-gravity effect
    let mouseX = -1000;
    let mouseY = -1000;
    let isMouseNear = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isMouseNear = true;
    };

    const handleMouseLeave = () => {
      isMouseNear = false;
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    type Particle = {
      angle: number;
      radius: number;
      speed: number;
      size: number;
      opacity: number;
      phase: number;
      drift: number;
      ox: number; // offset X
      oy: number; // offset Y
      vx: number; // velocity X
      vy: number; // velocity Y
    };

    const particles: Particle[] = Array.from({ length: 45 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 130 + Math.random() * 110,
      speed: 0.0003 + Math.random() * 0.0005,
      size: 1.2 + Math.random() * 2.5,
      opacity: 0.3 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.0002,
      ox: 0,
      oy: 0,
      vx: 0,
      vy: 0,
    }));

    let t = 0;
    const maxDistance = 160; // Repulsion force field radius
    const forceFactor = 120; // Repulsion strength

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;
      ctx2d.clearRect(0, 0, W, H);
      t += 0.016;

      for (const p of particles) {
        p.angle += p.speed;
        const wobble = Math.sin(t * 1.2 + p.phase) * 18;
        const r = p.radius + wobble;
        const baseX = cx + Math.cos(p.angle) * r;
        const baseY = cy + Math.sin(p.angle) * r * 0.62;

        let targetOx = 0;
        let targetOy = 0;

        // Apply anti-gravity repulsion
        if (isMouseNear) {
          const dx = baseX - mouseX;
          const dy = baseY - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            // Calculate repulsion strength (stronger when closer)
            const force = Math.pow((maxDistance - dist) / maxDistance, 1.5);
            const angleToMouse = Math.atan2(dy, dx);
            targetOx = Math.cos(angleToMouse) * force * forceFactor;
            targetOy = Math.sin(angleToMouse) * force * forceFactor;
          }
        }

        // Spring physics for smooth return
        p.vx += (targetOx - p.ox) * 0.08; // spring tension
        p.vy += (targetOy - p.oy) * 0.08;
        
        // Friction / Damping
        p.vx *= 0.82;
        p.vy *= 0.82;

        p.ox += p.vx;
        p.oy += p.vy;

        const x = baseX + p.ox;
        const y = baseY + p.oy;
        
        const alpha = p.opacity * (0.6 + 0.4 * Math.sin(t * 2 + p.phase));

        ctx2d.beginPath();
        ctx2d.arc(x, y, p.size, 0, Math.PI * 2);
        ctx2d.fillStyle =
          Math.random() > 0.3
            ? `rgba(74,222,128,${alpha})`
            : `rgba(220,255,235,${alpha * 0.7})`;
        ctx2d.fill();

        // Connecting lines occasionally
        if (Math.random() > 0.97) {
          const tx = cx + Math.cos(p.angle + p.drift * 80) * r * 0.92 + p.ox * 0.5;
          const ty = cy + Math.sin(p.angle + p.drift * 80) * r * 0.92 * 0.62 + p.oy * 0.5;
          ctx2d.beginPath();
          ctx2d.moveTo(x, y);
          ctx2d.lineTo(tx, ty);
          ctx2d.strokeStyle = `rgba(134,239,172,${alpha * 0.4})`;
          ctx2d.lineWidth = 0.5;
          ctx2d.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Wave ellipse data
  const waves = [
    { cy: 185, rx: 90, ry: 14, color: "rgba(74,222,128,0.18)" },
    { cy: 207, rx: 82, ry: 12, color: "rgba(34,197,94,0.12)" },
    { cy: 229, rx: 74, ry: 10, color: "rgba(134,239,172,0.10)" },
    { cy: 251, rx: 66, ry: 8, color: "rgba(255,255,255,0.07)" },
  ];

  return (
    <div className="accent-orb-container hidden md:flex flex-1 w-full items-center justify-center mt-12 lg:mt-0 lg:pl-8 xl:pl-12">
      {/* ── Orb scene ─────────────────────────────────────────────────── */}
      <div className="relative w-56 h-56 lg:w-80 lg:h-80 xl:w-96 xl:h-96 flex items-center justify-center">
        {/* Ambient particle canvas — sits behind everything */}
        <canvas
          ref={canvasRef}
          className="absolute pointer-events-none opacity-70"
          style={{ inset: "-25%", width: "150%", height: "150%" }}
        />

        <div
          ref={sceneRef}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Outer aura rings */}
          <div className="absolute inset-[-40%] rounded-full border border-green-500/[0.07] animate-pulse pointer-events-none" />

          <div
            className="absolute inset-[-20%] rounded-full border border-green-300/[0.22] animate-pulse pointer-events-none"
            style={{ animationDelay: "0.8s" }}
          />

          {/* Radial background glow */}
          <div
            className="absolute inset-[-20%] rounded-full pointer-events-none animate-pulse"
            style={{
              background:
                "radial-gradient(circle, rgba(34,197,94,0.18) 0%, rgba(0,255,127,0.07) 50%, transparent 75%)",
              filter: "blur(18px)",
            }}
          />

          {/* ── Orb body ──────────────────────────────────────────── */}
          <div
            ref={bodyRef}
            className="relative w-full h-full rounded-full overflow-hidden"
            style={{
              boxShadow:
                "0 0 40px rgba(34,197,94,0.45), 0 0 80px rgba(34,197,94,0.2), inset 0 0 40px rgba(0,0,0,0.6)",
            }}
          >
            {/* Base radial gradient */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  ""
              }}
            />

            {/* Retrowave grid overlay */}
            <div className="absolute inset-0 rounded-full overflow-hidden opacity-35">
              <svg
                viewBox="0 0 320 320"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="orbGrid"
                    width="24"
                    height="24"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 24 0 L 0 0 0 24"
                      fill="none"
                      stroke="rgba(74,222,128,0.55)"
                      strokeWidth="0.6"
                    />
                  </pattern>
                  <radialGradient id="gridFade" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="white" stopOpacity="1" />
                    <stop offset="75%" stopColor="white" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </radialGradient>
                  <mask id="gridMask">
                    <circle cx="160" cy="160" r="160" fill="url(#gridFade)" />
                  </mask>
                </defs>
                <rect
                  width="320"
                  height="320"
                  fill="url(#orbGrid)"
                  mask="url(#gridMask)"
                />
              </svg>
            </div>

            {/* Horizontal scan-lines */}
            <div
              ref={scanlinesRef}
              className="absolute inset-0 rounded-full overflow-hidden opacity-[0.68]"
            />

            {/* Energy wave ellipses */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <svg
                ref={wavesSvgRef}
                className="w-full h-full"
                viewBox="0 0 320 320"
                xmlns="http://www.w3.org/2000/svg"
              >
                {waves.map((w, i) => (
                  <ellipse
                    key={i}
                    cx="160"
                    cy={w.cy}
                    rx={w.rx}
                    ry={w.ry}
                    fill="none"
                    stroke={w.color}
                    strokeWidth="1.5"
                  />
                ))}
              </svg>
            </div>

            {/* Inner mid glow */}
            <div
              className="absolute rounded-full animate-pulse"
              style={{
                width: "55%",
                height: "55%",
                top: "22%",
                left: "22%",
                background:
                  "radial-gradient(circle, rgba(134,239,172,0.22) 0%, transparent 70%)",
              }}
            />

            {/* Rim light */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: "inset 0 0 0 1.5px rgba(134,239,172,0.5)",
                background:
                  "radial-gradient(ellipse at 70% 80%, rgba(74,222,128,0.15) 0%, transparent 50%)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
