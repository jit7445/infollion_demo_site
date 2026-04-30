"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue } from "framer-motion";
import {
  Phone,
  Users,
  UserPlus,
  Plane,
  TrendingUp,
  BrainCircuit,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Search,
  FileText,
  SquareCheckBig,
  ChevronRight,
  Zap,
  Shield,
  Globe,
  Building2,
  Lightbulb,
  Coins,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BackgroundParticles } from "@/components/BackgroundParticles";
import ParticleHero from "@/components/ParticleHero";
import { LampAnimation } from "@/components/LampAnimation";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { AssemblingInvestmentIllustration } from "@/components/AssemblingInvestmentIllustration";
import { TeamAssemblyIllustration } from "@/components/TeamAssemblyIllustration";
import { ResearchIllustration } from "@/components/ResearchIllustration";
import { MovingBorder } from "@/components/ui/moving-border";
import dynamic from "next/dynamic";
const GlobeStoryboard = dynamic(() => import("@/components/GlobeStoryboard").then((mod) => mod.GlobeStoryboard), {
  ssr: false,
});

// ─── Sub-Components ─────────────────────────────────────────────────────────

function MagneticButton({
  children,
  href,
  variant = "primary",
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
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
function motionValue(v: number) {
  return useMotionValue(v);
}

function TimelineStepCard({ step, isRight = false }: { step: any; isRight?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: isRight ? 30 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <MovingBorder isHovered={isHovered} duration={4000} borderRadius="2rem">
        <div
          className={`p-8 md:p-10 rounded-[2rem] bg-black/[0.03] dark:bg-white/[0.02] border border-black/5 dark:border-white/10 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] relative overflow-hidden group transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(236,147,36,0.15)] ${isRight ? "text-right" : "text-left"}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <span className="text-[10px] tracking-[0.2em] text-[var(--text-muted)] mb-3 block uppercase font-mono relative z-10">
            Step {step.id}
          </span>
          <h3 className="text-lg font-playfair text-[var(--text)] mb-3 relative z-10">{step.title}</h3>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed relative z-10">{step.text}</p>
        </div>
      </MovingBorder>
    </motion.div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────

function TimelineSteps() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const steps = [
    {
      id: "01",
      title: "Define",
      icon: <Search className="w-5 h-5" />,
      text: "Describe the knowledge gap or the kind of ex-CEO you'd hire if budgets allowed.",
    },
    {
      id: "02",
      title: "Request",
      icon: <Plane className="w-5 h-5" style={{ transform: "rotate(-45deg)" }} />,
      text: "We research your topic and share the most relevant profiles with pricing & past work.",
    },
    {
      id: "03",
      title: "Choose",
      icon: <SquareCheckBig className="w-5 h-5" />,
      text: "Pick the expert and the engagement mode that perfectly fits your need.",
    },
  ];

  return (
    <section ref={ref} className="relative mt-32 mb-16 max-w-4xl mx-auto px-6 py-12">
      {/* Background Dim Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[var(--border)] -translate-x-1/2" />

      {/* Animated Colored Line */}
      <motion.div
        className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#ec9324] -translate-x-1/2 origin-top"
        style={{ scaleY: scrollYProgress, boxShadow: "0 0 15px 2px rgba(236,147,36,0.6)" }}
      />

      <div className="flex flex-col gap-32">
        {steps.map((step, i) => {
          const isEven = i % 2 === 0;
          return (
            <div key={step.id} className="relative flex items-center w-full">
              {/* Left Content */}
              <div className={`w-1/2 pr-12 md:pr-16 ${!isEven ? "opacity-0" : "text-left"}`}>
                {isEven && <TimelineStepCard step={step} />}
              </div>

              {/* Center Node */}
              <div className="absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border border-[#ec9324] flex items-center justify-center z-10 bg-[var(--bg2)] shadow-[0_0_30px_rgba(236,147,36,0.3)] dark:shadow-[0_0_40px_rgba(236,147,36,0.4)]">
                <div className="text-[#ec9324]">{step.icon}</div>
              </div>

              {/* Right Content */}
              <div className={`w-1/2 pl-12 md:pl-16 ${isEven ? "opacity-0" : "text-right flex flex-col items-end"}`}>
                {!isEven && <TimelineStepCard step={step} isRight />}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ScrollZoomWrapper({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.8, 1, 1, 0.7]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div id={id} ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

export default function Home() {
  const router = useRouter();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.05, 0.15], [0.9, 1]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  const [activeUseCase, setActiveUseCase] = useState<number | null>(null);
  const [useCaseHover, setUseCaseHover] = useState<number | null>(null);

  const useCases = [
    {
      id: "corporations",
      title: "CORPORATIONS",
      icon: <Building2 className="w-10 h-10 text-[#ec9324]" strokeWidth={1.5} />,
      desc: "Connect with industry veterans for market entry strategy, supply chain optimization, and digital transformation.",
    },
    {
      id: "consulting",
      title: "RESEARCH & CONSULTING FIRMS",
      icon: <Lightbulb className="w-10 h-10 text-[#ec9324]" strokeWidth={1.5} />,
      desc: "Empower your consulting projects with precise, expert-vetted insights from global subject matter experts.",
    },
    {
      id: "investment",
      title: "INVESTMENT FUNDS",
      icon: <Coins className="w-10 h-10 text-[#ec9324]" strokeWidth={1.5} />,
      desc: "Mitigate risks and validate investment theses with direct access to C-suite experts and industry insiders.",
    },
  ];

  return (
    <div ref={containerRef} className="relative">
      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[70vh] pt-20 lg:pt-28 pb-10 px-10 lg:px-24 overflow-hidden w-full">
        {/* <BackgroundParticles /> */}
        {/* <ParticleHero /> */}

        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center mt-10">
          {/* Left Content */}
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0, 0.4], [0, 120]),
              opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]),
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
              <h1 className="text-[clamp(1.5rem,4vw,2.5rem)] font-semibold tracking-tight leading-[0.95]">
                Get <span className="text-brand-primary italic font-serif">On-Demand</span> Expertise.
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-2 max-w-xl text-lg opacity-60 leading-relaxed text-brand-text"
            >
              Phone calls · Personal advisors · On-site workshops · Knowledge tours · Consultants · SOW employees. One
              panel, infinite expertise.
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
                ["140+", "Industries covered"],
              ].map(([val, label]) => (
                <div key={label} className="flex flex-col">
                  <div className="text-4xl font-bold text-brand-primary mb-1 font-playfair">{val}</div>
                  <div className="uppercase tracking-[0.2em] font-bold text-[10px] opacity-40 text-brand-text">
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Refined Globe Storyboard */}
          <div className="col-span-12 lg:col-span-7 relative mt-12 lg:mt-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <GlobeStoryboard />
            </motion.div>
          </div>
        </div>

        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-40">Scroll ↓</span>
        </motion.div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <ScrollZoomWrapper className="mt-24 grid lg:grid-cols-2 gap-20 items-center px-10 lg:px-24">
        <div className="reveal-left relative">
          <div className="w-20 h-1 mb-8 bg-brand-primary" />
          <TextGenerateEffect
            words="Know More About Us"
            className="text-lg font-bold tracking-[0.25em] uppercase mb-6 text-brand-text"
          />
          <p className="leading-relaxed text-lg mb-6 font-light text-brand-text-muted">
            Infollion aggregates subject matter experts, independent consultants and freelancers to facilitate their
            access for short-term expertise to{" "}
            <span className="text-brand-primary font-medium">companies, consulting firms and investment funds</span>.
            Infollion offers flexible <span className="text-brand-primary font-medium">modes of engagement</span> to
            reach out to experts on its panel.
          </p>
          <p className="leading-relaxed text-lg font-light text-brand-text-muted">
            It ranges from a very short phone call to a few months long project based on pre-determined statement of
            work. The Panel can be accessed in 3 easy steps.
          </p>
        </div>

        <div
          className="reveal-right rounded-[40px] p-8 flex flex-col gap-6 shadow-2xl"
          style={{ background: "rgba(255,122,48,0.03)", border: "1px solid rgba(255,122,48,0.1)" }}
        >
          {[
            {
              title: "Expert Network",
              desc: "10,000+ verified experts across 150+ industries globally.",
              icon: <Globe className="text-brand-primary w-7 h-7" />,
            },
            {
              title: "AI Matching",
              desc: "Our algorithms match your brief to the right expert in under 48 hours.",
              icon: <Zap className="text-brand-primary w-7 h-7" />,
            },
            {
              title: "Compliant",
              desc: "GDPR-compliant processes, NDAs, and secure communications.",
              icon: <Shield className="text-brand-primary w-7 h-7" />,
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <div className="p-3 rounded-xl flex-shrink-0 bg-brand-primary/10">{item.icon}</div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider mb-1 text-brand-text">{item.title}</h4>
                <p className="text-sm leading-relaxed text-brand-text-muted">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollZoomWrapper>

      {/* ── STEPS SECTION (ANIMATED TIMELINE) ── */}
      <TimelineSteps />

      {/* ── MODES SECTION ── */}
      <ScrollZoomWrapper id="experts" className="mt-32 text-center relative px-10 lg:px-24">
        <div className="flex flex-col items-center mb-10">
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand-primary mb-3">
            Modes of Engagement
          </span>
          <div className="w-12 h-[1px] bg-brand-primary/30 mb-6" />
          <h2 className="text-base md:text-lg font-playfair italic text-brand-text leading-tight">
            How would you like to engage?
          </h2>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 py-6"
          style={{ perspective: "1500px" }}
        >
          {[
            { id: "calls", label: "Calls", icon: <Phone className="w-6 h-6" />, desc: "Expert consultations on precise agendas." },
            { id: "sit-ins", label: "Sit-ins", icon: <Users className="w-6 h-6" />, desc: "Private workshops & masterclasses." },
            { id: "tours", label: "Tours", icon: <Plane className="w-6 h-6" />, desc: "Field research & site visits." },
            { id: "paxpanel", label: "PAXPANEL", icon: <UserPlus className="w-6 h-6" />, desc: "On-demand expert team members." },
          ].map((item, i) => {
            const [localHover, setLocalHover] = useState(false);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, rotateY: -30, x: 50, z: -200 }}
                whileInView={{ opacity: 1, rotateY: 0, x: 0, z: 0 }}
                transition={{
                  duration: 1,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  rotateY: 10,
                  transition: { duration: 0.4 },
                }}
                onMouseEnter={() => setLocalHover(true)}
                onMouseLeave={() => setLocalHover(false)}
                className="relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                <MovingBorder isHovered={localHover} duration={3500} borderRadius="2rem">
                  <div className="group p-8 h-full rounded-[2rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10 backdrop-blur-xl shadow-lg transition-all duration-500 hover:shadow-[0_20px_40px_rgba(236,147,36,0.15)] hover:border-brand-primary/40 text-left relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div>
                      <div className="mb-6 text-brand-primary transition-transform group-hover:scale-110 group-hover:rotate-12 duration-500">
                        {item.icon}
                      </div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-brand-text mb-3">{item.label}</h4>
                      <p className="text-xs text-brand-text-muted leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ec9324] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                      Learn More <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </MovingBorder>
              </motion.div>
            );
          })}
        </div>
      </ScrollZoomWrapper>

      {/* ── USE CASES SECTION ── */}
      <ScrollZoomWrapper className="mt-32 text-center pb-32 px-10 lg:px-24 relative">
        {/* Orbital Dot from Image 1 */}
        <div className="absolute -top-12 left-10 lg:left-24 w-12 h-12 flex items-center justify-center pointer-events-none">
          <div className="w-2 h-2 bg-[#ec9324] rounded-full relative z-10 shadow-[0_0_15px_rgba(236,147,36,1)]" />
          <div className="absolute inset-0 border border-[#ec9324]/40 rounded-full animate-ping scale-75" />
          <div className="absolute inset-0 border border-[#ec9324]/20 rounded-full scale-125" />
          <div className="absolute inset-0 bg-[#ec9324]/5 rounded-full blur-xl scale-150" />
        </div>

        <h2 className="reveal text-lg md:text-xl font-black tracking-[0.2em] uppercase mb-6 flex justify-center gap-3 md:gap-5">
          <span className="text-[var(--text)]">SAMPLE</span>
          <span className="text-[#ec9324]">USE-CASES</span>
        </h2>
        <div className="reveal w-20 h-[3px] mx-auto mb-24 bg-[#ec9324]" />

        <div
          className="flex flex-col md:flex-row justify-center items-center gap-12 lg:gap-16"
          style={{ perspective: "1500px" }}
        >
          {useCases.map((item, i) => {
            const [localHover, setLocalHover] = useState(false);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, rotateX: 60, y: 150, z: -500, scale: 0.8 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0, z: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col items-center group cursor-pointer"
                onClick={() => router.push(`/use-case#${item.id}`)}
                onMouseEnter={() => setLocalHover(true)}
                onMouseLeave={() => setLocalHover(false)}
              >
                <motion.div
                  className="relative"
                  whileHover={{
                    y: -10,
                    rotateX: 10,
                    scale: 1.05,
                  }}
                >
                  <MovingBorder isHovered={localHover} duration={3500} borderRadius="2rem">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] bg-[#1a1a1a] dark:bg-[var(--card-bg)] border border-black/5 dark:border-[var(--border)] flex items-center justify-center shadow-2xl transition-all duration-500 overflow-hidden group-hover:border-[#ec9324]/50 group-hover:shadow-[0_20px_40px_-10px_rgba(236,147,36,0.3)]">
                      <div className="transition-transform duration-500 group-hover:scale-110">{item.icon}</div>
                    </div>
                  </MovingBorder>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] group-hover:text-[#ec9324] transition-colors duration-500 mt-8"
                >
                  {item.title}
                </motion.h3>
              </motion.div>
            );
          })}
        </div>
      </ScrollZoomWrapper>
    </div>
  );
}
