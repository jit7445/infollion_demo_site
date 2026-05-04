"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Plus, Minus, Building2, Lightbulb, Coins } from "lucide-react";
import { AssemblingInvestmentIllustration } from "@/components/AssemblingInvestmentIllustration";
import { TeamAssemblyIllustration } from "@/components/TeamAssemblyIllustration";
import { ResearchIllustration } from "@/components/ResearchIllustration";
import { MovingBorder } from "@/components/ui/moving-border";
import { ScrollTextReveal } from "@/components/ui/scroll-text-reveal";

function ScrollZoomWrapper({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.98, 1, 1, 0.98]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <motion.div id={id} ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

function AccordionItem({ 
  num, 
  title, 
  children, 
  isOpen, 
  onClick 
}: { 
  num: string; 
  title: string; 
  children: React.ReactNode; 
  isOpen: boolean; 
  onClick: () => void 
}) {
  return (
    <div
      className={`transition-all duration-500 border rounded-xl overflow-hidden mb-3 ${
        isOpen 
          ? "bg-white dark:bg-white/[0.03] border-brand-primary shadow-[0_10px_30px_rgba(236,147,36,0.1)]" 
          : "bg-white dark:bg-white/[0.02] border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10"
      }`}
    >
      <button
        onClick={onClick}
        className="w-full px-8 py-6 flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-8">
          <span className={`text-[10px] font-bold tracking-widest ${isOpen ? "text-brand-primary" : "opacity-30"}`}>
            {num}
          </span>
          <span className={`text-xs font-black tracking-[0.2em] uppercase transition-colors ${isOpen ? "text-brand-primary" : "opacity-70 group-hover:opacity-100"}`}>
            {title}
          </span>
        </div>
        <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${
          isOpen ? "bg-brand-primary border-brand-primary text-white" : "border-black/10 dark:border-white/10 opacity-40 group-hover:opacity-100"
        }`}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-24 pb-8 text-[13px] opacity-60 leading-relaxed font-medium">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const useCaseCategories = [
  { id: "corporations", label: "Corporations", icon: <Building2 className="w-8 h-8" /> },
  { id: "consulting", label: "Research & Consulting", icon: <Lightbulb className="w-8 h-8" /> },
  { id: "investment", label: "Investment Funds", icon: <Coins className="w-8 h-8" /> },
];

const contentMap: Record<string, any> = {
  corporations: {
    title: "Corporations &",
    titleAccent: "Enterprise",
    desc: "Unlock specialised expertise precisely when your business needs it — without the overhead of permanent hires or long-term consulting retainers.",
    imageIcon: <TeamAssemblyIllustration />,
    stats: [
      { label: "CORPORATIONS", value: "500+" },
      { label: "TEAM SIZE", value: "1-5" },
      { label: "AVG. DEPLOY", value: "48h" },
    ],
    items: [
      { num: "01", title: "KICK STARTER TEAMS", text: "Deploy specialized teams including ex-CXOs and implementation leads to enter new verticals or geographies. Manage smooth transitions to in-house professionals once established." },
      { num: "02", title: "PERSONAL ADVISORS", text: "Direct access to ex-CEOs for strategic mentoring. Break through growth plateaus by adopting best practices from industry veterans who have scaled companies to the next league." },
      { num: "03", title: "ONE TIME EVENTS (OTE)", text: "Specialized support for rare lifecycle events like IPOs, PE fund raising, or major organizational restructuring. Avoid costly mistakes by consulting experts who have witnessed these events from close quarters." },
      { num: "04", title: "TECHNOLOGY IMPLEMENTATIONS", text: "Hire independent experts to oversee major technology implementations. Ensure cost-effectiveness and avoid being 'oversold' by service providers." },
      { num: "05", title: "BOARD MEMBERS", text: "Corporate advisors to join your Board. Independent directors bring wealth of experience and help benchmark operations." },
    ],
  },
  consulting: {
    title: "Research &",
    titleAccent: "Consulting",
    desc: "Empower your consulting team with deep industry insights. Source real-world knowledge to validate hypotheses and win high-stakes project bids.",
    imageIcon: <ResearchIllustration />,
    stats: [
      { label: "RESEARCH FIRMS", value: "200+" },
      { label: "DOMAIN DEPTH", value: "100%" },
      { label: "RESPONSE", value: "2h" },
    ],
    items: [
      { num: "01", title: "PROJECT INITIATION", text: "In-depth domain knowledge at the proposal stage leaves a lasting impact on potential clients and reflects positively on engagement success." },
      { num: "02", title: "KICK-OFF HYPOTHESIS", text: "Telephonic consultations with industry experts help in evaluating the various strategies and hypothesis to be proposed to your clients." },
      { num: "03", title: "KEY OPINION LEADERS", text: "Sourcing point of view from industry insiders is critical for formulating high-impact recommendations and competitive analysis." },
      { num: "04", title: "ANALYSIS VALIDATION", text: "Validate results and recommendations with industry veterans to identify missing gaps or strategies with the potential of backfiring." },
    ],
  },
  investment: {
    title: "Investment",
    titleAccent: "Funds",
    desc: "Accelerate your due diligence process with specialized intelligence. Access operational expertise to drive value creation across your portfolio.",
    imageIcon: <AssemblingInvestmentIllustration />,
    stats: [
      { label: "FUNDS", value: "150+" },
      { label: "DUE DILIGENCE", value: "24h" },
      { label: "PORTFOLIO ROI", value: "3.5x" },
    ],
    items: [
      { num: "01", title: "EXPLORATORY RESEARCH", text: "Consult with industry experts to explore new sectors with potential opportunities. Identify gaps and future outlooks before committing capital." },
      { num: "02", title: "DEAL FLOW", text: "Effective tool for sourcing new deals. Industry veterans are highly aware of the landscape and company strategies in their specific domains." },
      { num: "03", title: "DUE DILIGENCE", text: "Insider point of view on installations, IP, and goodwill. Conduct scuttle-butting of all touchpoints via our specialized field team." },
      { num: "04", title: "PORTFOLIO SUPPORT", text: "Operational expertise to help portfolio companies scale. Hire experts as representatives on the board to overcome bottlenecks." },
    ],
  },
};

function UseCaseSection({ 
  id, 
  category, 
  activeId, 
  setActiveId,
  isReversed
}: { 
  id: string; 
  category: any; 
  activeId: string | null; 
  setActiveId: (id: string | null) => void;
  isReversed?: boolean;
}) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const drawWidth = useTransform(scrollYProgress, [0.1, 0.4], ["0%", "100%"]);

  return (
    <ScrollZoomWrapper id={id} className="scroll-mt-32">
      <div ref={sectionRef}>
        {/* Header Split */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-8">
          <div className={`relative ${isReversed ? 'lg:order-2 lg:text-right' : ''}`}>
            <div className={`text-4xl lg:text-6xl font-serif leading-tight flex flex-wrap items-baseline gap-x-4 ${isReversed ? 'lg:justify-end' : ''}`}>
              <ScrollTextReveal 
                text={category.title} 
                as="h2" 
                className="text-current font-bold" 
              />
              <ScrollTextReveal 
                text={category.titleAccent} 
                as="span" 
                className="text-brand-primary italic"
                delay={0.2}
              />
            </div>
            
            {/* Pulsing Dot with Entry Animation */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className={`absolute -top-4 w-10 h-10 flex items-center justify-center ${isReversed ? 'lg:-left-4 -right-4' : '-right-4'}`}
            >
              <div className="w-2 h-2 bg-brand-primary rounded-full relative z-10" />
              <div className="absolute inset-0 bg-brand-primary/20 rounded-full animate-ping scale-75" />
              <div className="absolute inset-0 border border-brand-primary/30 rounded-full scale-50" />
            </motion.div>
          </div>
          <div className={`pb-2 ${isReversed ? 'lg:order-1' : ''}`}>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className={`text-sm lg:text-base opacity-50 max-w-lg leading-relaxed ${isReversed ? 'lg:ml-auto lg:text-right' : ''}`}
            >
              {category.desc}
            </motion.p>
          </div>
        </div>

        {/* Drawing Divider Line */}
        <div className="relative w-full h-[1px] bg-black/[0.05] dark:bg-white/[0.05] mb-16 overflow-hidden">
          <motion.div 
            style={{ width: drawWidth }}
            className="absolute inset-y-0 left-0 bg-brand-primary shadow-[0_0_10px_rgba(236,147,36,0.5)]"
          />
        </div>

        {/* Main Content Layout */}
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Accordion Column */}
          <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : ''}`}>
            {category.items.map((item: any, i: number) => (
              <AccordionItem
                key={item.num}
                num={item.num}
                title={item.title}
                isOpen={activeId === `${id}-${i}`}
                onClick={() => setActiveId(activeId === `${id}-${i}` ? null : `${id}-${i}`)}
              >
                {item.text}
              </AccordionItem>
            ))}
          </div>

          {/* Illustration & Stats Card Column */}
          <div className={`lg:col-span-6 lg:sticky lg:top-32 ${isReversed ? 'lg:order-1' : ''}`}>
            <div className="dark:bg-[#111111] bg-[#FAF9F6] border border-black/[0.05] dark:border-transparent rounded-[3rem] p-10 shadow-xl relative overflow-hidden group transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="aspect-[4/3] flex items-center justify-center relative z-10 mb-10 scale-90 transition-transform duration-700 group-hover:scale-100">
                <div className="w-full h-full dark:brightness-100 brightness-[0.95] dark:contrast-100 contrast-[1.05]">
                  {category.imageIcon}
                </div>
              </div>

              <div className="w-full h-[1px] dark:bg-white/10 bg-black/[0.08] mb-10 relative z-10" />

              <div className="grid grid-cols-3 gap-8 relative z-10">
                {category.stats.map((s: any) => (
                  <div key={s.label} className="text-center">
                    <div className="text-3xl lg:text-4xl font-serif text-brand-primary font-bold mb-2">
                      {s.value}
                    </div>
                    <div className="text-[9px] font-black tracking-[0.2em] dark:text-white text-black opacity-50 uppercase">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollZoomWrapper>
  );
}

function UseCaseNavLink({ cat, i }: { cat: any, i: number }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.a
      href={`#${cat.id}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col items-center gap-4"
    >
      <MovingBorder isHovered={isHovered} borderRadius="1.5rem">
        <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-3xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-brand-primary transition-all duration-500 group-hover:bg-brand-primary group-hover:text-white group-hover:-translate-y-2 shadow-2xl">
          {cat.icon}
        </div>
      </MovingBorder>
      <span className="text-[9px] font-black tracking-[0.2em] uppercase opacity-40 group-hover:opacity-100 transition-opacity">
        {cat.label}
      </span>
    </motion.a>
  );
}

export default function UseCases() {
  const [activeId, setActiveId] = useState<string | null>("corporations-0");

  return (
    <div className="min-h-screen transition-colors duration-500 px-8 relative"
         style={{ 
           maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
           WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent 100%)" 
         }}>
      {/* Cinematic Header */}
      <section className="pt-20 pb-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold tracking-[0.3em] uppercase mb-8"
          >
            Practical Applications
          </motion.div>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tighter text-current mb-6 font-syne">
            Sample <span className="text-brand-primary">Use-Cases</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm text-current opacity-50 tracking-widest uppercase font-bold">
            Bridging the gap between specialized knowledge and high-stakes business requirements.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mt-16 grid grid-cols-3 gap-6 relative z-10 px-4">
          {useCaseCategories.map((cat, i) => (
            <UseCaseNavLink key={cat.id} cat={cat} i={i} />
          ))}
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto space-y-48 pb-40">
        {Object.entries(contentMap).map(([id, category], index) => (
          <UseCaseSection 
            key={id} 
            id={id} 
            category={category} 
            activeId={activeId} 
            setActiveId={setActiveId} 
            isReversed={index % 2 !== 0}
          />
        ))}
      </div>
    </div>
  );
}
