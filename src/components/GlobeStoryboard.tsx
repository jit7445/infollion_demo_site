"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
// @ts-ignore
import ThreeGlobe from "three-globe";
// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/* ── Narrative Drawing Helpers ── */

const drawSilhouette = (hctx: CanvasRenderingContext2D, x: number, y: number, r: number, col: string) => {
  hctx.save();
  hctx.translate(x, y);

  // Background Circle
  hctx.beginPath();
  hctx.arc(0, 0, r, 0, Math.PI * 2);
  hctx.fillStyle = col;
  hctx.fill();

  // Silhouette
  hctx.fillStyle = "rgba(255,255,255,0.85)";
  // Head
  hctx.beginPath();
  hctx.arc(0, -r * 0.2, r * 0.35, 0, Math.PI * 2);
  hctx.fill();
  // Body
  hctx.beginPath();
  hctx.arc(0, r * 0.9, r * 0.7, Math.PI, 0);
  hctx.fill();

  hctx.restore();
};

const modernStickman = (
  hctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  col: string,
  totalT: number,
  opts: any = {},
) => {
  hctx.save();
  hctx.strokeStyle = col;
  hctx.fillStyle = col;
  hctx.lineWidth = 4 * s;
  hctx.lineCap = "round";
  hctx.lineJoin = "round";
  hctx.shadowColor = col;
  hctx.shadowBlur = 15 * s;
  hctx.beginPath();
  hctx.arc(x, y - 24 * s, 10 * s, 0, Math.PI * 2);
  hctx.fill();
  const breath = Math.sin(totalT * 0.05) * 1 * s;
  hctx.beginPath();
  hctx.moveTo(x, y - 14 * s);
  hctx.lineTo(x, y + 10 * s + breath);
  hctx.stroke();
  const armWave = Math.sin(totalT * 0.06) * 5 * s;
  if (opts.interacting) {
    hctx.beginPath();
    hctx.moveTo(x, y - 4 * s);
    hctx.lineTo(x - 18 * s, y - 14 * s + armWave);
    hctx.stroke();
    hctx.beginPath();
    hctx.moveTo(x, y - 4 * s);
    hctx.lineTo(x + 16 * s, y + 6 * s);
    hctx.stroke();
  } else {
    hctx.beginPath();
    hctx.moveTo(x, y - 4 * s);
    hctx.lineTo(x - 14 * s, y + 8 * s + armWave);
    hctx.stroke();
    hctx.beginPath();
    hctx.moveTo(x, y - 4 * s);
    hctx.lineTo(x + 14 * s, y + 8 * s - armWave);
    hctx.stroke();
  }
  hctx.beginPath();
  hctx.moveTo(x, y + 10 * s + breath);
  hctx.lineTo(x - 10 * s, y + 28 * s);
  hctx.stroke();
  hctx.beginPath();
  hctx.moveTo(x, y + 10 * s + breath);
  hctx.lineTo(x + 10 * s, y + 28 * s);
  hctx.stroke();
  hctx.restore();
};

const drawWaveform = (
  hctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  t: number,
  col: string,
) => {
  hctx.save();
  hctx.strokeStyle = col;
  hctx.lineWidth = 2.5;
  hctx.shadowColor = col;
  hctx.shadowBlur = 12;
  const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const angle = Math.atan2(y2 - y1, x2 - x1);
  hctx.translate(x1, y1);
  hctx.rotate(angle);
  hctx.beginPath();
  hctx.moveTo(0, 0);
  for (let i = 0; i <= dist; i += 5) {
    const amp = Math.sin(t * 0.2 + i * 0.1) * 12 * Math.sin(t * 0.05);
    hctx.lineTo(i, amp);
  }
  hctx.stroke();
  hctx.restore();
};

const brokenLine = (
  hctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  t: number,
  col: string,
) => {
  hctx.save();
  hctx.strokeStyle = col;
  hctx.lineWidth = 2;
  hctx.setLineDash([8, 12]);
  const snap = Math.sin(t * 0.8) > 0.8;
  if (snap) {
    hctx.globalAlpha = 0.2;
    hctx.beginPath();
    hctx.moveTo(x1, y1);
    hctx.lineTo(x1 + (x2 - x1) * 0.4, y1 + (y2 - y1) * 0.4);
    hctx.stroke();
    hctx.beginPath();
    hctx.moveTo(x2, y2);
    hctx.lineTo(x2 - (x2 - x1) * 0.4, y2 - (y2 - y1) * 0.4);
    hctx.stroke();
  } else {
    hctx.globalAlpha = 0.7;
    hctx.beginPath();
    hctx.moveTo(x1, y1);
    hctx.lineTo(x2, y2);
    hctx.stroke();
  }
  hctx.restore();
};

export function GlobeStoryboard() {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDark, setIsDark] = useState(true);

  const oLogo = useRef<HTMLImageElement | null>(null);
  const fullLogo = useRef<HTMLImageElement | null>(null);
  const expertAvatar = useRef<HTMLImageElement | null>(null);
  const avatars = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.classList.contains("dark"));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const imgO = new Image();
    imgO.src = "/images/o_logo.svg";
    imgO.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 512; canvas.height = 512;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(imgO, 0, 0, 512, 512);
      const imgData = ctx.getImageData(0, 0, 512, 512);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i+1], b = data[i+2];
        // Target the dark grey circle background specifically
        // Any pixel that is dark greyish gets removed
        if (r < 100 && g < 100 && b < 100 && Math.abs(r-g) < 20 && Math.abs(g-b) < 20) {
          data[i+3] = 0;
        }
      }
      ctx.putImageData(imgData, 0, 0);
      oLogo.current = canvas as any;
    };
    const imgFull = new Image();
    imgFull.src = "/images/logo_hd.png";
    fullLogo.current = imgFull;
    const imgExp = new Image();
    imgExp.src = "https://i.pravatar.cc/100?img=32";
    expertAvatar.current = imgExp;

    // Preload avatars for the network
    for (let i = 1; i <= 8; i++) {
      const img = new Image();
      img.src = `https://i.pravatar.cc/100?img=${i + 10}`;
      avatars.current.push(img);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!mountRef.current || !canvasRef.current) return;

    const mount = mountRef.current;
    const hud = canvasRef.current;
    const hctx = hud.getContext("2d");
    if (!hctx) return;

    let W = mount.clientWidth;
    let H = mount.clientHeight;

    const colors = {
      bg: isDark ? 0x0a0a0a : 0xfdfcf7,
      accent: "#ec9324",
      profileDefault: "#5b6b8b",
    };

    // --- THREE.JS ---
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(40, W / H, 1, 2000);
    cam.position.set(0, 0, 360); // Zoom out slightly to fit all pins

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(colors.bg, 1); // Set clear color to match container bg
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, isDark ? 0.4 : 0.8));
    const dl = new THREE.DirectionalLight(0xffffff, 0.5);
    dl.position.set(200, 200, 200);
    scene.add(dl);

    const controls = new OrbitControls(cam, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = false; // We'll handle rotation manually for perfect HUD sync
    controls.minDistance = controls.maxDistance = 360;
    controls.enableDamping = true;

    // Top 20 Global Hubs Coordinates
    const top20 = [
      { lat: 40.7128, lng: -74.006, label: "USA" },
      { lat: 51.5074, lng: -0.1278, label: "UK" },
      { lat: 35.6762, lng: 139.6503, label: "Japan" },
      { lat: 28.6139, lng: 77.209, label: "India" },
      { lat: 48.8566, lng: 2.3522, label: "France" },
      { lat: 52.52, lng: 13.405, label: "Germany" },
      { lat: 31.2304, lng: 121.4737, label: "China" },
      { lat: -33.8688, lng: 151.2093, label: "Australia" },
      { lat: -22.9068, lng: -43.1729, label: "Brazil" },
      { lat: 25.2048, lng: 55.2708, label: "UAE" },
      { lat: 1.3521, lng: 103.8198, label: "Singapore" },
      { lat: 43.6532, lng: -79.3832, label: "Canada" },
      { lat: -33.9249, lng: 18.4241, label: "South Africa" },
      { lat: 55.7558, lng: 37.6173, label: "Russia" },
      { lat: 19.4326, lng: -99.1332, label: "Mexico" },
      { lat: 41.9028, lng: 12.4964, label: "Italy" },
      { lat: 37.5665, lng: 126.978, label: "South Korea" },
      { lat: 52.3676, lng: 4.9041, label: "Netherlands" },
      { lat: 40.4168, lng: -3.7038, label: "Spain" },
      { lat: 47.3769, lng: 8.5417, label: "Switzerland" },
    ];

    const profiles = [
      ...top20.map((loc, i) => ({
        ...loc,
        id: i,
        avatarIdx: i % avatars.current.length,
      })),
      // Add 40 more random experts
      ...Array.from({ length: 40 }).map((_, i) => ({
        lat: (Math.random() - 0.5) * 150,
        lng: (Math.random() - 0.5) * 360,
        label: "Expert",
        id: i + 20,
        avatarIdx: (i + 20) % avatars.current.length,
      })),
    ];

    const globe = new ThreeGlobe()
      .globeImageUrl("https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
      .bumpImageUrl("https://unpkg.com/three-globe/example/img/earth-topology.png")
      .showAtmosphere(true)
      .atmosphereColor("#4444ff")
      .atmosphereAltitude(0.12);

    scene.add(globe);
    globe.position.y = 0; // Center globe perfectly

    // --- STORYBOARD LOOP ---
    let totalT = 0;
    let sceneT = 0;
    let currentStage = 0;
    let matchedExpertIdx = Math.floor(Math.random() * profiles.length); 
    const STAGE_DUR = [200, 350, 400, 150, 400, 450];

    function drawHUD() {
      if (!hctx || !hud) return;
      hctx.clearRect(0, 0, hud.width, hud.height);
      const cx = hud.width * 0.5;
      const cy = hud.height * 0.5;
      const dist = Math.min(hud.width, hud.height) * 0.45;
      const isMobile = hud.width < 768;
      const uiScale = isMobile ? dist / 220 : dist / 340;
      const s = uiScale;
      const f = sceneT;
      const st = currentStage;

      const clientPos = { 
        x: cx - dist * (isMobile ? 0.8 : 0.75), 
        y: cy + dist * (isMobile ? 0.6 : 0.65) 
      };

      // Project 3D positions to 2D
      const vec = new THREE.Vector3();
      const projectedProfiles = profiles.map((p) => {
        const phi = (90 - p.lat) * (Math.PI / 180);
        const theta = (p.lng + 180) * (Math.PI / 180);
        vec.set(100 * Math.sin(phi) * Math.cos(theta), 100 * Math.cos(phi), 100 * Math.sin(phi) * Math.sin(theta));
        vec.applyMatrix4(globe.matrixWorld);
        const zDepth = vec.z;
        vec.project(cam);
        const screenX = (vec.x * 0.5 + 0.5) * W;
        const screenY = (-vec.y * 0.5 + 0.5) * H;
        return { ...p, screenX, screenY, visible: vec.z < 1 && zDepth > -20 };
      });

      const expert = projectedProfiles[matchedExpertIdx];

      // Draw Profiles
      projectedProfiles.forEach((p, i) => {
        if (!p.visible) return;

        // Fade out everything in the final logo stage for clean outro
        const fadeOut = st === 5 ? Math.max(0, 1 - f / 40) : 1;
        hctx.save();
        hctx.globalAlpha *= fadeOut;

        // Failure sequence targets logic
        const failCount = 5;
        const failDuration = Math.floor(STAGE_DUR[1] / failCount);
        const failIdx = Math.floor(f / failDuration);
        const failSeeds = [7, 13, 3, 17, 22];
        const currentFailIdx = failSeeds[failIdx % failSeeds.length] % projectedProfiles.length;

        const isMatch = (st === 3 || st === 4) && i === matchedExpertIdx;
        const isFailTarget = st === 1 && i === currentFailIdx;
        const col = isMatch || isFailTarget ? colors.accent : colors.profileDefault;

        // Base Dot (Small red dot as per image 1)
        hctx.beginPath();
        hctx.arc(p.screenX, p.screenY, 2.5 * s, 0, Math.PI * 2);
        hctx.fillStyle = "#ff4444";
        hctx.fill();

        // Connector Line
        const offY = 25 * s;
        hctx.beginPath();
        hctx.moveTo(p.screenX, p.screenY);
        hctx.lineTo(p.screenX, p.screenY - offY);
        hctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        hctx.lineWidth = 1;
        hctx.stroke();

        const avR = 14 * s;
        // Avatar / Silhouette
        if (isMatch || isFailTarget) {
          if (isMatch && expertAvatar.current && expertAvatar.current.complete) {
            hctx.save();
            hctx.beginPath();
            hctx.arc(p.screenX, p.screenY - offY - avR, avR, 0, Math.PI * 2);
            hctx.clip();
            hctx.drawImage(expertAvatar.current, p.screenX - avR, p.screenY - offY - avR * 2, avR * 2, avR * 2);
            hctx.restore();
          } else {
            drawSilhouette(hctx, p.screenX, p.screenY - offY - avR, avR, colors.accent);
          }
          // Orange ring for both match and current fail target
          hctx.beginPath();
          hctx.arc(p.screenX, p.screenY - offY - avR, avR, 0, Math.PI * 2);
          hctx.strokeStyle = colors.accent;
          hctx.lineWidth = 2.5 * s;
          hctx.stroke();
        } else {
          drawSilhouette(hctx, p.screenX, p.screenY - offY - avR, avR, colors.profileDefault);
        }
        hctx.restore();
      });

      if (st === 0) {
        // Atmospheric: Only Globe + Profiles + Client
        modernStickman(hctx, clientPos.x, clientPos.y, 1.1 * s, colors.accent, totalT);
      } else if (st === 1) {
        // Failed Connections
        modernStickman(hctx, clientPos.x, clientPos.y, 1.1 * s, colors.accent, totalT, { interacting: true });
        
        const failCount = 5;
        const failDuration = Math.floor(STAGE_DUR[1] / failCount);
        const failIdx = Math.floor(f / failDuration);
        const failSeeds = [7, 13, 3, 17, 22];
        const currentFailIdx = failSeeds[failIdx % failSeeds.length] % projectedProfiles.length;
        const targetExpert = projectedProfiles[currentFailIdx];

        if (targetExpert && targetExpert.visible) {
          brokenLine(hctx, clientPos.x, clientPos.y - 30 * s, targetExpert.screenX, targetExpert.screenY - 25 * s, totalT, "#ff4444");
          
          // Draw Red Cross over Target Expert
          const ex = targetExpert.screenX, ey = targetExpert.screenY - 39 * s;
          const sz = 12 * s;
          hctx.save();
          hctx.strokeStyle = "#ff4444";
          hctx.lineWidth = 3 * s;
          hctx.beginPath();
          hctx.moveTo(ex - sz, ey - sz); hctx.lineTo(ex + sz, ey + sz);
          hctx.moveTo(ex + sz, ey - sz); hctx.lineTo(ex - sz, ey + sz);
          hctx.stroke();
          hctx.restore();
        }
      } else if (st === 2) {
        // Infollion "O" Scan
        modernStickman(hctx, clientPos.x, clientPos.y, 1.1 * s, colors.accent, totalT);

        // Professional Radar Sweep (Trailing Fade Wedge)
        hctx.save();
        // Clip to globe boundary only
        hctx.beginPath();
        hctx.arc(cx, cy, dist, 0, Math.PI * 2);
        hctx.clip();
        
        hctx.translate(cx, cy);
        hctx.rotate(f * 0.06); // Spin speed
        
        const radarConic = hctx.createConicGradient(0, 0, 0);
        radarConic.addColorStop(0, "rgba(236,147,36,0.25)"); // Lead edge
        radarConic.addColorStop(0.25, "rgba(236,147,36,0)"); // Trailing fade (90 deg)
        radarConic.addColorStop(1, "rgba(236,147,36,0)");
        
        hctx.fillStyle = radarConic;
        hctx.beginPath();
        hctx.arc(0, 0, dist * 1.8, 0, Math.PI * 2);
        hctx.fill();
        hctx.restore();

        if (oLogo.current) {
          const logoS = (isMobile ? 60 : 80);
          const sGrow = Math.max(logoS, (isMobile ? 180 : 240) - f * 2.5);
          const alpha = Math.min(1, f / 40);
          hctx.save();
          hctx.globalAlpha = alpha;

          hctx.drawImage(oLogo.current, cx - sGrow / 2, cy - sGrow / 2, sGrow, sGrow);
          hctx.restore();
        }
        if (f > 80) {
          const scanR = ((f - 80) * 7) % (dist * 2.5);
          hctx.beginPath();
          hctx.arc(cx, cy, scanR, 0, Math.PI * 2);
          hctx.strokeStyle = colors.accent;
          hctx.lineWidth = 3 * s;
          hctx.stroke();
        }
      } else if (st === 3) {
        // Expert Match (Orange)
        modernStickman(hctx, clientPos.x, clientPos.y, 1.1 * s, colors.accent, totalT);
        hctx.beginPath();
        hctx.arc(expert.screenX, expert.screenY - 39 * s, (24 + Math.sin(totalT * 0.1) * 6) * s, 0, Math.PI * 2);
        hctx.strokeStyle = colors.accent;
        hctx.lineWidth = 1.5 * s;
        hctx.stroke();
      } else if (st === 4) {
        // Conversation Waveform
        modernStickman(hctx, clientPos.x, clientPos.y, 1.1 * s, colors.accent, totalT);
        if (f > 30) {
          drawWaveform(
            hctx,
            clientPos.x + 20 * s,
            clientPos.y - 40 * s,
            expert.screenX,
            expert.screenY - 40 * s,
            totalT,
            colors.accent,
          );
        }
      } else if (st === 5) {
        // Final Logo (Outro)
        if (fullLogo.current) {
          const lw = isMobile ? 180 : 240,
            lh = isMobile ? 42 : 55;
          const alpha = Math.min(1, f / 60);
          hctx.save();
          hctx.globalAlpha = alpha;
          hctx.drawImage(fullLogo.current, cx - lw / 2, cy - lh / 2, lw, lh);
          hctx.restore();
        }
      }
    }

    const loop = () => {
      const st = currentStage;
      
      // Cinematic slow rotation for smooth motion throughout all stages
      globe.rotation.y -= 0.0015;
      
      // Add cinematic axial tilt (approx 23.5 degrees)
      globe.rotation.z = 0.41;

      controls.update();
      renderer.render(scene, cam);
      drawHUD();
      totalT++;
      sceneT++;
      if (sceneT >= STAGE_DUR[currentStage]) {
        sceneT = 0;
        currentStage = (currentStage + 1) % STAGE_DUR.length;
        // Randomize expert and start view for the next loop when we finish the last stage
        if (currentStage === 0) {
          matchedExpertIdx = Math.floor(Math.random() * profiles.length);
          globe.rotation.y = Math.random() * Math.PI * 2; // Random start view
        }
      }
      requestAnimationFrame(loop);
    };
    const animId = requestAnimationFrame(loop);

    const handleResize = () => {
      if (!mount) return;
      W = mount.clientWidth;
      H = mount.clientHeight;
      const isMobile = W < 768;

      cam.aspect = W / H;
      // Adjust camera distance for mobile to fit the globe nicely
      cam.position.z = isMobile ? 500 : 360; 
      cam.updateProjectionMatrix();
      
      renderer.setSize(W, H);
      if (hud) {
        hud.width = W;
        hud.height = H;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      if (mount && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isDark]);

  return (
    <div
      className={`relative w-full h-[450px] md:h-[600px] lg:h-[700px] transition-all duration-1000 overflow-hidden ${isDark ? "bg-[#0A0A0A]" : "bg-[#FDFCF7]"}`}
      style={{
        maskImage: "radial-gradient(circle at center, black 50%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(circle at center, black 50%, transparent 100%)"
      }}
    >
      {/* Background Glow */}
      <div className={`absolute inset-0 z-0 opacity-40 ${isDark ? "bg-[radial-gradient(circle_at_center,#1a1a1a_0%,transparent_70%)]" : "bg-[radial-gradient(circle_at_center,#f0f0f0_0%,transparent_70%)]"}`} />
      
      <div ref={mountRef} className="absolute inset-0 z-10" />
      <canvas ref={canvasRef} className="absolute inset-0 z-20 pointer-events-none" />
      
      {/* Soft Bottom Dissolve */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t pointer-events-none z-30 ${isDark ? "from-[#0A0A0A]" : "from-[#FDFCF7]"} to-transparent opacity-80`}
      />
    </div>
  );
}
