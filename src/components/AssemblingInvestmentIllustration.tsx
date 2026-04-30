"use client";

import { motion } from "framer-motion";

export const AssemblingInvestmentIllustration = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="w-full h-full flex items-center justify-center"
    >
      <svg viewBox="0 0 680 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-[560px]">
        <defs>
          <style>{`
            .anim-float  { animation: float 3.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
            .anim-arrow  { animation: arrowPulse 1.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
            .anim-gear1  { animation: spin 9s linear infinite; transform-box: fill-box; transform-origin: center; }
            .anim-gear2  { animation: spin2 6.5s linear infinite; transform-box: fill-box; transform-origin: center; }
            .anim-coinL  { animation: float 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
            .anim-coinR  { animation: float 2.6s ease-in-out 0.9s infinite; transform-box: fill-box; transform-origin: center; }
            @keyframes float      { 0%,100%{transform:translateY(0)}    50%{transform:translateY(-7px)} }
            @keyframes arrowPulse { 0%,100%{transform:translate(0,0)}   50%{transform:translate(5px,-5px)} }
            @keyframes spin       { from{transform:rotate(0deg)}         to{transform:rotate(360deg)} }
            @keyframes spin2      { from{transform:rotate(0deg)}         to{transform:rotate(-360deg)} }
          `}</style>
          <linearGradient id="arrowGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#7840c8"/>
            <stop offset="100%" stopColor="#d0b0ff"/>
          </linearGradient>
        </defs>

        {/* ── PART 01: BASE PLATFORM ── */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ellipse cx="340" cy="490" rx="242" ry="72" fill="#1e1830" stroke="#2e2248" strokeWidth="1.5"/>
          <ellipse cx="340" cy="478" rx="242" ry="72" fill="#221c38" stroke="#7840c8" strokeWidth="1"/>
          <ellipse cx="340" cy="478" rx="242" ry="72" fill="none" stroke="#c4a0f0" strokeWidth="0.4" strokeDasharray="5 8" opacity="0.4"/>
          <line x1="108" y1="478" x2="572" y2="478" stroke="#3a2858" strokeWidth="0.5" opacity="0.5"/>
          <line x1="200" y1="430" x2="420" y2="520" stroke="#3a2858" strokeWidth="0.5" opacity="0.3"/>
          <line x1="420" y1="430" x2="200" y2="520" stroke="#3a2858" strokeWidth="0.5" opacity="0.2"/>
        </motion.g>

        {/* ── PART 07: MAGNIFYING GLASS ── */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <circle cx="172" cy="274" r="44" fill="none" stroke="#2e2c48" strokeWidth="9"/>
          <circle cx="172" cy="274" r="36" fill="rgba(155,93,229,0.04)" stroke="#4a4868" strokeWidth="1.5"/>
          <path d="M148,248 Q156,240 168,246" fill="none" stroke="rgba(200,180,255,0.35)" strokeWidth="3" strokeLinecap="round"/>
          <line x1="204" y1="306" x2="236" y2="340" stroke="#2e2c48" strokeWidth="11" strokeLinecap="round"/>
          <line x1="204" y1="306" x2="236" y2="340" stroke="#4a4868" strokeWidth="7" strokeLinecap="round"/>
        </motion.g>

        {/* ── PART 09a: CHART SCREEN PANEL ── */}
        <motion.g
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <rect x="224" y="112" width="120" height="90" rx="6" fill="#2a2048" stroke="#9b5de5" strokeWidth="1.5"/>
          <rect x="230" y="118" width="108" height="78" rx="3" fill="#1a1430"/>
          <polyline points="238,182 256,158 272,168 292,140 312,152 330,126" fill="none" stroke="#9b5de5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="238,182 256,158 272,168 292,140 312,152 330,126" fill="none" stroke="#c4a0f0" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
          <line x1="252" y1="202" x2="240" y2="220" stroke="#9b5de5" strokeWidth="1.5"/>
          <line x1="320" y1="202" x2="332" y2="220" stroke="#9b5de5" strokeWidth="1.5"/>
        </motion.g>

        {/* ── PART 09b: DOLLAR SPEECH BUBBLE ── */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
        >
          <rect x="148" y="110" width="58" height="46" rx="8" fill="#2a2048" stroke="#9b5de5" strokeWidth="1.5"/>
          <text x="177" y="140" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#c4a0f0" fontFamily="sans-serif">$</text>
          <polygon points="162,156 180,156 171,170" fill="#2a2048" stroke="#9b5de5" strokeWidth="1"/>
        </motion.g>

        {/* ── PART 08: SPINNING GEARS ── */}
        <motion.g 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <g className="anim-gear1">
            <circle cx="504" cy="148" r="28" fill="none" stroke="#c8c0e0" strokeWidth="11"/>
            <circle cx="504" cy="148" r="12" fill="#c8c0e0"/>
            <circle cx="504" cy="148" r="6" fill="#16121f"/>
            <rect x="500" y="112" width="8" height="12" rx="2" fill="#c8c0e0" transform="rotate(0,504,148)"/>
            <rect x="500" y="112" width="8" height="12" rx="2" fill="#c8c0e0" transform="rotate(45,504,148)"/>
            <rect x="500" y="112" width="8" height="12" rx="2" fill="#c8c0e0" transform="rotate(90,504,148)"/>
            <rect x="500" y="112" width="8" height="12" rx="2" fill="#c8c0e0" transform="rotate(135,504,148)"/>
            <rect x="500" y="112" width="8" height="12" rx="2" fill="#c8c0e0" transform="rotate(180,504,148)"/>
            <rect x="500" y="112" width="8" height="12" rx="2" fill="#c8c0e0" transform="rotate(225,504,148)"/>
            <rect x="500" y="112" width="8" height="12" rx="2" fill="#c8c0e0" transform="rotate(270,504,148)"/>
            <rect x="500" y="112" width="8" height="12" rx="2" fill="#c8c0e0" transform="rotate(315,504,148)"/>
          </g>
          <g className="anim-gear2">
            <circle cx="534" cy="178" r="20" fill="none" stroke="#a898c8" strokeWidth="8"/>
            <circle cx="534" cy="178" r="8" fill="#a898c8"/>
            <circle cx="534" cy="178" r="4" fill="#16121f"/>
            <rect x="531" y="152" width="6" height="9" rx="2" fill="#a898c8" transform="rotate(0,534,178)"/>
            <rect x="531" y="152" width="6" height="9" rx="2" fill="#a898c8" transform="rotate(60,534,178)"/>
            <rect x="531" y="152" width="6" height="9" rx="2" fill="#a898c8" transform="rotate(120,534,178)"/>
            <rect x="531" y="152" width="6" height="9" rx="2" fill="#a898c8" transform="rotate(180,534,178)"/>
            <rect x="531" y="152" width="6" height="9" rx="2" fill="#a898c8" transform="rotate(240,534,178)"/>
            <rect x="531" y="152" width="6" height="9" rx="2" fill="#a898c8" transform="rotate(300,534,178)"/>
          </g>
        </motion.g>

        {/* ── PART 04a: COIN STACK LEFT ── */}
        <motion.g 
          className="anim-coinL"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <ellipse cx="186" cy="466" rx="40" ry="14" fill="#5a18a0"/>
          <rect x="146" y="444" width="80" height="22" fill="#5a18a0" rx="2"/>
          <ellipse cx="186" cy="444" rx="40" ry="14" fill="#a060d8"/>
          <text x="186" y="449" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#f0d8ff" fontFamily="sans-serif">$</text>
          <ellipse cx="186" cy="430" rx="40" ry="14" fill="#5a18a0"/>
          <rect x="146" y="408" width="80" height="22" fill="#5a18a0" rx="2"/>
          <ellipse cx="186" cy="408" rx="40" ry="14" fill="#a060d8"/>
          <text x="186" y="413" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#f0d8ff" fontFamily="sans-serif">$</text>
          <ellipse cx="186" cy="394" rx="40" ry="14" fill="#5a18a0"/>
          <rect x="146" y="372" width="80" height="22" fill="#5a18a0" rx="2"/>
          <ellipse cx="186" cy="372" rx="40" ry="14" fill="#b070e8"/>
          <text x="186" y="377" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#f0d8ff" fontFamily="sans-serif">$</text>
          {/* small stack */}
          <ellipse cx="234" cy="490" rx="30" ry="10" fill="#4a1080"/>
          <rect x="204" y="472" width="60" height="18" fill="#4a1080" rx="2"/>
          <ellipse cx="234" cy="472" rx="30" ry="10" fill="#9040c8"/>
          <text x="234" y="476" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#f0d8ff" fontFamily="sans-serif">$</text>
          <ellipse cx="234" cy="460" rx="30" ry="10" fill="#4a1080"/>
          <rect x="204" y="442" width="60" height="18" fill="#4a1080" rx="2"/>
          <ellipse cx="234" cy="442" rx="30" ry="10" fill="#9040c8"/>
          <text x="234" y="446" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#f0d8ff" fontFamily="sans-serif">$</text>
        </motion.g>

        {/* ── PART 02: 3D BAR CHARTS ── */}
        <motion.g
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ transformOrigin: "bottom" }}
        >
          {/* Bar 1 (left, short) */}
          <polygon points="270,398 304,385 304,468 270,468" fill="#9b5de5"/>
          <polygon points="304,385 326,375 326,468 304,468" fill="#6628b0"/>
          <polygon points="270,398 304,385 326,375 292,388" fill="#d0b0ff"/>
          {/* Bar 2 (center, tallest) */}
          <polygon points="326,268 362,254 362,468 326,468" fill="#8840d8"/>
          <polygon points="362,254 388,243 388,468 362,468" fill="#6020b0"/>
          <polygon points="326,268 362,254 388,243 352,257" fill="#c090f8"/>
          {/* Bar 3 (right, medium) */}
          <polygon points="388,318 422,305 422,468 388,468" fill="#9b5de5"/>
          <polygon points="422,305 446,296 446,468 422,468" fill="#7030c0"/>
          <polygon points="388,318 422,305 446,296 414,309" fill="#d0b0ff"/>
        </motion.g>

        {/* ── PART 05: TREND ARROW ── */}
        <motion.g 
          className="anim-arrow"
          initial={{ opacity: 0, pathLength: 0 }}
          whileInView={{ opacity: 1, pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <line x1="264" y1="420" x2="450" y2="196" stroke="url(#arrowGrad)" strokeWidth="9" strokeLinecap="round"/>
          <polygon points="450,196 424,210 438,232" fill="#d0b0ff"/>
        </motion.g>

        {/* ── PART 04b: COIN STACK RIGHT ── */}
        <motion.g 
          className="anim-coinR"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <ellipse cx="488" cy="462" rx="32" ry="11" fill="#4a1080"/>
          <rect x="456" y="442" width="64" height="20" fill="#4a1080" rx="2"/>
          <ellipse cx="488" cy="442" rx="32" ry="11" fill="#9040c8"/>
          <text x="488" y="447" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#f0d8ff" fontFamily="sans-serif">$</text>
          <ellipse cx="488" cy="429" rx="32" ry="11" fill="#4a1080"/>
          <rect x="456" y="409" width="64" height="20" fill="#4a1080" rx="2"/>
          <ellipse cx="488" cy="409" rx="32" ry="11" fill="#9040c8"/>
          <text x="488" y="414" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#f0d8ff" fontFamily="sans-serif">$</text>
          <ellipse cx="488" cy="396" rx="32" ry="11" fill="#4a1080"/>
          <rect x="456" y="376" width="64" height="20" fill="#4a1080" rx="2"/>
          <ellipse cx="488" cy="376" rx="32" ry="11" fill="#a050d8"/>
          <text x="488" y="381" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#f0d8ff" fontFamily="sans-serif">$</text>
        </motion.g>

        {/* ── PART 06: PIE CHARTS ── */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          {/* Pie 1 */}
          <g transform="translate(318,518)">
            <ellipse cx="0" cy="8" rx="34" ry="11" fill="#2a1848"/>
            <path d="M0,0 L34,0 A34,11 0 0,1 -10,10.5 Z" fill="#c4a0f0"/>
            <path d="M0,0 L-10,10.5 A34,11 0 0,1 -34,0 Z" fill="#7840c8"/>
            <path d="M0,0 L-34,0 A34,11 0 0,1 10,-10.5 Z" fill="#3a1860"/>
            <path d="M0,0 L10,-10.5 A34,11 0 0,1 34,0 Z" fill="#9b5de5"/>
            <ellipse cx="0" cy="0" rx="34" ry="11" fill="none" stroke="#3a2060" strokeWidth="0.5"/>
          </g>
          {/* Pie 2 */}
          <g transform="translate(398,536)">
            <ellipse cx="0" cy="8" rx="28" ry="9" fill="#2a1848"/>
            <path d="M0,0 L28,0 A28,9 0 0,1 -8,8.7 Z" fill="#c4a0f0"/>
            <path d="M0,0 L-8,8.7 A28,9 0 0,1 -28,0 Z" fill="#7840c8"/>
            <path d="M0,0 L-28,0 A28,9 0 0,1 8,-8.7 Z" fill="#3a1860"/>
            <path d="M0,0 L8,-8.7 A28,9 0 0,1 28,0 Z" fill="#9b5de5"/>
            <ellipse cx="0" cy="0" rx="28" ry="9" fill="none" stroke="#3a2060" strokeWidth="0.5"/>
          </g>
        </motion.g>

        {/* ── PART 09c: PERCENT TAG ── */}
        <motion.g
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          <rect x="454" y="524" width="40" height="26" rx="6" fill="#2a2048" stroke="#9b5de5" strokeWidth="1.2"/>
          <text x="474" y="541" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#c4a0f0" fontFamily="sans-serif">%</text>
        </motion.g>

        {/* ── DECORATIVE LEAVES (right) ── */}
        <motion.g 
          transform="translate(510,374)" 
          opacity="0.65"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.65, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.8 }}
        >
          <path d="M0,0 Q22,-32 12,-64 Q-12,-44 0,0Z" fill="#c4a0f0"/>
          <path d="M0,0 Q32,-22 42,-54 Q10,-48 0,0Z" fill="#9060c8"/>
          <path d="M0,0 Q-22,-28 -18,-60 Q6,-46 0,0Z" fill="#d8c0f8"/>
          <path d="M0,0 Q-32,-12 -44,-40 Q-10,-38 0,0Z" fill="#7840b0"/>
        </motion.g>

        {/* ── PART 03: ANALYST PERSON (floating) ── */}
        <motion.g 
          className="anim-float"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 2, duration: 0.8, type: "spring" }}
        >
          {/* Laptop */}
          <rect x="322" y="324" width="66" height="40" rx="4" fill="#d8cef8" stroke="#9b5de5" strokeWidth="1.2"/>
          <rect x="327" y="329" width="56" height="30" rx="2" fill="#f8f4ff"/>
          <line x1="334" y1="337" x2="377" y2="337" stroke="#c090f0" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="334" y1="343" x2="370" y2="343" stroke="#c090f0" strokeWidth="1" strokeLinecap="round"/>
          <line x1="334" y1="349" x2="374" y2="349" stroke="#c090f0" strokeWidth="1" strokeLinecap="round"/>
          <rect x="314" y="362" width="82" height="7" rx="3" fill="#b0a0d8"/>
          {/* Body */}
          <rect x="334" y="274" width="42" height="54" rx="10" fill="#f5f5f5" stroke="#e0e0e0" strokeWidth="0.5"/>
          <polygon points="352,278 347,300 354,307 360,300" fill="#9b5de5"/>
          <polygon points="350,276 360,276 358,280 352,280" fill="#7830c0"/>
          {/* Arms */}
          <path d="M334,290 Q316,302 322,326" stroke="#f5f5f5" strokeWidth="12" fill="none" strokeLinecap="round"/>
          <circle cx="322" cy="326" r="6" fill="#fce0c8"/>
          <path d="M376,290 Q394,302 388,326" stroke="#f5f5f5" strokeWidth="12" fill="none" strokeLinecap="round"/>
          <circle cx="388" cy="326" r="6" fill="#fce0c8"/>
          {/* Legs */}
          <rect x="335" y="322" width="18" height="42" rx="7" fill="#3d3d5c"/>
          <rect x="358" y="322" width="18" height="42" rx="7" fill="#3d3d5c"/>
          <ellipse cx="344" cy="364" rx="12" ry="5" fill="#1a1a2e"/>
          <ellipse cx="367" cy="364" rx="12" ry="5" fill="#1a1a2e"/>
          {/* Neck */}
          <rect x="346" y="262" width="16" height="16" rx="5" fill="#fce0c8"/>
          {/* Head */}
          <ellipse cx="354" cy="252" rx="22" ry="24" fill="#fce0c8"/>
          {/* Hair */}
          <path d="M332,244 Q333,224 354,222 Q375,224 376,244 Q370,230 354,228 Q338,230 332,244Z" fill="#2a1a0a"/>
          {/* Eyes */}
          <ellipse cx="346" cy="250" rx="3.5" ry="4" fill="#2a1a0a"/>
          <ellipse cx="362" cy="250" rx="3.5" ry="4" fill="#2a1a0a"/>
          <circle cx="347" cy="249" r="1.2" fill="white"/>
          <circle cx="363" cy="249" r="1.2" fill="white"/>
          {/* Smile */}
          <path d="M347,259 Q354,265 361,259" fill="none" stroke="#c07050" strokeWidth="1.5" strokeLinecap="round"/>
          {/* Ears */}
          <ellipse cx="332" cy="253" rx="4" ry="6" fill="#f8c8a8"/>
          <ellipse cx="376" cy="253" rx="4" ry="6" fill="#f8c8a8"/>
        </motion.g>
      </svg>
    </motion.div>
  );
};
