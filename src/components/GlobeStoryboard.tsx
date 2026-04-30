"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
// @ts-ignore
import ThreeGlobe from "three-globe";
// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/* ── Helper Draw Functions (Moved outside to avoid recreation) ── */

const stickman = (hctx: CanvasRenderingContext2D, x: number, y: number, s: number, col: string, totalT: number, label: string, opts: any = {}) => {
  hctx.save();
  hctx.strokeStyle = col; hctx.fillStyle = col;
  hctx.lineWidth = 2.4 * s; hctx.lineCap = "round"; hctx.lineJoin = "round";
  hctx.shadowColor = col; hctx.shadowBlur = 12 * s;
  hctx.beginPath(); hctx.arc(x, y - 22 * s, 8.5 * s, 0, Math.PI * 2);
  opts.fillHead ? hctx.fill() : hctx.stroke();
  hctx.beginPath(); hctx.moveTo(x, y - 13.5 * s); hctx.lineTo(x, y + 9 * s); hctx.stroke();
  if (opts.confused) {
    const wave1 = Math.sin(totalT * 0.17) * 5 * s;
    const wave2 = Math.sin(totalT * 0.14 + 1) * 5 * s;
    hctx.beginPath(); hctx.moveTo(x, y - 3 * s); hctx.lineTo(x - 15 * s, y - 12 * s + wave1); hctx.stroke();
    hctx.beginPath(); hctx.moveTo(x, y - 3 * s); hctx.lineTo(x + 15 * s, y - 14 * s + wave2); hctx.stroke();
    hctx.shadowBlur = 0;
    ["?", "?", "?"].forEach((q, i) => {
      const a = (i / 3) * Math.PI * 2 + totalT * 0.023;
      hctx.globalAlpha = 0.35 + 0.45 * Math.sin(totalT * 0.1 + i);
      hctx.fillStyle = "#f59e0b";
      hctx.font = `bold ${14 * s}px monospace`;
      hctx.textAlign = "center";
      hctx.fillText(q, x + Math.cos(a) * 32 * s, y - 26 * s + Math.sin(a) * 18 * s);
    });
    hctx.globalAlpha = 1;
  } else {
    hctx.beginPath(); hctx.moveTo(x, y - 3 * s); hctx.lineTo(x - 14 * s, y - 1 * s); hctx.stroke();
    hctx.beginPath(); hctx.moveTo(x, y - 3 * s); hctx.lineTo(x + 14 * s, y - 1 * s); hctx.stroke();
  }
  hctx.beginPath(); hctx.moveTo(x, y + 9 * s); hctx.lineTo(x - 9 * s, y + 24 * s); hctx.stroke();
  hctx.beginPath(); hctx.moveTo(x, y + 9 * s); hctx.lineTo(x + 9 * s, y + 24 * s); hctx.stroke();
  if (label) {
    hctx.shadowBlur = 0;
    hctx.globalAlpha = 0.85; hctx.fillStyle = col;
    hctx.font = `${10 * s}px monospace`;
    hctx.textAlign = "center";
    hctx.fillText(label.toUpperCase(), x, y + 38 * s);
  }
  hctx.restore();
};

const greyRingNode = (hctx: CanvasRenderingContext2D, x: number, y: number, size: number, alpha: number) => {
  hctx.save(); hctx.globalAlpha = alpha;
  for (let i = 1; i <= 2; i++) {
    hctx.beginPath(); hctx.arc(x, y, size + i * 6, 0, Math.PI * 2);
    hctx.strokeStyle = `rgba(140,140,140,${0.2 / i})`; hctx.lineWidth = 1.2; hctx.stroke();
  }
  hctx.beginPath(); hctx.arc(x, y, size, 0, Math.PI * 2);
  hctx.fillStyle = "#777"; hctx.fill();
  hctx.restore();
};

const amberNode = (hctx: CanvasRenderingContext2D, x: number, y: number, size: number, alpha: number, rings = true) => {
  hctx.save(); hctx.globalAlpha = alpha;
  if (rings) {
    for (let i = 1; i <= 3; i++) {
      hctx.beginPath(); hctx.arc(x, y, size + i * 7, 0, Math.PI * 2);
      hctx.strokeStyle = `rgba(245,158,11,${0.15 / i})`; hctx.lineWidth = 1; hctx.stroke();
    }
  }
  hctx.shadowColor = "#f59e0b"; hctx.shadowBlur = 18;
  hctx.beginPath(); hctx.arc(x, y, size, 0, Math.PI * 2);
  hctx.fillStyle = "#f59e0b"; hctx.fill();
  hctx.restore();
};

const infollionO = (hctx: CanvasRenderingContext2D, x: number, y: number, r: number, alpha: number) => {
  hctx.save(); hctx.globalAlpha = alpha;
  hctx.lineWidth = 5; hctx.strokeStyle = "#888";
  hctx.shadowColor = "rgba(245,158,11,0.3)"; hctx.shadowBlur = 20;
  hctx.beginPath(); hctx.arc(x, y, r, 0, Math.PI * 2); hctx.stroke();
  hctx.shadowBlur = 0;
  hctx.lineWidth = 1.5; hctx.strokeStyle = "rgba(245,158,11,0.7)";
  hctx.beginPath(); hctx.arc(x, y, r * 0.55, 0, Math.PI * 2); hctx.stroke();
  hctx.beginPath(); hctx.arc(x, y, r * 0.2, 0, Math.PI * 2);
  hctx.fillStyle = "#f59e0b"; hctx.fill();
  hctx.strokeStyle = "rgba(140,140,140,0.55)"; hctx.lineWidth = 2.5;
  hctx.beginPath(); hctx.moveTo(x + r, y); hctx.lineTo(x + r + 24, y); hctx.stroke();
  hctx.restore();
};

const scanWave = (hctx: CanvasRenderingContext2D, x: number, y: number, r: number, alpha: number) => {
  if (r <= 0) return;
  hctx.save(); hctx.globalAlpha = alpha;
  hctx.setLineDash([14, 10]);
  hctx.lineWidth = 1.8; hctx.strokeStyle = "#f59e0b";
  hctx.shadowColor = "#f59e0b"; hctx.shadowBlur = 8;
  hctx.beginPath(); hctx.arc(x, y, r, 0, Math.PI * 2); hctx.stroke();
  hctx.setLineDash([]);
  const g = hctx.createRadialGradient(x, y, r * 0.7, x, y, r * 1.25);
  g.addColorStop(0, `rgba(245,158,11,${alpha * 0.12})`);
  g.addColorStop(1, "transparent");
  hctx.beginPath(); hctx.arc(x, y, r * 1.25, 0, Math.PI * 2);
  hctx.fillStyle = g; hctx.fill();
  hctx.restore();
};

const failLine = (hctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, prog: number, showX: boolean) => {
  const p = Math.min(prog, 1);
  const ex = x1 + (x2 - x1) * p, ey = y1 + (y2 - y1) * p;
  hctx.save();
  hctx.setLineDash([5, 6]); hctx.lineWidth = 1.3;
  hctx.strokeStyle = "rgba(245,158,11,0.45)";
  hctx.beginPath(); hctx.moveTo(x1, y1); hctx.lineTo(ex, ey); hctx.stroke();
  hctx.setLineDash([]);
  if (showX && prog >= 1) {
    hctx.strokeStyle = "rgba(220,70,50,0.9)"; hctx.lineWidth = 2.2; hctx.lineCap = "round";
    hctx.shadowColor = "rgba(220,70,50,0.6)"; hctx.shadowBlur = 8;
    hctx.beginPath(); hctx.moveTo(ex - 7, ey - 7); hctx.lineTo(ex + 7, ey + 7); hctx.stroke();
    hctx.beginPath(); hctx.moveTo(ex + 7, ey - 7); hctx.lineTo(ex - 7, ey + 7); hctx.stroke();
  }
  hctx.restore();
};

const connectLine = (hctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, prog: number, t: number) => {
  const p = Math.min(prog, 1);
  const ex = x1 + (x2 - x1) * p, ey = y1 + (y2 - y1) * p;
  hctx.save();
  hctx.lineWidth = 14; hctx.strokeStyle = "rgba(245,158,11,0.05)";
  hctx.beginPath(); hctx.moveTo(x1, y1); hctx.lineTo(ex, ey); hctx.stroke();
  hctx.lineWidth = 1.8; hctx.strokeStyle = "#f59e0b";
  hctx.setLineDash([10, 7]); hctx.lineDashOffset = -t * 0.6;
  hctx.beginPath(); hctx.moveTo(x1, y1); hctx.lineTo(ex, ey); hctx.stroke();
  hctx.setLineDash([]);
  if (prog >= 1) {
    for (let i = 0; i < 3; i++) {
      const tp = ((t * 0.018 + i * 0.33) % 1);
      const px = x1 + (x2 - x1) * tp, py = y1 + (y2 - y1) * tp;
      hctx.beginPath(); hctx.arc(px, py, 4, 0, Math.PI * 2);
      hctx.fillStyle = "#f59e0b"; hctx.globalAlpha = 0.9;
      hctx.shadowColor = "#f59e0b"; hctx.shadowBlur = 14;
      hctx.fill();
    }
  }
  hctx.restore();
};

const bubble = (hctx: CanvasRenderingContext2D, x: number, y: number, text: string, col: string, alpha: number) => {
  hctx.save(); hctx.globalAlpha = alpha;
  const w = text.length * 7.6 + 24, h = 28;
  const bx = x - w / 2, by = y - h - 12;
  hctx.fillStyle = "rgba(8,8,8,0.92)"; hctx.strokeStyle = col; hctx.lineWidth = 1.5;
  hctx.shadowColor = col; hctx.shadowBlur = 8;
  hctx.beginPath(); hctx.roundRect(bx, by, w, h, 6); hctx.fill(); hctx.stroke();
  hctx.shadowBlur = 0;
  hctx.beginPath(); hctx.moveTo(x - 5, by + h); hctx.lineTo(x, by + h + 10); hctx.lineTo(x + 5, by + h);
  hctx.closePath(); hctx.fillStyle = "rgba(8,8,8,0.92)"; hctx.fill();
  hctx.strokeStyle = col; hctx.stroke();
  hctx.fillStyle = col; hctx.font = `11px monospace`;
  hctx.textAlign = "center"; hctx.fillText(text, x, by + h - 8);
  hctx.restore();
};

export function GlobeStoryboard() {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sceneIdx, setSceneIdx] = useState(0);

  const SCENES = [
    { badge: "SCENE 1 OF 5", title: "Client lost — searching for the right expert…" },
    { badge: "SCENE 2 OF 5", title: "Trying to connect… but every node fails." },
    { badge: "SCENE 3 OF 5", title: "Infollion scans the entire globe…" },
    { badge: "SCENE 4 OF 5", title: "Expert located — transforming!" },
    { badge: "SCENE 5 OF 5", title: "Connected. Knowledge flows. ✓" },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!mountRef.current || !canvasRef.current) return;

    const mount = mountRef.current;
    const hud = canvasRef.current;
    const hctx = hud.getContext("2d");
    if (!hctx) return;

    let W = mount.clientWidth;
    let H = mount.clientHeight;

    // --- THREE.JS SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0e0e0e, 500, 2200);

    const cam = new THREE.PerspectiveCamera(45, W / H, 1, 2000);
    cam.position.set(0, 40, 340);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x0e0e0e, 0); 
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffa040, 0.25));
    const dl1 = new THREE.DirectionalLight(0xffffff, 0.5); dl1.position.set(-300, 200, 350); scene.add(dl1);
    const dl2 = new THREE.DirectionalLight(0xddccaa, 0.3); dl2.position.set(300, 350, -200); scene.add(dl2);
    const pl = new THREE.PointLight(0xffcc60, 0.35, 800); pl.position.set(-200, 300, 200); scene.add(pl);
    const dl3 = new THREE.DirectionalLight(0x334466, 0.2); dl3.position.set(0, -300, -300); scene.add(dl3);

    const controls = new OrbitControls(cam, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.22;
    controls.minDistance = controls.maxDistance = 340;
    controls.minPolarAngle = Math.PI * 0.28;
    controls.maxPolarAngle = Math.PI * 0.72;
    controls.dampingFactor = 0.07;
    controls.enableDamping = true;

    const AMBER = "#f59e0b";

    const arcs = [
      { order: 1, startLat: 28.61, startLng: 77.21, endLat: 3.14, endLng: 101.69, arcAlt: 0.22, color: AMBER },
      { order: 2, startLat: 51.51, startLng: -0.13, endLat: 3.14, endLng: 101.69, arcAlt: 0.34, color: AMBER },
      { order: 3, startLat: -33.87, startLng: 151.21, endLat: 22.32, endLng: 114.17, arcAlt: 0.31, color: AMBER },
      { order: 4, startLat: 34.05, startLng: -118.24, endLat: 51.51, endLng: -0.13, arcAlt: 0.26, color: AMBER },
      { order: 5, startLat: 14.6, startLng: 120.98, endLat: 51.51, endLng: -0.13, arcAlt: 0.31, color: AMBER },
    ];

    let rawPts: any[] = [];
    arcs.forEach(a => {
      rawPts.push({ size: 3, order: a.order, color: a.color, lat: a.startLat, lng: a.startLng });
      rawPts.push({ size: 3, order: a.order, color: a.color, lat: a.endLat, lng: a.endLng });
    });
    const pts = rawPts.filter((v, i, arr) => arr.findIndex(v2 => v2.lat === v.lat && v2.lng === v.lng) === i);

    const globe = new ThreeGlobe()
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.68)
      .showAtmosphere(true)
      .atmosphereColor("#444444")
      .atmosphereAltitude(0.1)
      .hexPolygonColor(() => "rgba(255,255,255,0.15)")
      .arcsData(arcs)
      .arcStartLat((d: any) => d.startLat).arcStartLng((d: any) => d.startLng)
      .arcEndLat((d: any) => d.endLat).arcEndLng((d: any) => d.endLng)
      .arcColor((d: any) => d.color)
      .arcAltitude((d: any) => d.arcAlt)
      .arcStroke(() => [0.26, 0.22, 0.32][Math.floor(Math.random() * 3)])
      .arcDashLength(0.88)
      .arcDashInitialGap((d: any) => d.order)
      .arcDashGap(20)
      .arcDashAnimateTime(3400)
      .pointsData(pts)
      .pointColor((d: any) => d.color)
      .pointsMerge(true)
      .pointAltitude(0.01)
      .pointRadius(2.5);

    const mat = globe.globeMaterial() as any;
    mat.color = new THREE.Color("#3a3a3a");
    mat.emissive = new THREE.Color("#2a2a2a");
    mat.emissiveIntensity = 0.2;
    mat.shininess = 0.6;

    fetch("https://cdn.jsdelivr.net/npm/three-globe@2.30.0/example/gen-data/ne_110m_admin_0_countries.geojson")
      .then(r => r.json()).then(d => globe.hexPolygonsData(d.features)).catch(() => {});

    scene.add(globe);

    // --- HUD LOGIC ---
    let localSceneIdx = 0;
    let sceneT = 0;
    let totalT = 0;
    const SCENE_DUR = [340, 310, 320, 310, 360];

    const easeOut = (x: number) => 1 - (1 - x) * (1 - x);
    const easeInOut = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

    function drawHUD() {
      if (!hctx || !hud) return;
      
      const cx = hud.width * 0.5;
      const cy = hud.height * 0.52;
      const gr = Math.min(hud.width, hud.height) * 0.36;
      const f = sceneT;
      const sc = localSceneIdx;

      const clientX = cx - gr * 0.68, clientY = cy + gr * 0.75;
      const expertX = cx + gr * 0.55, expertY = cy - gr * 0.32;
      const failNodes = [
        { x: cx - gr * 0.26, y: cy - gr * 0.55 },
        { x: cx + gr * 0.65, y: cy + gr * 0.22 },
        { x: cx - gr * 0.62, y: cy + gr * 0.08 },
        { x: cx + gr * 0.20, y: cy - gr * 0.68 },
        { x: cx - gr * 0.08, y: cy + gr * 0.58 },
      ];

      // Scene Logic
      if (sc === 0) {
        failNodes.forEach(n => greyRingNode(hctx, n.x, n.y, 5, 0.28));
        stickman(hctx, clientX, clientY, 1.1, "#f59e0b", totalT, "Client", { confused: true });
      } else if (sc === 1) {
        stickman(hctx, clientX, clientY, 1.1, "#f59e0b", totalT, "Client", { confused: true });
        failNodes.forEach((n, i) => {
          const delay = i * 38;
          const prog = Math.max(0, Math.min(1, (f - delay) / 60));
          failLine(hctx, clientX, clientY - 28, n.x, n.y, prog, f > delay + 90);
          greyRingNode(hctx, n.x, n.y, 5, 0.48);
        });
      } else if (sc === 2) {
        const appear = easeOut(Math.min(1, f / 55));
        infollionO(hctx, cx, cy, 26 * appear, appear);
        for (let w = 0; w < 3; w++) {
          const wT = Math.max(0, f - 55 - w * 42);
          const wProg = Math.min(1, wT / 170);
          const wR = wProg * (gr + 100) * appear;
          const wA = Math.max(0, (0.92 - wProg) * appear);
          scanWave(hctx, cx, cy, wR, wA);
        }
      } else if (sc === 3) {
        infollionO(hctx, cx, cy, 17, 0.48);
        const tProg = easeInOut(Math.min(1, f / 130));
        if (tProg > 0.2) stickman(hctx, expertX, expertY - 12, 0.95, "#f59e0b", totalT, "Expert", { fillHead: true });
      } else if (sc === 4) {
        stickman(hctx, clientX, clientY, 1.1, "#f59e0b", totalT, "Client");
        stickman(hctx, expertX, expertY - 12, 1.0, "#f59e0b", totalT, "Expert", { fillHead: true });
        const cp = easeOut(Math.min(1, f / 85));
        connectLine(hctx, clientX, clientY - 28, expertX, expertY - 40, cp, f);
        if (f > 60) bubble(hctx, clientX, clientY - 70, "I need an expert!", "#f59e0b", easeOut(Math.min(1, (f - 60) / 50)));
        if (f > 120) bubble(hctx, expertX, expertY - 72, "I've got you.", "#f59e0b", easeOut(Math.min(1, (f - 120) / 50)));
      }
    }

    const loop = () => {
      controls.update();
      renderer.render(scene, cam);
      drawHUD();
      sceneT++; totalT++;
      if (sceneT >= SCENE_DUR[localSceneIdx]) {
        localSceneIdx = (localSceneIdx + 1) % SCENE_DUR.length;
        setSceneIdx(localSceneIdx);
        sceneT = 0;
      }
      requestAnimationFrame(loop);
    };

    const animId = requestAnimationFrame(loop);

    const handleResize = () => {
      if (!mount) return;
      W = mount.clientWidth; H = mount.clientHeight;
      cam.aspect = W / H; cam.updateProjectionMatrix();
      renderer.setSize(W, H);
      if (hud) {
        hud.width = W; hud.height = H;
      }
    };
    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      if (mount && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] lg:h-[700px] bg-[#0e0e0e] rounded-[3rem] overflow-hidden shadow-2xl border border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,_#1a1812_0%,_#0e0e0e_70%)]" />
      <div ref={mountRef} className="absolute inset-0 z-0" />
      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

      {/* Top UI */}
      <div className="absolute top-0 left-0 right-0 p-8 z-20 flex justify-between items-start pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-[3px] border-[#888] flex items-center justify-center relative">
            <div className="w-2 h-2 rounded-full bg-[#f59e0b]" />
            <div className="absolute inset-0 rounded-full border border-[#f59e0b]/50 m-1" />
          </div>
          <span className="font-syne text-lg font-extrabold text-white tracking-tight">
            infoll<span className="text-[#f59e0b]">i</span>on
          </span>
        </div>
        <div className="px-4 py-1.5 rounded-full border border-white/10 bg-black/50 text-white/30 text-[9px] tracking-[0.18em] font-mono uppercase">
          {SCENES[sceneIdx].badge}
        </div>
      </div>

      {/* Stage Title */}
      <div className="absolute top-24 left-0 right-0 text-center z-20 pointer-events-none px-6">
        <h2 className="font-syne text-lg md:text-xl font-semibold text-white tracking-tight drop-shadow-2xl transition-opacity duration-300">
          {SCENES[sceneIdx].title}
        </h2>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20 pointer-events-none">
        {SCENES.map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 rounded-full transition-all duration-500 ${i === sceneIdx ? "w-5 bg-[#f59e0b] shadow-[0_0_8px_#f59e0b]" : "w-1.5 bg-white/20"}`} 
          />
        ))}
      </div>

      {/* Stats Bar */}
      <div className={`absolute bottom-20 left-0 right-0 flex justify-center gap-12 z-20 pointer-events-none transition-all duration-700 ${sceneIdx === 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        {[
          { val: "50K+", label: "Experts" },
          { val: "120+", label: "Countries" },
          { val: "98%", label: "Match Rate" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="font-syne text-2xl font-extrabold text-[#f59e0b] tracking-tighter">{stat.val}</div>
            <div className="text-[9px] tracking-[0.14em] text-white/40 uppercase font-mono">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#0e0e0e] to-transparent pointer-events-none z-10" />
    </div>
  );
}
