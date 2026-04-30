"use client";
import { Inter, Space_Mono, Syne } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import ScrollAnimations from "@/components/ScrollAnimations";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Linkedin, Twitter, ChevronDown, Sun, Moon } from "lucide-react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-space-mono" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Modes of Engagement", href: "/engagement-mode" },
  { label: "Use Case", href: "/use-case" },
  { label: "Login/Signup", href: "#" },
];

import { ThemeScript } from "./ThemeScript";
import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Sync state with what ThemeScript did
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const [isNavigating, setIsNavigating] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Manual navigation handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "/engagement-mode" || href === "/use-case") {
      e.preventDefault();
      window.location.href = href;
    }
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler(); // Check on mount
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${inter.variable} ${spaceMono.variable} ${syne.variable} font-sans transition-colors duration-400`} style={{ background: "var(--bg)", color: "var(--text)" }}>
        <div className="min-h-screen overflow-x-hidden">
          <CustomCursor />


          {/* ── Floating Pill Navbar ── */}
          <div className="fixed top-5 left-0 w-full z-[200] flex justify-center px-4">
            <nav
              className={`nav-pill relative flex items-center gap-1 px-6 rounded-full transition-all duration-500 ${
                scrolled 
                  ? "shadow-2xl bg-brand-bg/80 border border-black/10 backdrop-blur-md py-0.5" 
                  : "bg-transparent border-transparent backdrop-blur-none shadow-none py-1 mt-2"
              }`}
              style={{ maxWidth: 840, width: "100%" }}
            >
              {/* Logo */}
              <Link href="/" onClick={(e) => handleNavClick(e, "/")} className="flex items-center mr-6 flex-shrink-0 relative z-10">
                <Image
                  src="/images/logo_hd.png"
                  alt="Infollion"
                  width={110}
                  height={32}
                  className="object-contain"
                  style={{ transition: "filter 0.4s" }}
                  priority
                />
              </Link>

              {/* Links */}
              <div className="flex items-center gap-2 flex-1 justify-center relative z-10">
                {NAV_LINKS.map((l, i) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={(e) => handleNavClick(e, l.href)}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 relative group flex items-center justify-center min-w-[80px]"
                    style={{
                      color: hoveredIndex === i ? "#ec9324" : "var(--text-muted)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span className="relative z-10">{l.label}</span>
                    
                    <AnimatePresence>
                      {hoveredIndex === i && (
                        <div className="absolute inset-x-0 -top-2 flex flex-col items-center pointer-events-none">
                          <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "100%", opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            className="h-[2px] bg-[#ec9324] shadow-[0_0_20px_rgba(255,122,48,1)]"
                          />
                          <motion.div
                            initial={{ opacity: 0, scale: 0.6, y: -5 }}
                            animate={{ opacity: 1, scale: 1.2, y: 0 }}
                            exit={{ opacity: 0, scale: 0.6, y: -5 }}
                            className="w-[150%] h-24 -mt-[1px]"
                            style={{
                              background: "radial-gradient(50% 50% at 50% 0%, rgba(255,122,48,0.6) 0%, transparent 100%)",
                              filter: "blur(12px)",
                              clipPath: "inset(0px -100px -100px -100px)",
                            }}
                          />
                        </div>
                      )}
                    </AnimatePresence>
                  </Link>
                ))}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                onMouseEnter={() => setHoveredIndex(null)}
                aria-label="Toggle theme"
                className="ml-2 flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all relative z-10"
                style={{
                  background: dark ? "rgba(255,122,48,0.15)" : "rgba(0,0,0,0.06)",
                  color: dark ? "#ec9324" : "var(--text-muted)",
                }}
              >
                {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </nav>
          </div>

          <ScrollAnimations />

          {/* Global Background Wash (Light Mode) */}
          <div 
            className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700 dark:opacity-0"
            style={{ 
              background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,122,48,0.12) 0%, transparent 100%)" 
            }}
          />

          {/* Global Background Wash (Dark Mode: Nerova style animated blobs) */}
          <div className="fixed inset-0 pointer-events-none z-0 opacity-0 dark:opacity-100 transition-opacity duration-1000 overflow-hidden flex items-center justify-center">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#ec9324] mix-blend-screen filter blur-[150px] opacity-10 animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#ec9324] mix-blend-screen filter blur-[150px] opacity-[0.07] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
          </div>

          {/* Nerova Cinematic Noise Overlay */}
          <div 
            className="fixed inset-0 pointer-events-none z-[100] opacity-0 dark:opacity-[0.06] mix-blend-overlay transition-opacity duration-700" 
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }} 
          />

          <main className="relative z-10 w-full pt-28 pb-8 page-enter">
            {children}
          </main>

          {/* FOOTER */}
          <footer
            className="relative z-50 pt-10 pb-6 bg-[var(--bg2)] border-t border-[var(--border)] transition-colors duration-500 overflow-hidden"
          >
            <motion.div 
              initial={{ y: 100, opacity: 0, scale: 0.96 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "0px 0px -5% 0px" }}
              className="max-w-7xl mx-auto px-8 text-[var(--text)] transition-colors duration-500"
            >
              <h2 id="contact" className="reveal text-2xl font-bold tracking-[0.5em] text-[var(--text)] text-center uppercase mb-3">
                Get In Touch
              </h2>
              <div className="reveal stagger-1 w-20 h-1 mx-auto mb-10" style={{ background: "#ec9324" }} />

              <div className="grid lg:grid-cols-12 gap-16">
                {/* Info */}
                <div className="lg:col-span-4 space-y-8">
                  <Link href="/">
                    <Image src="/images/logo_hd.png" alt="Infollion" width={130} height={38}
                      className="object-contain" style={{ transition: "filter 0.4s" }} />
                  </Link>
                  <div className="space-y-5">
                    <div className="flex gap-4 items-start text-[var(--text-muted)] text-sm transition-colors duration-500">
                      <MapPin className="w-5 h-5 flex-shrink-0" style={{ color: "#ec9324" }} />
                      <p>5th Floor, Tower C, Unitech Cyberpark, Sector 39, Gurgaon, Haryana, India 122002</p>
                    </div>
                    <div className="flex gap-4 items-center text-[var(--text-muted)] text-sm transition-colors duration-500">
                      <Phone className="w-5 h-5 flex-shrink-0" style={{ color: "#ec9324" }} />
                      <p>+91 (124) 427-2967</p>
                    </div>
                    <div className="flex gap-4 items-center text-[var(--text-muted)] text-sm transition-colors duration-500">
                      <Mail className="w-5 h-5 flex-shrink-0" style={{ color: "#ec9324" }} />
                      <p>support@infollion.com</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[var(--text-faint)] mb-4 font-bold transition-colors duration-500">Follow Us</p>
                    <div className="flex gap-4">
                      <a href="#" className="w-9 h-9 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] flex items-center justify-center hover:text-[#ec9324] transition-all text-[var(--text)] hover:border-[#ec9324]/50">
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a href="#" className="w-9 h-9 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] flex items-center justify-center hover:text-[#ec9324] transition-all text-[var(--text)] hover:border-[#ec9324]/50">
                        <Twitter className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="lg:col-span-2">
                  <h3 className="text-xs font-bold tracking-[0.2em] text-[var(--text)] uppercase mb-8 transition-colors duration-500">Quick Links</h3>
                  <ul className="space-y-4 text-xs font-semibold text-[var(--text-muted)] tracking-widest uppercase transition-colors duration-500">
                    <li><Link href="/" className="hover:text-[#ec9324] transition-colors">Home</Link></li>
                    <li><a href="#" className="hover:text-[#ec9324] transition-colors">Expert Calls</a></li>
                    <li><a href="#" className="hover:text-[#ec9324] transition-colors">Knowledge Tours</a></li>
                    <li><a href="#" className="hover:text-[#ec9324] transition-colors">PexPanel</a></li>
                  </ul>
                </div>

                {/* Form */}
                <div className="lg:col-span-6 space-y-6">
                  <h3 className="text-xs font-bold tracking-[0.3em] text-[var(--text)] uppercase opacity-80 transition-colors duration-500">Send a Query</h3>
                  <div className="grid grid-cols-2 gap-4 text-[var(--text)]">
                    {["Your Name", "E-mail", "Mobile No", "Company Name"].map((ph) => (
                      <input
                        key={ph}
                        placeholder={ph}
                        className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-5 py-3 text-[13px] outline-none transition-all placeholder:text-[var(--text-faint)] focus:border-[#ec9324]"
                      />
                    ))}
                    <div className="col-span-2 relative">
                      <select
                        className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-5 py-3 text-[13px] outline-none transition-all text-[var(--text-muted)] appearance-none focus:border-[#ec9324]"
                      >
                        <option>Select Keywords</option>
                        <option>Expert Consultation</option>
                        <option>PexPanel Subscription</option>
                        <option>Knowledge Tours</option>
                        <option>Sit-Ins / Masterclass</option>
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-faint)] pointer-events-none" />
                    </div>
                    <textarea
                      placeholder="Your Message..."
                      rows={3}
                      className="col-span-2 bg-[var(--bg)] border border-[var(--border)] rounded-xl px-5 py-3 text-[13px] outline-none transition-all placeholder:text-[var(--text-faint)] resize-none focus:border-[#ec9324]"
                    />
                    <div className="col-span-2">
                      <button
                        className="mt-2 px-12 py-3 text-[13px] font-black uppercase tracking-[0.2em] rounded-xl transition-all"
                        style={{ background: "#ec9324", color: "#fff", boxShadow: "0 12px 30px -8px rgba(255,122,48,0.4)" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1.04)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
                      >
                        Submit Query
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center text-[10px] text-[var(--text-faint)] font-bold uppercase tracking-widest gap-4 transition-colors duration-500">
                <p>© Infollion — On-Demand Experts.</p>
                <div className="flex gap-6">
                  <a href="#" className="hover:text-[#ec9324] transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-[#ec9324] transition-colors">Expert Agreement</a>
                  <a href="#" className="hover:text-[#ec9324] transition-colors">Contact Us</a>
                </div>
              </div>
            </motion.div>
          </footer>
        </div>
      </body>
    </html>
  );
}
