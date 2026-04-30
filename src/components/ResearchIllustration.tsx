"use client";

import React from "react";
import { motion } from "motion/react";

export function ResearchIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        onViewportEnter={(entry) => {
          entry?.target.parentElement?.querySelector('svg')?.classList.add("is-visible");
        }}
        className="absolute inset-0 pointer-events-none"
      />
      <svg width="100%" viewBox="0 0 680 580" role="img" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-full relative z-10 drop-shadow-2xl">
        <title>Two professionals reviewing analytics dashboards</title>
        <desc>Animated illustration of two people standing in front of large analytics screens with charts, graphs and donut charts. Each element assembles smoothly into the scene.</desc>
        <defs>
          <style>
            {`
              .blob{fill:#c8f0d8}
              .screen{fill:#fff;stroke:#2a3d2e;stroke-width:2}
              .scr-bar{fill:#2c3e30}
              .green1{fill:#4cba78}
              .green2{fill:#c8f0d8}
              .dark1{fill:#1e2a22}
              .dark2{fill:#243028}
              .skin{fill:#e8c89a}
              .shirt{fill:#4cba78}
              .pants{fill:#1e2a22}
              .hair{fill:#2a3020}
              .plant-stem{stroke:#2a3d2e;stroke-width:2;fill:none}
              .plant-leaf{fill:#2a3d2e}
              .pot{fill:#243028}
              .wire{stroke:#8ab09a;stroke-width:1;fill:none;stroke-dasharray:4,3}
              .chart-line{fill:none;stroke:#2a3d2e;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
              .chart-dot{fill:#4cba78;stroke:#2a3d2e;stroke-width:1.5}
              .donut-bg{fill:none;stroke:#c8f0d8;stroke-width:8}
              .donut-fg{fill:none;stroke:#2a3d2e;stroke-width:8;stroke-linecap:round}
              .bar-g{fill:#4cba78}
              .bar-d{fill:#2a3d2e}
              .callout-line{stroke:#8ab09a;stroke-width:1;fill:none}
              .hbar{fill:#d0ead8;stroke:none}
              .shadow-feet{fill:#c8f0d8;opacity:.5}

              .fade-in{opacity:0;}
              .is-visible .fade-in{animation:fadeIn .5s ease forwards}
              .slide-up{opacity:0;}
              .is-visible .slide-up{animation:slideUp .6s ease forwards}
              .slide-right{opacity:0;}
              .is-visible .slide-right{animation:slideRight .6s ease forwards}
              .slide-left{opacity:0;}
              .is-visible .slide-left{animation:slideLeft .6s ease forwards}
              .scale-in{opacity:0;}
              .is-visible .scale-in{animation:scaleIn .5s ease forwards}
              .is-visible .draw-line{stroke-dashoffset:300;animation:drawLine 1s ease forwards}

              @keyframes fadeIn{to{opacity:1}}
              @keyframes slideUp{from{transform:translateY(24px);opacity:0}to{transform:translateY(0);opacity:1}}
              @keyframes slideRight{from{transform:translateX(-24px);opacity:0}to{transform:translateX(0);opacity:1}}
              @keyframes slideLeft{from{transform:translateX(24px);opacity:0}to{transform:translateX(0);opacity:1}}
              @keyframes scaleIn{from{transform:scale(.7);opacity:0}to{transform:scale(1);opacity:1}}
              @keyframes drawLine{to{stroke-dashoffset:0}}
            `}
          </style>
        </defs>

        {/* Background blob */}
        <ellipse className="blob fade-in" cx="320" cy="310" rx="240" ry="260" style={{ animationDelay: ".05s" }} />

        {/* MAIN LEFT SCREEN */}
        <g className="slide-up" style={{ animationDelay: ".1s" }}>
          <rect className="screen" x="110" y="82" width="320" height="240" rx="6" />
          <rect className="scr-bar" x="110" y="82" width="320" height="28" rx="6" />
          <rect className="scr-bar" x="110" y="96" width="320" height="14" />
          <rect fill="#8ab09a" x="124" y="91" width="18" height="2" rx="1" />
          <rect fill="#8ab09a" x="124" y="96" width="18" height="2" rx="1" />
          <rect fill="#8ab09a" x="124" y="101" width="18" height="2" rx="1" />
          <line stroke="#d0e8d8" strokeWidth="1" strokeDasharray="4,3" x1="150" y1="150" x2="400" y2="150" />
        </g>

        {/* Line chart */}
        <g className="slide-up" style={{ animationDelay: ".25s" }}>
          <polyline className="chart-line draw-line" strokeDasharray="300" points="148,195 175,180 205,170 235,162 265,172 300,158 335,148 375,138" style={{ animationDelay: ".35s" }} />
          <circle className="chart-dot" cx={148} cy={195} r={4} />
          <circle className="chart-dot" cx={175} cy={180} r={4} />
          <circle className="chart-dot" cx={205} cy={170} r={4} />
          <circle className="chart-dot" cx={235} cy={162} r={4} />
          <circle className="chart-dot scale-in" cx={265} cy={172} r={4} style={{ animationDelay: ".6s" }} />
          <circle className="chart-dot scale-in" cx={300} cy={158} r={4} style={{ animationDelay: ".65s" }} />
          <circle className="chart-dot scale-in" cx={335} cy={148} r={4} style={{ animationDelay: ".7s" }} />
          <circle className="chart-dot scale-in" cx={375} cy={138} r={4} style={{ animationDelay: ".75s" }} />
        </g>

        {/* Donut charts row */}
        <g className="slide-up" style={{ animationDelay: ".45s" }}>
          <circle className="donut-bg" cx={165} cy={265} r={22} />
          <circle className="donut-fg" cx={165} cy={265} r={22} strokeDasharray="90 48" strokeDashoffset="0" style={{ transformOrigin: "165px 265px", transform: "rotate(-90deg)" }} />
          <circle className="donut-bg" cx={248} cy={265} r={22} />
          <circle className="donut-fg" cx={248} cy={265} r={22} strokeDasharray="70 68" strokeDashoffset="0" style={{ transformOrigin: "248px 265px", transform: "rotate(-90deg)" }} />
          <circle className="donut-bg" cx={330} cy={265} r={22} />
          <circle className="donut-fg" cx={330} cy={265} r={22} strokeDasharray="55 83" strokeDashoffset="0" style={{ transformOrigin: "330px 265px", transform: "rotate(-90deg)" }} />
        </g>

        {/* SMALL RIGHT SCREEN */}
        <g className="slide-left" style={{ animationDelay: ".2s" }}>
          <rect className="screen" x="450" y="210" width="210" height="155" rx="6" />
          <rect className="scr-bar" x="450" y="210" width="210" height="22" rx="6" />
          <rect className="scr-bar" x="450" y="220" width="210" height="12" />
        </g>

        {/* Small screen donut */}
        <g className="scale-in" style={{ animationDelay: ".55s" }}>
          <circle className="donut-bg" cx={490} cy={302} r={18} />
          <circle className="donut-fg" cx={490} cy={302} r={18} strokeDasharray="65 48" strokeDashoffset="0" style={{ transformOrigin: "490px 302px", transform: "rotate(-90deg)" }} />
        </g>

        {/* Bar chart on small screen */}
        <g className="slide-up" style={{ animationDelay: ".5s" }}>
          <rect className="bar-g" x="520" y="295" width="12" height="60" />
          <rect className="bar-d" x="535" y="318" width="12" height="37" />
          <rect className="bar-g" x="550" y="308" width="12" height="47" />
          <rect className="bar-d" x="565" y="278" width="12" height="77" />
          <rect className="bar-g" x="580" y="290" width="12" height="65" />
          <rect className="bar-d" x="595" y="303" width="12" height="52" />
          <line stroke="#8ab09a" strokeWidth="1" x1="516" y1="355" x2="612" y2="355" />
        </g>

        {/* Callout lines */}
        <g className="fade-in" style={{ animationDelay: ".7s" }}>
          <line className="callout-line" x1="430" y1="155" x2="480" y2="155" />
          <rect className="hbar" x="480" y="150" width="55" height="8" rx="2" />
          <rect className="hbar" x="480" y="162" width="40" height="8" rx="2" />
          <line className="callout-line" x1="430" y1="228" x2="480" y2="228" />
          <rect className="hbar" x="480" y="223" width="55" height="8" rx="2" />
          <rect className="hbar" x="480" y="235" width="40" height="8" rx="2" />
          <line className="callout-line" x1="114" y1="250" x2="64" y2="250" />
          <rect className="hbar" x="18" y="245" width="46" height="8" rx="2" />
          <rect className="hbar" x="18" y="257" width="36" height="8" rx="2" />
        </g>

        {/* PLANT */}
        <g className="slide-up" style={{ animationDelay: ".15s" }}>
          <rect className="pot" x="188" y="470" width="38" height="46" rx="3" />
          <rect fill="#1a2418" x="184" y="467" width="46" height="8" rx="3" />
          <path className="plant-stem" d="M207,467 Q195,440 178,418" />
          <path className="plant-stem" d="M207,467 Q215,435 204,410" />
          <path className="plant-stem" d="M207,467 Q225,448 240,428" />
          <ellipse className="plant-leaf" cx="174" cy="414" rx="11" ry="7" transform="rotate(-35,174,414)" />
          <ellipse className="plant-leaf" cx="200" cy="406" rx="11" ry="7" transform="rotate(-10,200,406)" />
          <ellipse className="plant-leaf" cx="244" cy="425" rx="11" ry="7" transform="rotate(25,244,425)" />
          <ellipse className="plant-leaf" cx="180" cy="430" rx="9" ry="6" transform="rotate(-50,180,430)" />
          <ellipse className="plant-leaf" cx="220" cy="438" rx="9" ry="6" transform="rotate(15,220,438)" />
        </g>

        {/* PERSON 1 (left) */}
        <g className="slide-up" style={{ animationDelay: ".3s" }}>
          <ellipse className="shadow-feet" cx="310" cy="530" rx="32" ry="8" />
          <rect className="pants" x="296" y="430" width="18" height="90" rx="4" />
          <rect className="pants" x="318" y="430" width="18" height="90" rx="4" />
          <ellipse className="dark1" cx="305" cy="520" rx="14" ry="6" />
          <ellipse className="dark1" cx="327" cy="520" rx="14" ry="6" />
          <rect className="shirt" x="282" y="340" width="68" height="96" rx="10" />
          <rect className="skin" x="312" y="320" width="18" height="26" rx="4" />
          <ellipse className="skin" cx="321" cy="306" rx="24" ry="28" />
          <ellipse className="hair" cx="321" cy="287" rx="24" ry="14" />
          <path className="shirt" d="M282,360 Q260,390 262,420" stroke="#3aaa65" strokeWidth="2" fill="none" />
          <ellipse className="skin" cx="263" cy="423" rx="8" ry="8" />
          <path className="shirt" d="M350,360 Q368,375 362,395" stroke="#3aaa65" strokeWidth="2" fill="none" />
          <ellipse className="skin" cx="360" cy="398" rx="8" ry="8" />
        </g>

        {/* PERSON 2 (right) */}
        <g className="slide-up" style={{ animationDelay: ".35s" }}>
          <ellipse className="shadow-feet" cx="420" cy="530" rx="32" ry="8" />
          <rect className="pants" x="404" y="430" width="18" height="90" rx="4" />
          <rect className="pants" x="426" y="430" width="18" height="90" rx="4" />
          <ellipse className="dark1" cx="413" cy="520" rx="14" ry="6" />
          <ellipse className="dark1" cx="435" cy="520" rx="14" ry="6" />
          <rect className="shirt" x="392" y="340" width="68" height="96" rx="10" />
          <rect className="skin" x="420" y="320" width="18" height="26" rx="4" />
          <ellipse className="skin" cx="429" cy="306" rx="24" ry="28" />
          <ellipse fill="#9aaa88" cx="429" cy="287" rx="24" ry="14" />
          <path className="shirt" d="M392,360 Q370,390 374,420" stroke="#3aaa65" strokeWidth="2" fill="none" />
          <ellipse className="skin" cx="375" cy="423" rx="8" ry="8" />
          <rect fill="#1e2a22" x="366" y="416" width="18" height="24" rx="2" />
          <path className="shirt" d="M460,360 Q490,330 482,308" stroke="#3aaa65" strokeWidth="2" fill="none" />
          <ellipse className="skin" cx="480" cy="305" rx="8" ry="8" />
        </g>

        {/* Belt lines */}
        <g className="fade-in" style={{ animationDelay: ".4s" }}>
          <line stroke="#152018" strokeWidth="2" x1={283} y1={428} x2={348} y2={428} />
          <line stroke="#152018" strokeWidth="2" x1={393} y1={428} x2={458} y2={428} />
        </g>

        {/* Collar details */}
        <g className="fade-in" style={{ animationDelay: ".42s" }}>
          <path fill="none" stroke="#3aaa65" strokeWidth="1.5" d="M308,342 L316,358 L324,342" />
          <path fill="none" stroke="#3aaa65" strokeWidth="1.5" d="M418,342 L426,358 L434,342" />
        </g>
      </svg>
    </div>
  );
}
