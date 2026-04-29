"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Cormorant_Garamond, DM_Mono } from "next/font/google";
import { Plus, Minus, ArrowRight, User, Calendar, Tag, Briefcase, MapPin, Users, FileText } from "lucide-react";

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"]
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"]
});

const MAIN_BALLS = [
  { id: "calls", label: "Calls", size: 300, left: "2%", top: 220, delay: 0, duration: 8, yRange: [0, -30, -10, -40, 0], xRange: [0, 10, -5, 5, 0], rx: [0, 2, -1, 3, 0], ry: [0, -3, 2, -2, 0], parallax: 0.02 },
  { id: "sit-ins", label: "Sit-Ins", size: 220, left: "25%", top: 120, delay: 1.5, duration: 10, yRange: [0, -25, -15, -35, 0], xRange: [0, -8, 5, -3, 0], rx: [0, -1, 2, -1, 0], ry: [0, 2, -1, 3, 0], parallax: 0.035 },
  { id: "tours", label: "Tours", size: 260, left: "48%", top: 230, delay: 2.2, duration: 9, yRange: [0, -25, -5, -35, 0], xRange: [0, -5, 8, -4, 0], rx: [0, -2, 1, -3, 0], ry: [0, 3, -1, 2, 0], parallax: 0.028 },
  { id: "paxpanel", label: "PaxPanel", size: 310, left: "62%", top: 60, delay: 0.8, duration: 12, yRange: [0, -40, -20, -50, 0], xRange: [0, 8, -10, 5, 0], rx: [0, 3, -2, 2, 0], ry: [0, -2, 3, -1, 0], parallax: 0.015 },
];

const TINY_BALLS = [
  { id: "tb1", size: 25, left: "10%", top: 80, delay: 0.2, duration: 12, yRange: [0, -30, 10, -20, 15, 0], xRange: [0, 20, -10, 25, -15, 0], rx: [0,0,0,0,0,0], ry: [0,0,0,0,0,0], parallax: 0.05 },
  { id: "tb2", size: 15, left: "25%", top: 150, delay: 1.5, duration: 15, yRange: [0, 25, -15, 30, -10, 0], xRange: [0, -20, 15, -25, 10, 0], rx: [0,0,0,0,0,0], ry: [0,0,0,0,0,0], parallax: 0.03 },
  { id: "tb3", size: 30, left: "40%", top: 50, delay: 0.8, duration: 14, yRange: [0, -40, 20, -30, 10, 0], xRange: [0, 30, -20, 15, -10, 0], rx: [0,0,0,0,0,0], ry: [0,0,0,0,0,0], parallax: 0.06 },
  { id: "tb4", size: 18, left: "60%", top: 120, delay: 2.1, duration: 11, yRange: [0, 20, -30, 15, -25, 0], xRange: [0, -15, 25, -10, 20, 0], rx: [0,0,0,0,0,0], ry: [0,0,0,0,0,0], parallax: 0.04 },
  { id: "tb5", size: 22, left: "80%", top: 70, delay: 0.5, duration: 16, yRange: [0, -25, 15, -35, 20, 0], xRange: [0, 25, -15, 30, -20, 0], rx: [0,0,0,0,0,0], ry: [0,0,0,0,0,0], parallax: 0.07 },
  { id: "tb6", size: 12, left: "90%", top: 200, delay: 3.0, duration: 13, yRange: [0, 35, -20, 25, -15, 0], xRange: [0, -30, 20, -25, 15, 0], rx: [0,0,0,0,0,0], ry: [0,0,0,0,0,0], parallax: 0.02 },
  { id: "tb7", size: 28, left: "5%", top: 300, delay: 1.1, duration: 17, yRange: [0, -20, 30, -10, 25, 0], xRange: [0, 15, -25, 20, -30, 0], rx: [0,0,0,0,0,0], ry: [0,0,0,0,0,0], parallax: 0.05 },
  { id: "tb8", size: 16, left: "30%", top: 350, delay: 2.5, duration: 10, yRange: [0, 30, -25, 15, -20, 0], xRange: [0, -25, 15, -30, 10, 0], rx: [0,0,0,0,0,0], ry: [0,0,0,0,0,0], parallax: 0.03 },
  { id: "tb9", size: 20, left: "50%", top: 280, delay: 0.3, duration: 14, yRange: [0, -35, 15, -25, 20, 0], xRange: [0, 20, -35, 10, -15, 0], rx: [0,0,0,0,0,0], ry: [0,0,0,0,0,0], parallax: 0.04 },
  { id: "tb10", size: 24, left: "70%", top: 320, delay: 1.8, duration: 15, yRange: [0, 25, -15, 30, -10, 0], xRange: [0, -15, 30, -20, 25, 0], rx: [0,0,0,0,0,0], ry: [0,0,0,0,0,0], parallax: 0.06 },
  { id: "tb11", size: 14, left: "85%", top: 380, delay: 2.8, duration: 12, yRange: [0, -20, 25, -15, 30, 0], xRange: [0, 30, -15, 25, -20, 0], rx: [0,0,0,0,0,0], ry: [0,0,0,0,0,0], parallax: 0.02 },
  { id: "tb12", size: 19, left: "15%", top: 220, delay: 0.7, duration: 16, yRange: [0, 35, -10, 20, -25, 0], xRange: [0, -20, 25, -15, 30, 0], rx: [0,0,0,0,0,0], ry: [0,0,0,0,0,0], parallax: 0.05 },
  { id: "tb13", size: 26, left: "45%", top: 180, delay: 1.4, duration: 11, yRange: [0, -15, 30, -20, 15, 0], xRange: [0, 15, -30, 20, -25, 0], rx: [0,0,0,0,0,0], ry: [0,0,0,0,0,0], parallax: 0.04 },
  { id: "tb14", size: 10, left: "65%", top: 250, delay: 2.2, duration: 18, yRange: [0, 20, -35, 10, -30, 0], xRange: [0, -35, 10, -25, 15, 0], rx: [0,0,0,0,0,0], ry: [0,0,0,0,0,0], parallax: 0.03 },
  { id: "tb15", size: 21, left: "95%", top: 100, delay: 0.9, duration: 13, yRange: [0, -25, 20, -15, 35, 0], xRange: [0, 25, -20, 30, -10, 0], rx: [0,0,0,0,0,0], ry: [0,0,0,0,0,0], parallax: 0.06 },
];

const ballGradient = `
  radial-gradient(circle at 25% 25%, #ffffff 0%, rgba(255,255,255,0) 40%),
  radial-gradient(circle at 10% 80%, #ff8c42 0%, rgba(255,140,66,0) 60%),
  radial-gradient(circle at 90% 50%, #e1dced 0%, rgba(225,220,237,0) 60%),
  radial-gradient(circle at 50% 50%, #fef5e7 0%, #f3d8c1 60%, #d6ad96 100%)
`;

const ballShadow = `
  inset -10px -10px 20px rgba(180, 160, 180, 0.4),
  inset 10px 10px 20px rgba(255, 255, 255, 0.9),
  15px 25px 40px rgba(160, 100, 60, 0.25),
  -10px 15px 30px rgba(255, 120, 50, 0.15)
`;

function HeroBall({ ball, mouseX, mouseY }: { ball: any, mouseX: any, mouseY: any }) {
  const isMain = !!ball.label;
  
  const springConfig = { damping: 20, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  
  const xOffset = useTransform(smoothX, [-500, 500], [ball.parallax * 500, -ball.parallax * 500]);
  const yOffset = useTransform(smoothY, [-500, 500], [ball.parallax * 500, -ball.parallax * 500]);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: ball.left,
        top: ball.top,
        width: ball.size,
        height: ball.size,
        x: xOffset,
        y: yOffset,
        zIndex: isMain ? 10 : 0,
      }}
      animate={{
        y: ball.yRange,
        x: ball.xRange,
        rotateX: ball.rx,
        rotateY: ball.ry,
      }}
      transition={{
        duration: ball.duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
        delay: ball.delay,
      }}
      className="group"
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: ballGradient,
          boxShadow: ballShadow,
          opacity: isMain ? 1 : 0.4,
          cursor: isMain ? "pointer" : "default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          filter: "drop-shadow(0 0 0px rgba(251,139,71,0))",
        }}
        whileHover={{
          scale: 1.15,
          filter: "drop-shadow(0 0 40px rgba(251,139,71,0.9))",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onClick={() => {
          if (isMain) {
            const el = document.getElementById(ball.id);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        {isMain && (
          <span 
            className={`${cormorant.className} italic transition-colors duration-300 group-hover:text-[#c45a1f]`}
            style={{
              fontSize: ball.size * 0.18,
              color: "rgba(80, 45, 15, 0.75)",
              textShadow: "1px 1px 2px rgba(255,255,255,0.4), -1px -1px 2px rgba(0,0,0,0.15)",
              letterSpacing: "0.05em",
            }}
          >
            {ball.label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}

function AccordionRow({ title, children }: { title: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[rgba(0,0,0,0.08)]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 px-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
      >
        <span className={`${cormorant.className} text-[#111827] text-xl font-light`}>{title}</span>
        {isOpen ? <Minus className="w-5 h-5 text-[#ec9324]" /> : <Plus className="w-5 h-5 text-[#ec9324]" />}
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className={`p-4 pt-0 ${dmMono.className} text-[0.85rem] text-[#4B5563] leading-relaxed`}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export default function EngagementMode() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left - width / 2;
    const y = clientY - top - height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const headingWords = "How would you like to engage?".split(" ");

  return (
    <div className="bg-[#ffffff] text-[#111827] min-h-screen">
      
      {/* ─── SECTION 1: HERO ─── */}
      <section 
        className="relative min-h-[90vh] flex flex-col justify-center items-center pt-24 pb-12 overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `
            radial-gradient(circle at 10% 90%, #fb8b47 0%, transparent 60%),
            radial-gradient(circle at 90% 10%, #f5e4cd 0%, transparent 60%),
            linear-gradient(135deg, #e6a77d 0%, #d3c2c5 100%)
          `
        }} />

        <div className="relative z-10 flex flex-col items-center w-full max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center mb-8">
            <span className={`${dmMono.className} text-[#ec9324] text-2xl font-medium tracking-[0.25em] uppercase`}>
              MODES OF ENGAGEMENT
            </span>
            <div className="w-24 h-px bg-[#ec9324] mt-4" />
          </div>

          <h1 className="flex flex-wrap justify-center gap-x-3 gap-y-2 mb-6">
            {headingWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: "easeOut" }}
                className={`${cormorant.className} text-[6rem] font-light leading-[1.1] text-[#111827]`}
              >
                {word}
              </motion.span>
            ))}
          </h1>


          <div className="relative w-full h-[420px] max-w-[1000px] mx-auto perspective-1000">
            {TINY_BALLS.map((ball) => (
              <HeroBall key={ball.id} ball={ball} mouseX={mouseX} mouseY={mouseY} />
            ))}
            {MAIN_BALLS.map((ball) => (
              <HeroBall key={ball.id} ball={ball} mouseX={mouseX} mouseY={mouseY} />
            ))}
          </div>

          <motion.div 
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-4 flex flex-col items-center gap-2"
          >
            <span className={`${dmMono.className} text-[#ec9324] text-[0.65rem] tracking-widest`}>scroll to explore</span>
            <span className="text-[#ec9324]">↓</span>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 2: CALLS ─── */}
      <section id="calls" className="bg-[#fafafa] py-[120px] px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className={`${dmMono.className} text-[#ec9324] text-[0.65rem] tracking-[0.2em] uppercase mb-6 block`}>
              01 — CALLS
            </span>
            <h2 className={`${cormorant.className} text-[6rem] font-light text-[#111827] mb-6 leading-[1.1]`}>
              Telephonic Expert Consultations
            </h2>
            <p className={`${dmMono.className} text-[1.25rem] text-[#4B5563] leading-[1.6] mb-10 max-w-lg`}>
              Expert calls on pre-decided agendas are the cheapest and fastest way to get insights. Connect instantly with carefully vetted subject matter experts.
            </p>
            <a href="#" className={`${dmMono.className} text-[#ec9324] text-[1rem] hover:underline flex items-center gap-2 w-fit`}>
              Learn More <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="bg-[#ffffff] border border-[rgba(0,0,0,0.08)] rounded-2xl p-8"
          >
            <div className="flex justify-center mb-8 h-40">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#ec9324] opacity-80" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="30" cy="40" r="15" />
                <path d="M 10 90 Q 30 60 50 90" />
                <circle cx="70" cy="40" r="15" />
                <path d="M 50 90 Q 70 60 90 90" />
                <circle cx="50" cy="20" r="2" fill="currentColor" />
                <circle cx="40" cy="25" r="2" fill="currentColor" />
                <circle cx="60" cy="25" r="2" fill="currentColor" />
              </svg>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {["Pre-set Agenda", "1-on-1 Format", "Face-to-Face Option"].map((chip) => (
                <span key={chip} className={`${dmMono.className} text-[0.7rem] bg-[rgba(236,147,36,0.12)] border border-[#ec9324]/30 text-[#ec9324] px-3 py-1.5 rounded`}>
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 3: SIT-INS ─── */}
      <section id="sit-ins" className="bg-[#ffffff] py-[120px] px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="order-2 md:order-1 bg-[#ffffff] border border-[rgba(0,0,0,0.08)] rounded-2xl p-6"
          >
            <AccordionRow title="Why should I organise a Sit-In?">
              Attending conferences is generic. Sit-Ins provide an innovative way to gain knowledge on a topic with surgical precision, addressing queries instantly.
            </AccordionRow>
            <AccordionRow title="How do Sit-Ins work?">
              Send us a topic, tentative number of attendees, a convenient date and location. We will get back to you with relevant experts and pricing.
            </AccordionRow>
            <AccordionRow title="What is the pricing?">
              It starts as low as $500 for an expert with a mid-management background for a one-hour session.
            </AccordionRow>
            <AccordionRow title="What formats can I choose from?">
              1-hour or 2-hour sessions on pre-declared dates, or 4 and 8-hour sessions on mutually convenient dates.
            </AccordionRow>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="order-1 md:order-2"
          >
            <span className={`${dmMono.className} text-[#ec9324] text-[0.65rem] tracking-[0.2em] uppercase mb-6 block`}>
              02 — SIT-INS
            </span>
            <h2 className={`${cormorant.className} text-[6rem] font-light text-[#111827] mb-6 leading-[1.1]`}>
              Private Expert-Led Conferences
            </h2>
            <p className={`${dmMono.className} text-[1.25rem] text-[#4B5563] leading-[1.6] mb-10 max-w-lg`}>
              Sit-Ins are private masterclasses or workshops on a topic of your choice, by an expert of your choice, at a time and location of your choice.
            </p>
            <div className="flex gap-2">
              {['#f0d0b0', '#ec9324', '#ffbf00', '#ff7f50', '#9dc183'].map((color, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#ffffff] shadow-lg -ml-2 first:ml-0 relative z-10" style={{ backgroundColor: color, opacity: 0.9 }} />
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* ─── SECTION 4: PAXPANEL ─── */}
      <section id="paxpanel" className="bg-[#fafafa] py-[120px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <span className={`${dmMono.className} text-[#ec9324] text-[0.65rem] tracking-[0.2em] uppercase mb-6 block`}>
              03 — PAXPANEL
            </span>
            <h2 className={`${cormorant.className} text-[6rem] font-light text-[#111827] mb-6 leading-[1.1]`}>
              On-Demand Expert Access
            </h2>
            <p className={`${dmMono.className} text-[1.25rem] text-[#4B5563] max-w-2xl mx-auto leading-[1.6]`}>
              The purest manifestation of the on-demand economy. Use the best in industry when you need them, the way you need them.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Why PaxPanel?", icon: <User className="w-6 h-6"/>, body: "Complement your in-house resources. Utilise the services of ex-CMOs and top professionals without hiring them full-time." },
              { title: "Engagement Model", icon: <Calendar className="w-6 h-6"/>, body: "Buy a fixed number of hours, statement of work employees, or short-term project specialists." },
              { title: "Pricing Model", icon: <Tag className="w-6 h-6"/>, body: "Pay only for what you use. We take care of payments to experts with transparent and efficient pricing." }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.1 }}
                whileHover={{ translateY: -6 }}
                className="group bg-[#ffffff] border border-[rgba(0,0,0,0.08)] hover:border-[rgba(236,147,36,0.3)] rounded-xl p-7 transition-colors duration-300 shadow-sm hover:shadow-[0_10px_40px_-10px_rgba(236,147,36,0.15)]"
              >
                <div className="text-[#ec9324] mb-5">{card.icon}</div>
                <h3 className={`${cormorant.className} text-2xl font-light text-[#111827] mb-3`}>{card.title}</h3>
                <p className={`${dmMono.className} text-[0.85rem] text-[#4B5563] leading-relaxed`}>{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: TOURS ─── */}
      <section id="tours" className="bg-[#ffffff] py-[120px] px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="bg-[#ffffff] border border-[rgba(0,0,0,0.08)] rounded-xl p-8 relative h-[280px] mb-6">
              <div className="absolute left-[39px] top-10 bottom-10 w-px border-l-2 border-dashed border-[#ec9324] opacity-50" />
              {["Pre-Trip Briefing", "Site Visits", "Expert Interactions", "Debrief"].map((stop, i) => (
                <div key={i} className="relative flex items-center mb-10 last:mb-0">
                  <div className="w-[10px] h-[10px] rounded-full bg-[#ec9324] z-10 ml-2 ring-[6px] ring-[#ffffff]" />
                  <span className={`${dmMono.className} text-[#111827] text-sm ml-6`}>{stop}</span>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[<Briefcase key="1"/>, <MapPin key="2"/>, <Users key="3"/>, <FileText key="4"/>].map((icon, i) => (
                <div key={i} className="bg-[#ffffff] border border-[rgba(0,0,0,0.08)] rounded-xl p-5 flex items-center justify-center text-[#ec9324]">
                  {icon}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            <span className={`${dmMono.className} text-[#ec9324] text-[0.65rem] tracking-[0.2em] uppercase mb-6 block`}>
              04 — KNOWLEDGE TOURS
            </span>
            <h2 className={`${cormorant.className} text-[6rem] font-light text-[#111827] mb-6 leading-[1.1]`}>
              Private Research Trips
            </h2>
            <p className={`${dmMono.className} text-[1.25rem] text-[#4B5563] leading-[1.6] mb-10`}>
              Infollion Knowledge Tours are private research trips with a dash of leisure — curated for fund managers, investors and top-management executives to gauge the pulse of business and consumer sentiments.
            </p>
            
            <div className="bg-[#ffffff] border border-[rgba(0,0,0,0.08)] rounded-2xl p-6">
              <AccordionRow title="Why should I go on an IKT?">
                Take a deep dive into the hinterlands, both literally and figuratively, to firm up your opinion on potential investment decisions.
              </AccordionRow>
              <AccordionRow title="How do IKTs work?">
                Send us the domain. We will get back with a list of experts, channel partners, and a full itinerary including travel and stay arrangements.
              </AccordionRow>
              <AccordionRow title="What are the possible inclusions?">
                Sales channel meetings, consumer focus groups, masterclasses, and face-to-face promoter checks.
              </AccordionRow>
              <AccordionRow title="What formats can I choose from?">
                Private or group tours. Pure business or business-cum-leisure formats available.
              </AccordionRow>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ─── FOOTER STRIP ─── */}
      <footer className="bg-[#ffffff] border-t border-[rgba(0,0,0,0.08)] py-16 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className={`${cormorant.className} text-[2.5rem] font-light text-[#111827] mb-8`}>Get in Touch</h2>
          <form className="flex flex-wrap md:flex-nowrap gap-4 justify-center" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Name" className={`${dmMono.className} bg-[#ffffff] border border-[rgba(0,0,0,0.08)] rounded px-4 py-3 text-sm text-[#111827] w-full md:w-auto outline-none focus:border-[#ec9324]/50 transition-colors`} />
            <input type="email" placeholder="Email" className={`${dmMono.className} bg-[#ffffff] border border-[rgba(0,0,0,0.08)] rounded px-4 py-3 text-sm text-[#111827] w-full md:w-auto outline-none focus:border-[#ec9324]/50 transition-colors`} />
            <input type="text" placeholder="Message" className={`${dmMono.className} bg-[#ffffff] border border-[rgba(0,0,0,0.08)] rounded px-4 py-3 text-sm text-[#111827] w-full md:w-auto flex-1 outline-none focus:border-[#ec9324]/50 transition-colors`} />
            <button className={`${dmMono.className} bg-[#ec9324] text-[#ffffff] font-medium px-8 py-3 rounded text-sm hover:brightness-110 transition-all w-full md:w-auto`}>
              Submit
            </button>
          </form>
        </div>
      </footer>

    </div>
  );
}
