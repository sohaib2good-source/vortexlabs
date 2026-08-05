import React, { useEffect, useState, ReactNode } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import {
  ArrowUpRight,
  PenTool,
  Video,
  MapPin,
  Smartphone,
  Monitor,
  LineChart,
  Database,
  Globe,
  Settings
} from 'lucide-react';

const FadeIn = ({ children, delay = 0, className = "" }: { children: ReactNode, delay?: number, className?: string, key?: React.Key | string | number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

type Project = { name: string; url: string; desc?: string; };
type Venture = { num: string; name: string; desc: string; tags: string[]; projects?: Project[]; };

const VENTURES_LIST: Venture[] = [
  { num: '01', name: 'VORTEX PICTURES', desc: 'Cinematic video for brands and IP.', tags: ['Film', 'Brand', 'Doc'] },
  { 
    num: '02', 
    name: 'VORTEX WEB', 
    desc: 'Websites that lead industries.', 
    tags: ['Design', 'Dev', 'CMS'], 
    projects: [
      { 
        name: 'Ocean Yacht Registration', 
        url: 'https://oceanyachtregistration.com/',
        desc: 'A streamlined web application that collects client registration details and automatically delivers the submissions via email.'
      },
      {
        name: 'Collexis',
        url: 'https://collexis.shop',
        desc: 'A platform where enthusiasts can showcase their collections, list items for sale, and start discussions. Primarily features shoes, diecast cars, and watches.'
      },
      {
        name: 'Himalayan Heritage',
        url: 'https://himalayanheritage.company',
        desc: 'Designed and developed a feature-rich marketplace website that empowers customers to publish, edit, and manage their own product listings while providing buyers with a seamless browsing experience.'
      }
    ]
  },
  { 
    num: '03', 
    name: 'VORTEX APPS', 
    desc: 'Products that earn retention.', 
    tags: ['iOS', 'Android', 'SaaS'],
    projects: [
      {
        name: 'POS Vortex',
        url: 'https://posvortex.com/',
        desc: 'A robust POS system tailored for small to medium-sized restaurants and retail stores to easily manage inventory and kitchen operations.'
      }
    ]
  }
];

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };

    // Default hiding of native cursor
    document.body.style.cursor = 'none';

    // Ensure interactive elements hide native cursor & use custom one
    const styleLinks = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], summary');
      interactiveElements.forEach((el) => {
        (el as HTMLElement).style.cursor = 'none';
      });
    };

    window.addEventListener('mousemove', moveCursor);
    styleLinks();

    // Re-run styler occasionally to catch dynamically added interactive elements
    const interval = setInterval(styleLinks, 1000);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      clearInterval(interval);
      document.body.style.cursor = 'auto';
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-[100] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none z-[100] hidden md:block"
        style={{
          x: useTransform(mouseX, x => x + 13),
          y: useTransform(mouseY, y => y + 13),
        }}
      />
    </>
  );
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-background font-sans">
      <CustomCursor />
      {/* 2. NAVIGATION */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#080808]/80 backdrop-blur-md border-b border-white/[0.06]' : 'bg-transparent'}`}>
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="font-sans font-bold tracking-tight text-xl uppercase">Vortex</span>
            <span className="font-sans font-light text-xl uppercase text-foreground/70">Labs</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['About', 'Ventures', 'Work', 'Process', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[0.7rem] tracking-[0.12em] uppercase text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <button className="bg-primary hover:bg-primary/90 text-background px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200">
            Start a Project
          </button>
        </div>
      </nav>

      <main>
        {/* 3. HERO SECTION */}
        <section aria-label="Introduction to Vortex Labs" className="relative min-h-screen flex items-center pt-20 overflow-hidden border-b border-white/[0.06]">
          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

          <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="col-span-1 lg:col-span-8 flex flex-col justify-center">
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="font-mono text-primary text-sm uppercase tracking-widest mb-6"
                >
                  The Parent Company
                </motion.div>

                <h1 className="font-serif text-5xl md:text-7xl lg:text-[9vw] leading-[0.95] tracking-tight">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                  >
                    BEHIND TOMORROW'S
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="text-transparent"
                    style={{ WebkitTextStroke: '1.5px #F0EDE8' }}
                  >
                    DIGITAL VENTURES.
                  </motion.div>
                </h1>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="mt-10 max-w-xl text-muted-foreground text-lg leading-relaxed"
              >
                Vortex Labs is the holding entity behind three focused studios in video, web, and apps. We don't chase trends. We build infrastructure for ideas that last.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="mt-12 flex flex-wrap items-center gap-6"
              >
                <a href="#ventures" className="bg-primary text-background px-8 py-4 rounded-full text-sm font-semibold tracking-wide uppercase hover:bg-primary/90 transition-colors">
                  Explore Ventures
                </a>
              </motion.div>
            </div>

            <div className="hidden lg:flex col-span-4 flex-col items-end justify-center h-full relative" aria-hidden="true">
              <div className="font-mono text-[20vw] leading-none text-white/[0.03] absolute -top-20 -right-10 select-none">
                03
              </div>
              <div className="space-y-4 font-mono text-sm tracking-wider text-muted-foreground relative z-10 z-[2]">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0, duration: 0.6 }}>— Video</motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1, duration: 0.6 }}>— Web</motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 0.6 }}>— Apps</motion.div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="absolute bottom-0 left-0 w-full border-t border-white/[0.06] bg-background/50 backdrop-blur-sm hidden md:block"
            aria-hidden="true"
          >
            <div className="max-w-[1400px] mx-auto px-6 h-16 grid grid-cols-4 items-center">
              <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest border-r border-white/[0.06] h-full flex items-center pr-6">"12+" Projects</div>
              <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest border-r border-white/[0.06] h-full flex items-center px-6">"3" Ventures</div>
              <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest border-r border-white/[0.06] h-full flex items-center px-6">"100%" Craft</div>
              <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest h-full flex items-center pl-6">"01" Vision</div>
            </div>
          </motion.div>
        </section>

        {/* 4. VENTURES SECTION */}
        <section id="ventures" aria-label="Our Digital Ventures" className="py-32 border-b border-white/[0.06] relative">
          <div className="font-mono text-[40vw] leading-none text-white/[0.015] absolute top-1/2 left-0 -translate-y-1/2 select-none pointer-events-none" aria-hidden="true">
            02
          </div>

          <div className="max-w-[1400px] mx-auto relative z-10">
            <FadeIn className="px-6 mb-20">
              <h2 className="font-serif text-5xl tracking-tight">Our Ventures</h2>
            </FadeIn>

            <div className="flex flex-col border-t border-white/[0.06]">
              {VENTURES_LIST.map((v, i) => (
                <FadeIn key={v.num} delay={i * 0.1}>
                  <div className="group border-b border-white/[0.06] hover:bg-surface transition-colors relative">
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>

                    <div className="px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-4">

                      {/* Number */}
                      <div className="font-mono text-muted-foreground text-sm w-16 shrink-0" aria-hidden="true">
                        {v.num}
                      </div>

                      {/* Name & Desc */}
                      <div className="flex-1 max-w-2xl">
                        <h3 className="font-sans text-2xl md:text-3xl font-medium tracking-tight mb-2 text-primary transition-colors">{v.name}</h3>
                        <p className="text-muted-foreground">{v.desc}</p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 w-full md:w-auto" aria-label={`Tags for ${v.name}`}>
                        {v.tags.map(tag => (
                          <span key={tag} className="font-mono text-xs px-3 py-1 bg-white/5 rounded-full text-foreground/80 border border-white/[0.06]">
                            [{tag}]
                          </span>
                        ))}
                      </div>

                      {/* Arrow */}
                      <div className="hidden md:flex w-16 justify-end text-muted-foreground group-hover:text-primary transform group-hover:translate-x-2 transition-all">
                        <ArrowUpRight size={28} strokeWidth={1} aria-hidden="true" />
                      </div>
                    </div>

                    {/* Projects List */}
                    {v.projects && v.projects.length > 0 && (
                      <div className="px-6 pb-12 md:pl-[88px] flex flex-col gap-6">
                        {v.projects.map((proj, pIdx) => (
                          <div key={pIdx} className="flex flex-col gap-3">
                            <a 
                              href={proj.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="font-sans text-lg text-primary hover:text-primary/80 transition-colors flex items-center gap-3 w-fit group/link"
                            >
                              <span className="w-1.5 h-1.5 bg-primary rounded-full group-hover/link:scale-125 transition-all"></span>
                              {proj.name}
                            </a>
                            {proj.desc && (
                              <div className="pl-5 ml-[3px] border-l border-white/5">
                                <p className="text-sm text-white/90 max-w-xl leading-relaxed">
                                  {proj.desc}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 5. ABOUT / PHILOSOPHY */}
        <section id="about" aria-label="Company Philosophy" className="py-32 border-b border-white/[0.06] bg-[#0A0A0B]">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <FadeIn>
                <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-8 leading-[1.1]">One house. Three crafts. Zero compromise.</h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                  <p>
                    Most agencies try to do everything, ultimately mastering nothing. We built Vortex Labs differently.
                    We are a parent company that operates completely dedicated, highly focused ventures for video, web, and product development.
                  </p>
                  <p>
                    Each venture consists of specialists obsessed with their specific medium, underpinned by the shared infrastructure,
                    financial stability, and visionary standards of the Vortex parent brand.
                  </p>
                  <p>
                    This is how we guarantee Fortune 500 quality without the friction of traditional conglomerate bloat.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.2} className="flex items-center">
                <blockquote className="pl-8 border-l border-primary py-4">
                  <p className="font-serif text-2xl md:text-3xl leading-snug text-foreground/90 italic mb-6">
                    "The best work comes from studios obsessed with one thing. Vortex Labs gives each venture that focus — while providing the infrastructure, identity, and ambition of a single, unified company."
                  </p>
                  <footer className="font-mono text-sm text-primary uppercase tracking-wider">
                    — Vortex Labs, Founding Philosophy
                  </footer>
                </blockquote>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 6. CAPABILITIES GRID */}
        <section id="work" aria-label="Our Capabilities" className="py-32 border-b border-white/[0.06]">
          <div className="max-w-[1400px] mx-auto px-6">
            <FadeIn className="mb-20">
              <h2 className="font-serif text-5xl tracking-tight">What We Bring</h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/[0.06]">
              {[
                { i: Globe, t: 'Creative Direction', d: 'Guiding multi-platform brand aesthetics.' },
                { i: Video, t: 'Cinematic Production', d: 'High-end commercial and documentary film.' },
                { i: PenTool, t: 'Brand Strategy', d: 'Positioning, narrative, and market entry.' },
                { i: Monitor, t: 'UI/UX Design', d: 'Interfaces that balance beauty and conversion.' },
                { i: Database, t: 'Full-Stack Development', d: 'Robust architectures for modern web apps.' },
                { i: Smartphone, t: 'Mobile Engineering', d: 'Native-feel products for iOS and Android.' },
                { i: LineChart, t: 'SEO & Performance', d: 'Technical optimization for visibility.' },
                { i: Settings, t: 'Content Systems', d: 'Headless CMS and scalable data models.' },
                { i: MapPin, t: 'Growth Architecture', d: 'Systems designed for scaling user bases.' }
              ].map((cap, i) => (
                <FadeIn key={i} delay={i * 0.05} className="border-b border-r border-white/[0.06] p-10 hover:bg-white/[0.02] transition-colors">
                  <cap.i className="text-muted-foreground mb-8" size={24} strokeWidth={1} aria-hidden="true" />
                  <h3 className="font-sans text-xl font-medium mb-3">{cap.t}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{cap.d}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 7. PROCESS SECTION */}
        <section id="process" aria-label="Operating Process" className="py-32 border-b border-white/[0.06] relative overflow-hidden">
          <div className="font-mono text-[30vw] leading-none text-white/[0.015] absolute -bottom-10 right-0 select-none pointer-events-none" aria-hidden="true">
            04
          </div>

          <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            <FadeIn className="mb-24">
              <h2 className="font-serif text-5xl tracking-tight">How We Operate</h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { n: '01', s: 'DISCOVER', d: 'We dissect your brand, market positioning, and technical requirements.' },
                { n: '02', s: 'DEFINE', d: 'We construct the blueprint. Rigid planning enables creative freedom.' },
                { n: '03', s: 'BUILD', d: 'The specific venture executes the work with zero distractions.' },
                { n: '04', s: 'LAUNCH', d: 'We deploy the asset and ensure the infrastructure hums.' }
              ].map((step, i) => (
                <FadeIn key={step.n} delay={i * 0.1} className="relative pt-8 md:pt-0">
                  <div className="hidden md:block absolute top-6 left-0 w-full h-[1px] bg-white/[0.06]" aria-hidden="true"></div>
                  <div className="hidden md:block absolute top-6 left-0 w-0 h-[1px] bg-primary transition-all duration-700 delay-300" style={{ width: scrolled ? '100%' : '0%' }} aria-hidden="true"></div>

                  <div className="font-mono text-7xl font-light text-white/[0.03] absolute -top-4 -left-4 select-none" aria-hidden="true">{step.n}</div>

                  <div className="relative z-10 mt-12 md:mt-16">
                    <h3 className="font-sans font-bold tracking-widest text-sm uppercase mb-4 text-foreground/90">{step.s}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-[250px]">{step.d}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 8. FAQ SECTION */}
        <section aria-label="Frequently Asked Questions" className="py-32 border-b border-white/[0.06]">
          <div className="max-w-[800px] mx-auto px-6">
            <FadeIn className="mb-16 text-center">
              <h2 className="font-serif text-4xl tracking-tight">Common Questions</h2>
            </FadeIn>

            <div className="space-y-0 border-t border-white/[0.06]">
              {[
                { q: 'What is Vortex Labs?', a: 'Vortex Labs is a creative technology holding company that operates three focused ventures: Vortex Pictures (video production), Vortex Web (website design and development), and Vortex Apps (mobile and web application development).' },
                { q: 'What services does Vortex Labs offer?', a: 'We offer end-to-end cinematic video production, premium website design and engineering, and native mobile/web app development. Each service is handled by its dedicated venture under the Vortex Labs umbrella.' },
                { q: 'How does the multi-venture model work?', a: 'Instead of operating as a monolithic agency where resources are shared haphazardly, each venture is a self-contained team of specialists. They share the same high standards and administrative backbone but execute only in their chosen medium.' },
                { q: 'Who are Vortex Labs\' typical clients?', a: 'We work with a spectrum of clients from ambitious, well-funded startups to established Fortune 500 enterprises. We select our projects based on creative alignment, technical complexity, and mutual ambition.' },
                { q: 'How can I start a project with Vortex Labs?', a: 'You can initiate a discussion via info@vortexlabsworld.com. We will quickly assess your needs and route you to the appropriate venture leader for a discovery call.' },
                { q: 'Does Vortex Labs take on international projects?', a: 'Yes. While we are headquartered centrally, our ventures operate globally, serving clients across North America, Europe, and Asia.' }
              ].map((faq, i) => (
                <FadeIn key={i} delay={0.1}>
                  <details className="group border-b border-white/[0.06] [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between cursor-pointer py-6 font-medium text-lg hover:text-primary transition-colors">
                      {faq.q}
                      <span className="relative ml-4 shrink-0 transition duration-300 group-open:-rotate-180" aria-hidden="true">
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </summary>
                    <div className="pb-6 text-muted-foreground leading-relaxed pr-8">
                      <p>{faq.a}</p>
                    </div>
                  </details>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 9. CTA SECTION */}
        <section id="contact" aria-label="Contact and Next Steps" className="py-32 bg-surface text-center px-6">
          <div className="max-w-[800px] mx-auto">
            <FadeIn>
              <h2 className="font-serif text-5xl md:text-6xl tracking-tight mb-6">Let's Build Something Real.</h2>
              <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
                One conversation. We'll know within minutes which venture is right for your project.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
                <button className="bg-primary hover:bg-primary/90 text-background px-10 py-5 rounded-full text-sm font-semibold tracking-wide uppercase transition-all duration-200">
                  Start a Project
                </button>
                <div className="h-px w-10 bg-white/10 sm:h-10 sm:w-px"></div>
                <a href="mailto:info@vortexlabsworld.com" className="font-mono text-lg text-foreground hover:text-primary transition-colors relative group">
                  info@vortexlabsworld.com
                  <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              </div>

              <div className="mt-16 font-mono text-xs text-muted-foreground uppercase tracking-wider">
                We respond within 24 hours. Global inquiries welcome.
              </div>
            </FadeIn>
          </div>
        </section>

      </main>

      {/* 10. FOOTER */}
      <footer className="border-t border-white/[0.06] bg-background pt-20 pb-10 px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-20">

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-1">
              <span className="font-sans font-bold tracking-tight text-2xl uppercase">Vortex</span>
              <span className="font-sans font-light text-2xl uppercase text-foreground/70">Labs</span>
            </div>
            <p className="text-muted-foreground uppercase tracking-widest text-xs font-mono">
              One Vision. Every Medium.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-2">Company</span>
            {['About', 'Ventures', 'Process', 'Contact', 'Privacy Policy'].map(link => (
              <a key={link} href={link === 'Privacy Policy' ? '#' : `#${link.toLowerCase()}`} className="w-fit text-sm text-foreground/80 hover:text-primary transition-colors">
                {link}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <span className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-2 md:text-right">Connect</span>
            <div className="flex gap-6">
              {['Twitter', 'LinkedIn', 'Instagram', 'Behance'].map(social => (
                <a key={social} href="#" className="text-sm text-foreground/80 hover:text-primary transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/[0.06] font-mono text-xs text-muted-foreground uppercase tracking-widest">
          <p>© 2025 Vortex Labs. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Made with precision.</p>
        </div>
      </footer>
    </div>
  );
}
