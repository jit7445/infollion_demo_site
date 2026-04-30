"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const TeamAssemblyIllustration = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes bgReveal {
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideFromLeft {
          from { opacity: 0; transform: translateX(-160px) rotate(-5deg); }
          to   { opacity: 1; transform: translateX(0) rotate(0deg); }
        }
        @keyframes dropFromTop {
          from { opacity: 0; transform: translateY(-180px) scale(0.7); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideFromRight {
          from { opacity: 0; transform: translateX(160px) rotate(5deg); }
          to   { opacity: 1; transform: translateX(0) rotate(0deg); }
        }
        @keyframes riseFromBottom {
          from { opacity: 0; transform: translateY(120px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          from { opacity:0; transform: scale(0) rotate(-15deg); }
          60%  { transform: scale(1.15) rotate(3deg); }
          to   { opacity:1; transform: scale(1) rotate(0); }
        }
        @keyframes charEntry1 { from { opacity:0; transform: translateX(-200px) rotate(-15deg); } to { opacity:1; transform: translateX(0) rotate(0); } }
        @keyframes charEntry2 { from { opacity:0; transform: translateY(200px) rotate(10deg); } to { opacity:1; transform: translateY(0) rotate(0); } }
        @keyframes charEntry3 { from { opacity:0; transform: translateY(200px) scale(0.5); } to { opacity:1; transform: translateY(0) scale(1); } }
        @keyframes charEntry4 { from { opacity:0; transform: translateY(-200px) rotate(-8deg); } to { opacity:1; transform: translateY(0) rotate(0); } }
        @keyframes charEntry5 { from { opacity:0; transform: translateX(200px) rotate(12deg); } to { opacity:1; transform: translateX(0) rotate(0); } }
        @keyframes charEntry6 { from { opacity:0; transform: translateY(200px) scale(0.6); } to { opacity:1; transform: translateY(0) scale(1); } }
        @keyframes charEntry7 { from { opacity:0; transform: translateX(200px) rotate(-10deg); } to { opacity:1; transform: translateX(0) rotate(0); } }
        
        @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes float3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

        .piece { opacity: 0; will-change: transform, opacity; }
        .shelf { animation: slideFromLeft 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.4s forwards; }
        .chart-area { animation: dropFromTop 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.5s forwards; }
        .calendar { animation: slideFromRight 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.55s forwards; }
        .window-frame { animation: slideFromRight 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.6s forwards; }
        .desk { animation: riseFromBottom 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.65s forwards; }
        .plant { animation: riseFromBottom 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.7s forwards; }
        
        .char-1 { animation: charEntry1 0.9s cubic-bezier(0.34,1.56,0.64,1) 0.75s forwards, float1 3s ease-in-out 2.2s infinite; }
        .char-2 { animation: charEntry2 0.9s cubic-bezier(0.34,1.56,0.64,1) 0.85s forwards, float2 3.4s ease-in-out 2.4s infinite; }
        .char-3 { animation: charEntry3 0.9s cubic-bezier(0.34,1.56,0.64,1) 0.95s forwards, float3 2.8s ease-in-out 2.6s infinite; }
        .char-4 { animation: charEntry4 0.9s cubic-bezier(0.34,1.56,0.64,1) 1.05s forwards; }
        .char-5 { animation: charEntry5 0.9s cubic-bezier(0.34,1.56,0.64,1) 1.15s forwards; }
        .char-6 { animation: charEntry6 0.9s cubic-bezier(0.34,1.56,0.64,1) 1.25s forwards; }
        .char-7 { animation: charEntry7 0.9s cubic-bezier(0.34,1.56,0.64,1) 1.35s forwards; }
        
        .bubble-like { animation: popIn 0.5s cubic-bezier(0.34,1.8,0.64,1) 1.6s forwards; }
      `}</style>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="relative w-full h-full flex items-center justify-center"
      >
        <svg viewBox="0 0 820 480" className="w-full h-full max-h-full relative z-10 drop-shadow-2xl">
          {/* Transparent Background */}
          {/* ========== BOOKSHELF ========== */}
          <g className="piece shelf">
            <rect x="22" y="82" width="90" height="220" rx="4" fill="#1e2235"/>
            <rect x="22" y="82" width="5" height="220" fill="#161929"/>
            <rect x="107" y="82" width="5" height="220" fill="#161929"/>
            <rect x="22" y="130" width="90" height="6" fill="#13162a"/>
            <rect x="22" y="190" width="90" height="6" fill="#13162a"/>
            <rect x="22" y="250" width="90" height="6" fill="#13162a"/>
            <rect x="28" y="90" width="12" height="38" rx="1" fill="#e8614f"/>
            <rect x="42" y="94" width="10" height="34" rx="1" fill="#f0f0f0"/>
            <rect x="54" y="92" width="14" height="36" rx="1" fill="#4a7c59"/>
            <rect x="70" y="95" width="10" height="33" rx="1" fill="#7b8fc4"/>
            <rect x="82" y="91" width="12" height="37" rx="1" fill="#e8c14f"/>
            <rect x="28" y="148" width="10" height="40" rx="1" fill="#7b8fc4"/>
            <rect x="40" y="145" width="14" height="43" rx="1" fill="#e8614f"/>
            <rect x="56" y="150" width="10" height="38" rx="1" fill="#f0f0f0"/>
            <rect x="68" y="147" width="16" height="41" rx="1" fill="#c4a47b"/>
            <rect x="86" y="149" width="10" height="39" rx="1" fill="#4a7c59"/>
            <rect x="28" y="208" width="14" height="40" rx="1" fill="#e8c14f"/>
            <rect x="44" y="210" width="10" height="38" rx="1" fill="#e8614f"/>
            <rect x="56" y="206" width="12" height="42" rx="1" fill="#f0f0f0"/>
            <rect x="70" y="209" width="10" height="39" rx="1" fill="#7b8fc4"/>
            <rect x="82" y="207" width="14" height="41" rx="1" fill="#4a7c59"/>
          </g>

          {/* ========== CHART / PROJECTOR ========== */}
          <g className="piece chart-area">
            <rect x="220" y="42" width="200" height="160" rx="6" fill="#f5f5f5"/>
            <rect x="225" y="47" width="190" height="150" rx="4" fill="#e8e8e8"/>
            <rect x="240" y="140" width="14" height="50" fill="#b0b8d0"/>
            <rect x="260" y="120" width="14" height="70" fill="#b0b8d0"/>
            <rect x="280" y="100" width="14" height="90" fill="#b0b8d0"/>
            <rect x="300" y="80"  width="14" height="110" fill="#b0b8d0"/>
            <rect x="320" y="95"  width="14" height="95" fill="#b0b8d0"/>
            <rect x="340" y="110" width="14" height="80" fill="#b0b8d0"/>
            <rect x="360" y="90"  width="14" height="100" fill="#b0b8d0"/>
            <rect x="380" y="70"  width="14" height="120" fill="#e8614f"/>
            <polyline points="240,160 300,120 360,100 400,70" stroke="#e8614f" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <polygon points="400,70 392,80 408,78" fill="#e8614f"/>
            <circle cx="390" cy="100" r="22" fill="#fff" stroke="#ccc" strokeWidth="2"/>
            <circle cx="390" cy="100" r="2" fill="#555"/>
            <line x1="390" y1="100" x2="390" y2="84" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
            <line x1="390" y1="100" x2="402" y2="107" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
          </g>

          {/* ========== CALENDAR ========== */}
          <g className="piece calendar">
            <rect x="490" y="82" width="130" height="110" rx="4" fill="#e8e8e8"/>
            <rect x="490" y="82" width="130" height="24" rx="4" fill="#c8c8c8"/>
            <rect x="496" y="114" width="14" height="10" rx="1" fill="#bbb"/>
            <rect x="514" y="114" width="14" height="10" rx="1" fill="#bbb"/>
            <rect x="532" y="114" width="14" height="10" rx="1" fill="#bbb"/>
            <rect x="550" y="114" width="14" height="10" rx="1" fill="#bbb"/>
            <rect x="568" y="114" width="14" height="10" rx="1" fill="#bbb"/>
            <rect x="586" y="114" width="14" height="10" rx="1" fill="#bbb"/>
            <rect x="496" y="130" width="14" height="10" rx="1" fill="#bbb"/>
            <rect x="514" y="130" width="14" height="10" rx="1" fill="#e8614f"/>
            <rect x="532" y="130" width="14" height="10" rx="1" fill="#bbb"/>
            <rect x="550" y="130" width="14" height="10" rx="1" fill="#bbb"/>
            <rect x="568" y="130" width="14" height="10" rx="1" fill="#bbb"/>
            <rect x="586" y="130" width="14" height="10" rx="1" fill="#bbb"/>
          </g>

          {/* ========== WINDOW ========== */}
          <g className="piece window-frame">
            <rect x="640" y="62" width="100" height="120" rx="4" fill="#dce0ee"/>
            <rect x="645" y="67" width="90" height="110" rx="2" fill="#c8cfe8"/>
            <line x1="690" y1="67" x2="690" y2="177" stroke="#b0b8d8" strokeWidth="2"/>
            <line x1="645" y1="122" x2="735" y2="122" stroke="#b0b8d8" strokeWidth="2"/>
            <ellipse cx="670" cy="100" rx="18" ry="12" fill="#6aaa7a" opacity="0.6"/>
            <ellipse cx="688" cy="108" rx="14" ry="10" fill="#4a8a5a" opacity="0.6"/>
            <line x1="680" y1="120" x2="680" y2="175" stroke="#5a3820" strokeWidth="3"/>
          </g>

          {/* ========== DESK ========== */}
          <g className="piece desk">
            <rect x="260" y="280" width="100" height="65" rx="4" fill="#2d3142"/>
            <rect x="264" y="284" width="92" height="57" rx="2" fill="#1a1d2e"/>
            <rect x="268" y="290" width="60" height="4" rx="1" fill="#4a7c59" opacity="0.8"/>
            <rect x="248" y="345" width="124" height="8" rx="2" fill="#3a3f58"/>
            <rect x="200" y="352" width="280" height="14" rx="2" fill="#222540"/>
            <rect x="210" y="370" width="12" height="40" rx="2" fill="#1e2235"/>
            <rect x="458" y="370" width="12" height="40" rx="2" fill="#1e2235"/>
          </g>

          {/* ========== PLANT ========== */}
          <g className="piece plant">
            <path d="M620 400 L600 380 L640 380 Z" fill="#c47b5a"/>
            <rect x="602" y="370" width="36" height="12" rx="2" fill="#d4855a"/>
            <line x1="620" y1="372" x2="608" y2="330" stroke="#4a7c59" strokeWidth="3"/>
            <line x1="620" y1="372" x2="632" y2="325" stroke="#4a7c59" strokeWidth="3"/>
            <line x1="620" y1="372" x2="618" y2="310" stroke="#4a7c59" strokeWidth="3"/>
            <ellipse cx="600" cy="322" rx="18" ry="10" fill="#4a7c59" transform="rotate(-30,600,322)"/>
            <ellipse cx="638" cy="316" rx="18" ry="10" fill="#3a6a49" transform="rotate(30,638,316)"/>
            <ellipse cx="618" cy="300" rx="16" ry="9" fill="#4a7c59" transform="rotate(-5,618,300)"/>
          </g>

          {/* ========== CHARACTERS ========== */}
          <g className="piece char-1">
            <ellipse cx="68" cy="200" rx="20" ry="40" fill="#1e2235"/>
            <circle cx="68" cy="148" r="22" fill="#c68642"/>
            <ellipse cx="68" cy="136" rx="22" ry="16" fill="#111"/>
            <path d="M48 200 Q50 170 68 165 Q86 170 88 200" fill="#222"/>
            <line x1="50" y1="195" x2="36" y2="220" stroke="#c68642" strokeWidth="8" strokeLinecap="round"/>
            <rect x="26" y="218" width="14" height="20" rx="2" fill="#333"/>
            <rect x="56" y="238" width="10" height="50" rx="4" fill="#1a1d2e"/>
            <rect x="70" y="238" width="10" height="50" rx="4" fill="#1a1d2e"/>
            <ellipse cx="61" cy="290" rx="10" ry="5" fill="#e8614f"/>
            <ellipse cx="75" cy="290" rx="10" ry="5" fill="#e8614f"/>
          </g>

          <g className="piece char-2">
            <rect x="128" y="248" width="10" height="50" rx="4" fill="#1a1d2e"/>
            <rect x="142" y="248" width="10" height="50" rx="4" fill="#1a1d2e"/>
            <path d="M118 245 Q122 200 138 195 Q154 200 158 245" fill="#e8614f"/>
            <circle cx="138" cy="170" r="22" fill="#8d5524"/>
            <ellipse cx="138" cy="156" rx="24" ry="18" fill="#111"/>
            <line x1="120" y1="215" x2="108" y2="235" stroke="#8d5524" strokeWidth="8" strokeLinecap="round"/>
            <rect x="98" y="228" width="18" height="22" rx="3" fill="#f0f0f0"/>
          </g>

          <g className="piece char-3">
            <rect x="218" y="320" width="60" height="8" rx="2" fill="#3a3f58"/>
            <rect x="220" y="285" width="60" height="38" rx="4" fill="#3a3f58"/>
            <circle cx="248" cy="250" r="22" fill="#f5c5a3"/>
            <ellipse cx="248" cy="237" rx="22" ry="14" fill="#c8a878"/>
            <path d="M228 310 Q230 278 248 272 Q266 278 268 310" fill="#f0f0f0"/>
            <polygon points="248,275 244,310 248,322 252,310" fill="#e8614f"/>
          </g>

          <g className="piece char-4">
            <rect x="352" y="320" width="12" height="55" rx="4" fill="#2d3142"/>
            <path d="M340 315 Q344 270 362 265 Q380 270 384 315" fill="#e8614f"/>
            <circle cx="362" cy="240" r="22" fill="#f5c5a3"/>
            <ellipse cx="362" cy="226" rx="22" ry="14" fill="#888"/>
            <line x1="380" y1="280" x2="406" y2="260" stroke="#f5c5a3" strokeWidth="8" strokeLinecap="round"/>
          </g>

          <g className="piece char-5">
            <rect x="488" y="260" width="55" height="70" rx="4" fill="#2d3142" opacity="0.5"/>
            <circle cx="516" cy="238" r="22" fill="#c68642"/>
            <ellipse cx="516" cy="222" rx="20" ry="14" fill="#5a3010"/>
            <path d="M496 310 Q498 272 516 266 Q534 272 536 310" fill="#f0f0f0"/>
          </g>

          {/* ========== SPEECH BUBBLES ========== */}
          <g className="piece bubble-like">
            <circle cx="638" cy="218" r="26" fill="#fff"/>
            <polygon points="638,244 626,252 650,250" fill="#fff"/>
            <path d="M630 226 Q630 218 636 216 L642 210 L644 216 Q648 216 648 220 L648 228 Q648 230 646 230 L632 230 Q630 230 630 226Z" fill="#e8614f"/>
          </g>
        </svg>
      </motion.div>
    </div>
  );
};
