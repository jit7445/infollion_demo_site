"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { Cormorant_Garamond, DM_Mono } from "next/font/google";
import { Plus, Minus, ArrowRight, User, Calendar, Tag, Briefcase, MapPin, Users, FileText, Phone } from "lucide-react";
import { ScrollTextReveal } from "@/components/ui/scroll-text-reveal";
import { MovingBorder } from "@/components/ui/moving-border";

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
  { id: "calls", label: "Calls", size: 140 },
  { id: "sit-ins", label: "Sit-Ins", size: 140 },
  { id: "tours", label: "Knowledge Tours", size: 140 },
  { id: "paxpanel", label: "PaxPanel", size: 140 },
];

const ballShadow = `
  inset -10px -10px 20px rgba(180, 160, 180, 0.4),
  inset 10px 10px 20px rgba(255, 255, 255, 0.9),
  15px 25px 40px rgba(160, 100, 60, 0.25),
  -10px 15px 30px rgba(255, 120, 50, 0.15)
`;

function ScrollZoomWrapper({ children, className = "", id }: { children: React.ReactNode, className?: string, id?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.8, 1, 1, 0.7]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div id={id} ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

function HeroBall({ ball }: { ball: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 1.1, y: -10 }}
      className="relative flex flex-col items-center cursor-pointer group"
      onClick={() => {
        const el = document.getElementById(ball.id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <div 
        className="w-[100px] h-[100px] md:w-[140px] md:h-[140px] rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(236,147,36,0.3)]"
        style={{
          background: `radial-gradient(circle at 35% 35%, #fff 0%, #fff 5%, #f5e4cd 20%, #e6a77d 50%, #fb8b47 100%)`,
          boxShadow: ballShadow,
        }}
      >
        <div className="absolute inset-0 bg-brand-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className={`${cormorant.className} text-base md:text-2xl font-medium text-[#263238] italic text-center px-4 leading-tight relative z-10`}>
          {ball.label}
        </span>
      </div>
    </motion.div>
  );
}

function AccordionItem({ title, children, isOpen, onClick }: { title: string, children: React.ReactNode, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border-b border-black/5 dark:border-white/5 last:border-0 overflow-hidden">
      <button 
        onClick={onClick}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className={`${dmMono.className} text-xs font-bold tracking-[0.2em] uppercase text-[var(--text-muted)] group-hover:text-[#ec9324] transition-colors`}>
          {title}
        </span>
        <div className="p-1 rounded-full bg-black/5 dark:bg-white/5 transition-transform duration-500 group-hover:bg-[#ec9324]/10">
          {isOpen ? <Minus className="w-3 h-3 text-[#ec9324]" /> : <Plus className="w-3 h-3 text-[#ec9324]" />}
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className={`p-4 pt-0 ${dmMono.className} text-[0.85rem] text-[var(--text-muted)] leading-relaxed`}>
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
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    'calls-topics': true,
    'sitins-highlights': true,
    'panel-roles': true,
    'tours-dest': true
  });

  const toggleAccordion = (id: string) => {
    setOpenAccordions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen transition-colors duration-500">
      
      {/* ─── SECTION 1: HERO ─── */}
      <ScrollZoomWrapper>
        <section 
          className="relative min-h-[70vh] flex flex-col justify-center items-center pt-16 pb-12 overflow-hidden"
          onMouseMove={handleMouseMove}
        >
          <div className="absolute inset-0 pointer-events-none transition-opacity duration-700 dark:opacity-0" style={{
            background: `
              radial-gradient(circle at 10% 90%, #fb8b47 0%, transparent 60%),
              radial-gradient(circle at 90% 10%, #f5e4cd 0%, transparent 60%),
              linear-gradient(135deg, #e6a77d 0%, #d3c2c5 100%)
            `
          }} />
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-0 transition-opacity duration-700 dark:opacity-100">
            <div className="w-[800px] h-[800px] rounded-full blur-[120px]" style={{ background: "radial-gradient(circle at 50% 50%, rgba(236,147,36,0.15) 0%, transparent 70%)" }} />
          </div>

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
                  className={`${cormorant.className} text-[3.5rem] md:text-[4.5rem] font-light leading-[1.1] text-[var(--text)] transition-colors duration-500`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 mt-16 w-full max-w-5xl mx-auto py-12">
              {MAIN_BALLS.map((ball) => (
                <HeroBall key={ball.id} ball={ball} />
              ))}
            </div>

            <motion.div 
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mt-12 flex flex-col items-center"
            >
              <span className={`${dmMono.className} text-[0.6rem] tracking-[0.4em] uppercase text-[var(--text-muted)] mb-2`}>scroll to explore</span>
              <div className="w-px h-10 bg-gradient-to-b from-[#ec9324] to-transparent" />
            </motion.div>
          </div>
        </section>
      </ScrollZoomWrapper>

      {/* ─── SECTION 2: CALLS ─── */}
      <ScrollZoomWrapper>
        <section id="calls" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="relative p-12 md:p-20 rounded-[3.5rem] bg-black/[0.02] dark:bg-white/[0.01] border border-black/5 dark:border-white/5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#ec9324]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative grid md:grid-cols-2 gap-20 items-center z-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className={`${dmMono.className} text-[#ec9324] text-[0.65rem] tracking-[0.2em] uppercase mb-6 block`}>
                  01 — CALLS
                </span>
                <ScrollTextReveal 
                  text="Telephonic Expert Consultations"
                  as="h2"
                  className={`${cormorant.className} text-[3rem] md:text-[4rem] font-light text-[var(--text)] mb-6 leading-[1.1]`}
                />
                <ScrollTextReveal 
                  text="Direct, one-on-one dialogues with vetted subject matter experts to validate hypotheses and gain immediate market intelligence."
                  className={`${dmMono.className} text-[1.25rem] text-[var(--text-muted)] leading-[1.6] mb-10 max-w-lg`}
                />
                
                <div className="space-y-2 border-t border-black/5 dark:border-white/5 pt-6">
                  <AccordionItem 
                    title="Common Topics" 
                    isOpen={!!openAccordions['calls-topics']} 
                    onClick={() => toggleAccordion('calls-topics')}
                  >
                    Market Entry Strategy, Supply Chain Optimization, Competitive Landscaping, Regulatory Navigations, and Technical Validation.
                  </AccordionItem>
                </div>
              </motion.div>

              <div className="relative group/inner">
                <div className="dark:bg-[#111111] bg-[#FAF9F6] border border-black/[0.05] dark:border-transparent rounded-[3rem] p-10 shadow-xl relative overflow-hidden group/card transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ec9324]/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000" />
                  
                  <div className="aspect-[4/3] flex flex-col items-center justify-center relative z-10 mb-10 scale-90 transition-transform duration-700 group-hover/card:scale-100">
                    <Phone className="w-20 h-20 text-[#ec9324] mb-6" strokeWidth={1} />
                    <p className={`${dmMono.className} text-[10px] text-[var(--text-muted)] uppercase tracking-widest text-center max-w-[200px]`}>
                      Vetted Dialogues & Secure Transcripts
                    </p>
                  </div>

                  <div className="w-full h-[1px] dark:bg-white/10 bg-black/[0.08] mb-10 relative z-10" />

                  <div className="grid grid-cols-3 gap-6 relative z-10">
                    {[
                      { label: "Duration", val: "30-90m" },
                      { label: "Vetting", val: "100%" },
                      { label: "Global", val: "24/7" }
                    ].map((s) => (
                      <div key={s.label} className="text-center">
                        <div className="text-xl lg:text-2xl font-serif text-[#ec9324] font-bold mb-1">
                          {s.val}
                        </div>
                        <div className="text-[7px] font-black tracking-[0.1em] dark:text-white text-black opacity-40 uppercase">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollZoomWrapper>

      {/* ─── SECTION 3: SIT-INS ─── */}
      <ScrollZoomWrapper>
        <section id="sit-ins" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="relative p-12 md:p-20 rounded-[3.5rem] bg-black/[0.01] dark:bg-white/[0.01] border border-black/5 dark:border-white/5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.01)] overflow-hidden group">
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ec9324]/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative grid md:grid-cols-2 gap-20 items-center z-10">
              <div className="relative order-2 md:order-1">
                <div className="dark:bg-[#111111] bg-[#FAF9F6] border border-black/[0.05] dark:border-transparent rounded-[3rem] p-10 shadow-xl relative overflow-hidden group/card transition-all duration-500">
                  <div className="aspect-[4/3] flex flex-col items-center justify-center relative z-10 mb-10">
                    <Users className="w-20 h-20 text-[#ec9324] mb-6" strokeWidth={1} />
                    <div className="flex gap-4">
                      <div className="px-3 py-1.5 rounded-full bg-[#ec9324]/10 text-[#ec9324] text-[8px] font-bold uppercase tracking-widest">Workshop</div>
                      <div className="px-3 py-1.5 rounded-full bg-[#ec9324]/10 text-[#ec9324] text-[8px] font-bold uppercase tracking-widest">Seminar</div>
                    </div>
                  </div>

                  <div className="w-full h-[1px] dark:bg-white/10 bg-black/[0.08] mb-10 relative z-10" />

                  <div className="grid grid-cols-3 gap-6 relative z-10">
                    {[
                      { label: "Experts", val: "1-5" },
                      { label: "Formats", val: "Custom" },
                      { label: "Output", val: "Action" }
                    ].map((s) => (
                      <div key={s.label} className="text-center">
                        <div className="text-xl lg:text-2xl font-serif text-[#ec9324] font-bold mb-1">
                          {s.val}
                        </div>
                        <div className="text-[7px] font-black tracking-[0.1em] dark:text-white text-black opacity-40 uppercase">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 md:order-2"
              >
                <span className={`${dmMono.className} text-[#ec9324] text-[0.65rem] tracking-[0.2em] uppercase mb-6 block`}>
                  02 — SIT-INS
                </span>
                <ScrollTextReveal 
                  text="Private Expert-Led Conferences"
                  as="h2"
                  className={`${cormorant.className} text-[3rem] md:text-[4rem] font-light text-[var(--text)] mb-6 leading-[1.1]`}
                />
                <ScrollTextReveal 
                  text="Immersive sessions where experts join your internal meetings or dedicated workshops to provide real-time strategic counsel."
                  className={`${dmMono.className} text-[1.25rem] text-[var(--text-muted)] leading-relaxed mb-10`}
                />
                <div className="space-y-2 border-t border-black/5 dark:border-white/5 pt-6">
                  <AccordionItem 
                    title="Workshop Highlights" 
                    isOpen={!!openAccordions['sitins-highlights']} 
                    onClick={() => toggleAccordion('sitins-highlights')}
                  >
                    In-person or virtual deep-dives, group brainstorming with multi-disciplinary experts, and custom-designed workshop agendas.
                  </AccordionItem>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollZoomWrapper>

      {/* ─── SECTION 4: PAXPANEL ─── */}
      <ScrollZoomWrapper>
        <section id="paxpanel" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="relative p-12 md:p-20 rounded-[3.5rem] bg-black/[0.02] dark:bg-white/[0.01] border border-black/5 dark:border-white/5 backdrop-blur-2xl shadow-sm overflow-hidden group">
            <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-[#ec9324]/5 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative max-w-4xl mx-auto z-10"
            >
              <span className={`${dmMono.className} text-[#ec9324] text-[0.65rem] tracking-[0.2em] uppercase mb-6 block`}>
                03 — PAXPANEL
              </span>
              <ScrollTextReveal 
                text="On-Demand Expert Access"
                as="h2"
                className={`${cormorant.className} text-[3rem] md:text-[4rem] font-light text-[var(--text)] mb-6 leading-[1.1] justify-center`}
              />
              <ScrollTextReveal 
                text="Retain a hand-picked panel of elite experts for ongoing advisory roles, interim leadership, or long-term project support."
                className={`${dmMono.className} text-[1.25rem] text-[var(--text-muted)] max-w-2xl mx-auto leading-[1.6] justify-center`}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
                 {[
                   { icon: <User className="w-5 h-5"/>, title: "Interim Execs", desc: "Fractional CXOs for rapid scaling" },
                   { icon: <Calendar className="w-5 h-5"/>, title: "Advisory Boards", desc: "Quarterly strategic reviews" },
                   { icon: <Briefcase className="w-5 h-5"/>, title: "Special Projects", desc: "End-to-end expert integration" }
                 ].map((box, i) => (
                   <div key={i} className="p-8 rounded-[2rem] bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 hover:border-[#ec9324]/30 transition-all duration-500 hover:shadow-xl">
                      <div className="w-12 h-12 rounded-full bg-[#ec9324]/10 flex items-center justify-center text-[#ec9324] mx-auto mb-6">
                        {box.icon}
                      </div>
                      <h4 className="text-sm font-bold uppercase tracking-widest mb-3">{box.title}</h4>
                      <p className="text-xs text-[var(--text-muted)]">{box.desc}</p>
                   </div>
                 ))}
              </div>

              <div className="mt-16 text-left max-w-2xl mx-auto border-t border-black/5 dark:border-white/5 pt-10">
                  <AccordionItem 
                    title="Typical Roles" 
                    isOpen={!!openAccordions['panel-roles']} 
                    onClick={() => toggleAccordion('panel-roles')}
                  >
                    Strategy Consultants, CTO Advisors, Supply Chain Architects, and Industry Specific Legal Vetting Experts.
                  </AccordionItem>
              </div>
            </motion.div>
          </div>
        </section>
      </ScrollZoomWrapper>

      {/* ─── SECTION 5: KNOWLEDGE TOURS ─── */}
      <ScrollZoomWrapper>
        <section id="tours" className="py-24 px-6 max-w-7xl mx-auto mb-20">
          <div className="relative p-12 md:p-20 rounded-[3.5rem] bg-black/[0.01] dark:bg-white/[0.01] border border-black/5 dark:border-white/5 backdrop-blur-2xl shadow-sm overflow-hidden group">
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#ec9324]/5 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative grid md:grid-cols-2 gap-20 items-center z-10">
              <div className="relative order-2 md:order-1">
                <div className="dark:bg-[#111111] bg-[#FAF9F6] border border-black/[0.05] dark:border-transparent rounded-[3rem] p-10 shadow-xl relative overflow-hidden group/card transition-all duration-500">
                  <div className="aspect-[4/3] flex flex-col items-center justify-center relative z-10 mb-10">
                    <MapPin className="w-20 h-20 text-[#ec9324] mb-6" strokeWidth={1} />
                    <div className="flex flex-wrap justify-center gap-2 max-w-[250px]">
                      {["Industrial", "SEZs", "Tech Hubs"].map(t => (
                        <span key={t} className="px-2 py-1 rounded bg-[#ec9324]/10 text-[#ec9324] text-[7px] font-bold uppercase tracking-widest">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="w-full h-[1px] dark:bg-white/10 bg-black/[0.08] mb-10 relative z-10" />

                  <div className="grid grid-cols-3 gap-6 relative z-10">
                    {[
                      { label: "Sites", val: "Global" },
                      { label: "Guides", val: "Veterans" },
                      { label: "Context", val: "Field" }
                    ].map((s) => (
                      <div key={s.label} className="text-center">
                        <div className="text-xl lg:text-2xl font-serif text-[#ec9324] font-bold mb-1">
                          {s.val}
                        </div>
                        <div className="text-[7px] font-black tracking-[0.1em] dark:text-white text-black opacity-40 uppercase">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 md:order-2"
              >
                <span className={`${dmMono.className} text-[#ec9324] text-[0.65rem] tracking-[0.2em] uppercase mb-6 block`}>
                  04 — KNOWLEDGE TOURS
                </span>
                <ScrollTextReveal 
                  text="Private Research Trips"
                  as="h2"
                  className={`${cormorant.className} text-[3rem] md:text-[4rem] font-light text-[var(--text)] mb-6 leading-[1.1]`}
                />
                <ScrollTextReveal 
                  text="Physically visit manufacturing sites, tech hubs, or retail facilities accompanied by an industry veteran for deep-field context."
                  className={`${dmMono.className} text-[1.25rem] text-[var(--text-muted)] leading-[1.6] mb-10`}
                />
                
                <div className="space-y-2 border-t border-black/5 dark:border-white/5 pt-6">
                  <AccordionItem 
                    title="Typical Destinations" 
                    isOpen={!!openAccordions['tours-dest']} 
                    onClick={() => toggleAccordion('tours-dest')}
                  >
                    Industrial Corridors, SEZs, Research Facilities, High-Tech Parks, and Global Logistics Hubs.
                  </AccordionItem>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollZoomWrapper>

      {/* ─── FOOTER CTA ─── */}
      <section className="py-32 px-6 text-center">
        <h2 className={`${cormorant.className} text-4xl md:text-5xl font-light mb-12`}>
          Ready to find your expert?
        </h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button className="px-12 py-5 bg-[#ec9324] text-white rounded-full font-bold uppercase tracking-[0.2em] text-[0.7rem] hover:scale-105 transition-transform">
            Start a Search
          </button>
          <button className="px-12 py-5 border border-black/10 dark:border-white/10 rounded-full font-bold uppercase tracking-[0.2em] text-[0.7rem] hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            Request Demo
          </button>
        </div>
      </section>

    </div>
  );
}
