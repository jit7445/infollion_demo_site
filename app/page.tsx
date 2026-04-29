"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  Phone, Users, UserPlus, Plane, 
  TrendingUp, BrainCircuit, Sparkles, 
  ArrowRight, ShieldCheck, Search, 
  FileText, SquareCheckBig, ChevronRight, 
  Zap, Shield, Globe
} from "lucide-react";
import { BackgroundParticles } from "@/components/BackgroundParticles";
import { LampAnimation } from "@/components/LampAnimation";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

// ─── Sub-Components ─────────────────────────────────────────────────────────

function MagneticButton({ 
  children, 
  href, 
  variant = "primary" 
}: { 
  children: React.ReactNode, 
  href?: string, 
  variant?: "primary" | "ghost" 
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);
  const x = useTransform(motionValue(0), [0], [0]); // Placeholder
  const y = useTransform(motionValue(0), [0], [0]); // Placeholder
  
  // Simple implementation for recovery
  return (
    <motion.a
      href={href}
      className={`relative inline-flex items-center gap-3 rounded-full px-10 py-5 font-bold transition-all duration-300 text-sm uppercase tracking-widest ${
        variant === "primary"
          ? "bg-[#ec9324] text-white shadow-[0_20px_40px_-10px_rgba(255,122,48,0.3)] hover:scale-105 active:scale-95"
          : "border-2 border-[#ec9324]/30 text-[#ec9324] hover:bg-[#ec9324]/5 hover:border-[#ec9324]/60"
      }`}
    >
      {children}
    </motion.a>
  );
}

// Helper to handle motion values without complex setup for now
import { useMotionValue } from "motion/react";
function motionValue(v: number) { return useMotionValue(v); }

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.05, 0.15], [0.9, 1]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  const useCases = [
    {
      title: "Investment Funds",
      desc: "Exploratory research, Deal flow, due-diligence, portfolio resources group.",
      icon: <TrendingUp className="w-8 h-8 text-brand-primary" />,
    },
    {
      title: "Research & Consulting",
      desc: "Project proposals, Kick-off hypothesis, Benchmarking, KOL surveys, Analysis validation.",
      icon: <BrainCircuit className="w-8 h-8 text-brand-primary" />,
    },
    {
      title: "Companies",
      desc: "Kick-starter teams, Private long-term advisors, One-time events, Board members.",
      icon: <Users className="w-8 h-8 text-brand-primary" />,
    },
  ];

  return (
    <div ref={containerRef} className="relative">
      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[90vh] pt-20 lg:pt-28 pb-10 px-10 lg:px-24 overflow-hidden w-full">
        <BackgroundParticles />
        

        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center mt-20">
          {/* Left Content */}
          <motion.div 
            style={{ 
              y: useTransform(scrollYProgress, [0, 0.4], [0, 120]),
              opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0])
            }}
            className="col-span-12 lg:col-span-5 flex flex-col items-start relative"
          >
            {/* Lamp Pendulum Illustration */}
            <div className="pointer-events-none absolute -top-[350px] left-0 right-0 z-30 flex justify-center lg:justify-start lg:pl-[25%]">
              <div className="w-0 flex justify-center">
                <LampAnimation />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 border border-brand-primary/20 bg-brand-primary/5"
            >
              <Sparkles className="h-3 w-3 text-brand-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary/80">
                Curated experts who've been there, done that
              </span>
            </motion.div>

            <div className="mb-4">
              <h1 className="text-[clamp(2.5rem,7vw,4.5rem)] font-semibold tracking-tight leading-[0.95]">
                Get <span className="text-brand-primary italic font-serif">On-Demand</span> Expertise.
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-2 max-w-xl text-lg opacity-60 leading-relaxed text-brand-text"
            >
              Phone calls · Personal advisors · On-site workshops · Knowledge tours · Consultants · SOW employees. One panel, infinite expertise.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-8 flex flex-wrap items-center gap-6"
            >
              <MagneticButton href="#request" variant="primary">
                Request Experts <ArrowRight className="h-5 w-5 ml-1" />
              </MagneticButton>
              <MagneticButton variant="ghost" href="#register">
                Register as an Expert
              </MagneticButton>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 1 }}
              className="mt-12 flex flex-wrap gap-x-16 gap-y-6"
            >
              {[
                ["12k+", "Vetted experts"],
                ["48 hr", "Avg. match time"],
                ["140+", "Industries covered"]
              ].map(([val, label]) => (
                <div key={label} className="flex flex-col">
                  <div className="text-4xl font-bold text-brand-primary mb-1 font-playfair">{val}</div>
                  <div className="uppercase tracking-[0.2em] font-bold text-[10px] opacity-40 text-brand-text">{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Video Mockup */}
          {/* <div className="col-span-12 lg:col-span-7 relative mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[2.5rem] border border-black/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] mb-12"
            >
              <video autoPlay muted loop playsInline className="aspect-video h-full w-full object-cover">
                <source src="/animationimaage/video1.mp4" type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
            <div className="absolute -inset-20 bg-brand-primary/10 blur-[120px] -z-10 pointer-events-none opacity-30" />
          </div> */}
        </div>

        <motion.div 
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-40">Scroll ↓</span>
        </motion.div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <motion.section 
        id="services" 
        style={{ opacity, scale }}
        className="mt-24 grid lg:grid-cols-2 gap-20 items-center px-10 lg:px-24"
      >
        <div className="reveal-left relative">
          <div className="w-20 h-1 mb-8 bg-brand-primary" />
          <TextGenerateEffect 
            words="Know More About Us" 
            className="text-3xl font-bold tracking-[0.25em] uppercase mb-8 text-brand-text" 
          />
          <p className="leading-relaxed text-lg mb-6 font-light text-brand-text-muted">
            Infollion aggregates subject matter experts, independent consultants and freelancers to facilitate their access for short-term expertise to{" "}
            <span className="text-brand-primary font-medium">companies, consulting firms and investment funds</span>. 
            Infollion offers flexible <span className="text-brand-primary font-medium">modes of engagement</span> to reach out to experts on its panel.
          </p>
          <p className="leading-relaxed text-lg font-light text-brand-text-muted">
            It ranges from a very short phone call to a few months long project based on pre-determined statement of work. The Panel can be accessed in 3 easy steps.
          </p>
        </div>

        <div 
          className="reveal-right rounded-[40px] p-8 flex flex-col gap-6 shadow-2xl"
          style={{ background: "rgba(255,122,48,0.03)", border: "1px solid rgba(255,122,48,0.1)" }}
        >
          {[
            { title: "Expert Network", desc: "10,000+ verified experts across 150+ industries globally.", icon: <Globe className="text-brand-primary w-7 h-7" /> },
            { title: "AI Matching", desc: "Our algorithms match your brief to the right expert in under 48 hours.", icon: <Zap className="text-brand-primary w-7 h-7" /> },
            { title: "Compliant", desc: "GDPR-compliant processes, NDAs, and secure communications.", icon: <Shield className="text-brand-primary w-7 h-7" /> }
          ].map(item => (
            <div key={item.title} className="flex items-start gap-4">
              <div className="p-3 rounded-xl flex-shrink-0 bg-brand-primary/10">
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider mb-1 text-brand-text">{item.title}</h4>
                <p className="text-sm leading-relaxed text-brand-text-muted">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── STEPS SECTION ── */}
      <section className="mt-24 relative px-10 lg:px-24">
        <div className="grid md:grid-cols-3 gap-12 relative">
          <div className="absolute top-12 left-0 w-full h-[1px] hidden md:block opacity-10 bg-brand-text" />
          {[
            { step: "DEFINE", icon: <Search />, text: "Looking for deep subject matter expertise? Let us know the knowledge gap you face." },
            { step: "REQUEST", icon: <FileText />, text: "Send a request and we'll share the most relevant expert profiles with pricing & past performance." },
            { step: "CHOOSE", icon: <SquareCheckBig />, text: "Choose the duration and mode of engagement from our flexible & customizable models." }
          ].map((item, i) => (
            <div key={item.step} className={`reveal-flip-up stagger-${i+1} relative z-10 flex flex-col items-center text-center`}>
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center mb-8 transition-all group bg-brand-bg border-2 border-brand-primary/20 text-brand-primary hover:border-brand-primary"
              >
                {item.icon}
              </div>
              <h3 className="text-sm font-bold tracking-[0.4em] uppercase mb-4 text-brand-text">{item.step}</h3>
              <p className="text-sm leading-relaxed max-w-xs opacity-60 text-brand-text">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MODES SECTION ── */}
      <section id="experts" className="mt-24 text-center relative px-10 lg:px-24">
        <h2 className="reveal text-2xl font-bold tracking-[0.4em] uppercase mb-6 relative z-10 text-brand-text">
          Modes of Engagement
        </h2>
        <div className="reveal stagger-1 w-16 h-1 mx-auto mb-16 relative z-10 bg-brand-primary" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {[
            { label: "Calls", icon: <Phone className="w-6 h-6" />, desc: "Rapid telephonic consultations." },
            { label: "Sit-Ins", icon: <Users className="w-6 h-6" />, desc: "Interactive deep-dive workshops." },
            { label: "Tours", icon: <Plane className="w-6 h-6" />, desc: "Field research and site visits." },
            { label: "PexPanel", icon: <UserPlus className="w-6 h-6" />, desc: "Long-term professional engagement." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="p-8 rounded-3xl text-left group transition-all bg-brand-primary/[0.02] border border-brand-primary/[0.05] hover:border-brand-primary/20"
            >
              <div className="mb-6 transition-transform group-hover:scale-110 group-hover:rotate-12 duration-500 text-brand-primary">
                {item.icon}
              </div>
              <h4 className="font-bold uppercase tracking-widest mb-3 text-sm text-brand-text">{item.label}</h4>
              <p className="text-xs leading-relaxed opacity-60 text-brand-text">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── USE CASES SECTION ── */}
      <section className="mt-24 text-center pb-24 px-10 lg:px-24">
        <TextGenerateEffect 
          words="Sample Use-Cases" 
          className="reveal text-2xl font-bold tracking-[0.4em] uppercase mb-6 text-center" 
        />
        <div className="reveal stagger-1 w-16 h-1 mx-auto mb-20 bg-brand-primary" />

        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {useCases.map((item, i) => (
            <motion.div 
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
              }}
              className="p-10 rounded-[3rem] flex flex-col items-center group cursor-default transition-all bg-brand-primary/[0.02] border border-brand-primary/[0.05] hover:border-brand-primary/20"
            >
              <div className="w-24 h-24 rounded-full flex items-center justify-center mb-10 group-hover:rotate-3 group-hover:scale-105 transition-all duration-500 shadow-lg bg-white border border-brand-primary/10">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold uppercase tracking-widest mb-6 text-brand-text">{item.title}</h3>
              <p className="text-sm leading-relaxed opacity-60 text-brand-text">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
