const { useState, useEffect, useRef } = React;

/* ============================================================
   SITE CONFIG — edit company details here
   NOTE: the business card address is partially unclear in the
   supplied image. Confirm the unit number and postal code with
   the client, then update ADDRESS_LINES below.
   ============================================================ */
const COMPANY = "STARLIVE ENGINEERING PTE LTD";
const DIRECTOR = "SUBRAMANIAM";
const PHONE_DISPLAY = "+65 9765 8724";
const PHONE_TEL = "+6597658724";
// TODO: confirm with the client that this number is registered on WhatsApp before launch.
// Digits only, country code, no plus sign, no spaces — e.g. "6597658724".
const WHATSAPP_NUMBER = "6597658724";
// NOTE: the brief gives Starlivengg@gmail.com; the business card image looks like
// "Starlivengg@gmail.com". Confirm with the client and correct this one line if needed.
const EMAIL = "Starlivengg@gmail.com";
const ADDRESS_LINES = [
  "No 18 Boon Lay Way #10-140,Tradehub 21",
  "Singapore 609966",
];

/* ---------------- Icons (inline SVG, lucide-style) ---------------- */
const PATHS = {
  radar: '<path d="M19.07 4.93A10 10 0 0 0 6.99 3.34"/><path d="M4 6h.01"/><path d="M2.29 9.62A10 10 0 1 0 21.31 8.35"/><path d="M16.24 7.76A6 6 0 1 0 8.23 16.67"/><path d="M12 18h.01"/><path d="M17.99 11.66A6 6 0 0 1 15.77 16.67"/><circle cx="12" cy="12" r="2"/><path d="m13.41 10.59 5.66-5.66"/>',
  route: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
  ruler: '<path d="M21.3 8.7 8.7 21.3a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4Z"/><path d="m7.5 10.5 2 2"/><path d="m10.5 7.5 2 2"/><path d="m13.5 4.5 2 2"/><path d="m4.5 13.5 2 2"/>',
  droplet: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7z"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  message: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/>',
  compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92"/>',
  whatsapp: '<path d="M3 21l1.65-4.95A9 9 0 1 1 12 21a8.96 8.96 0 0 1-4.5-1.2z"/><path d="M8.5 8.5c0-.5.5-1.5 1-1.5s1 .1 1.2.5c.2.4.7 1.7.8 1.9.1.2.1.4 0 .6-.1.2-.2.3-.4.5s-.4.4-.5.6c-.1.2-.3.4-.1.8.2.4.9 1.5 2 2.4 1.4 1.2 2.5 1.5 2.9 1.7.4.2.6.1.8-.1.2-.2.9-1 1.1-1.4.2-.4.4-.3.7-.2.3.1 1.9.9 2.2 1 .3.2.5.2.6.4.1.2.1 1-.3 1.9-.4.9-2 1.7-2.8 1.8-.7.1-1.6.1-2.6-.2-.6-.2-1.4-.4-2.3-.9-4-1.9-6.6-5.9-6.8-6.2-.2-.3-1.6-2.1-1.6-4s1-2.8 1.4-3.2"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  building: '<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/>',
  hardhat: '<path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15a8 8 0 0 1 16 0"/>',
  layers: '<path d="m12.83 2.18 8.34 4.17a1 1 0 0 1 0 1.79l-8.34 4.17a2 2 0 0 1-1.66 0L2.83 8.14a1 1 0 0 1 0-1.79l8.34-4.17a2 2 0 0 1 1.66 0"/><path d="m2.83 12.14 8.34 4.17a2 2 0 0 0 1.66 0l8.34-4.17"/><path d="m2.83 16.14 8.34 4.17a2 2 0 0 0 1.66 0l8.34-4.17"/>',
  home: '<path d="M3 10.2 12 3l9 7.2V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>'
};
function Icon({ name, className = "w-6 h-6", stroke = 1.6 }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
         dangerouslySetInnerHTML={{ __html: PATHS[name] }} />
  );
}

/* ---------------- Scroll reveal ---------------- */
/* variant: "up" (default) | "left" | "right" | "scale" | "fade" */
function Reveal({ children, className = "", delay = 0, variant = "up", as: Tag = "div" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // No IntersectionObserver (or reduced motion): show immediately.
    if (typeof IntersectionObserver === "undefined" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          el.style.transitionDelay = delay + "ms";
          el.classList.add("is-in");
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  const variantCls = variant === "up" ? "" : " reveal-" + variant;
  return <Tag ref={ref} className={"reveal" + variantCls + " " + className}>{children}</Tag>;
}

/* ---------------- Shared bits ---------------- */
function SectionHead({ kicker, title, intro, light = false, center = false }) {
  return (
    <div className={(center ? "text-center mx-auto " : "") + "max-w-2xl"}>
      {kicker && (
        <div className={"flex items-center gap-3 mb-4 " + (center ? "justify-center" : "")}>
          <span className="h-px w-8 bg-brand-green" />
          <span className={"text-sm font-semibold tracking-wide " + (light ? "text-brand-green" : "text-brand-green700")}>{kicker}</span>
        </div>
      )}
      <h2 className={"font-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.12] font-700 " + (light ? "text-white" : "text-navy")}
          style={{ fontWeight: 700 }}>{title}</h2>
      {intro && <p className={"mt-5 text-[1.03rem] leading-relaxed " + (light ? "text-white/75" : "text-steel")}>{intro}</p>}
    </div>
  );
}

function Logo({ light = false }) {
  return (
    <a href="#home" className="flex items-center gap-3 group" aria-label={COMPANY + " — home"}>
      <span className="relative inline-flex items-center justify-center w-11 h-11 shrink-0">
        <svg viewBox="0 0 48 48" className="w-11 h-11" aria-hidden="true">
          <circle cx="24" cy="24" r="22" fill="none" stroke="#1F4E9C" strokeWidth="1.2" opacity=".55" />
          <circle cx="24" cy="24" r="15" fill="none" stroke="#1F4E9C" strokeWidth="1.2" opacity=".35" />
          <path d="M24 5.5l5.5 4.5H18.5z" fill="#1F4E9C" />
          <path d="M22 11h4l-2 4z" fill="#3EA845" />
          <rect x="10" y="20" width="12" height="5" rx="1" fill="#3EA845" />
          <rect x="26" y="20" width="12" height="5" rx="1" fill="#1F4E9C" />
          <rect x="17" y="27" width="16" height="5" rx="1" fill="#3EA845" />
          <rect x="10" y="27" width="5" height="5" rx="1" fill="#1F4E9C" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className={"block font-display font-extrabold tracking-tight text-[0.98rem] sm:text-[1.05rem] " + (light ? "text-white" : "text-navy")}>
          STARLIVE ENGINEERING
        </span>
        <span className={"block text-[0.68rem] font-semibold tracking-[0.22em] " + (light ? "text-brand-green" : "text-brand-green700")}>
          PTE LTD
        </span>
      </span>
    </a>
  );
}

/* ---------------- Navbar ---------------- */
const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Why Choose Us", href: "#why" },
  { label: "Contact", href: "#contact" }
];

function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  return (
    <header className={"nav-shell fixed top-0 inset-x-0 z-50 backdrop-blur-[2px] " +
      (solid || open ? "bg-white/95 backdrop-blur border-b border-navy/10 shadow-[0_1px_20px_rgba(12,35,64,.07)]" : "bg-white/0 border-b border-white/10")}>
      <nav className={"nav-bar max-w-content mx-auto px-5 lg:px-8 flex items-center justify-between " +
        (solid && !open ? "h-[64px]" : "h-[74px]")} aria-label="Main">
        <span className={"nav-logo inline-flex" + (solid && !open ? " is-compact" : "")}>
          <Logo light={!solid && !open} />
        </span>
        <ul className="hidden lg:flex items-center gap-8">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href}
                 className={"relative text-[0.95rem] font-medium transition-colors py-2 " +
                   (solid ? "text-navy hover:text-brand-blue" : "text-white/85 hover:text-white") +
                   " after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-brand-green" +
                   " after:transition-[width] after:duration-300 after:ease-out hover:after:w-full"}>
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden lg:flex items-center gap-4">
          <a href={"tel:" + PHONE_TEL}
             className={"flex items-center gap-2 text-sm font-semibold " + (solid ? "text-navy" : "text-white")}>
            <Icon name="phone" className="w-4 h-4" /> {PHONE_DISPLAY}
          </a>
          <a href="#contact"
             className="cta-btn inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green700 text-white font-semibold text-sm px-5 py-3 rounded-sm">
            Request a quote
          </a>
        </div>
        <button onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}
                className={"lg:hidden p-2 -mr-2 " + (solid || open ? "text-navy" : "text-white")}>
          <Icon name={open ? "close" : "menu"} className="w-7 h-7" />
        </button>
      </nav>
      {open && (
        <div className="nav-drop lg:hidden bg-white border-t border-navy/10 px-5 pb-7 pt-3">
          <ul className="flex flex-col">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)}
                   className="block py-3.5 text-navy font-medium border-b border-navy/8">{n.label}</a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <a href="#contact" onClick={() => setOpen(false)}
               className="bg-brand-green text-white font-semibold text-center py-3.5 rounded-sm">Request a quote</a>
            <a href={"tel:" + PHONE_TEL}
               className="border border-navy/20 text-navy font-semibold text-center py-3.5 rounded-sm flex items-center justify-center gap-2">
              <Icon name="phone" className="w-4 h-4" /> Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero visual: underground utility scan ---------------- */
function UtilityScan(){
  return (
    <img
      src="C:\Users\anburaja\OneDrive\Documents\Desktop\CLIENT WEBSITE\OVERALL IMAGE.png"
      alt="STARLIVE ENGINEERING technician using a cable locator to trace electric cable, water pipe, communication cable and sewer pipe on a construction site, with a marked-location inset"
      className="w-full h-auto rounded-sm"
    />
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section id="home" className="relative bg-navy text-white overflow-hidden">
      <div className="hero-grid absolute inset-0 grid-lines" aria-hidden="true" />
      <div className="hero-ring absolute -right-24 -top-24 w-[420px] h-[420px] rounded-full border border-white/10" aria-hidden="true" />
      <div className="hero-ring absolute right-10 top-10 w-[300px] h-[300px] rounded-full border border-brand-green/20"
           style={{ animationDelay: "0.45s" }} aria-hidden="true" />
      <div className="relative max-w-content mx-auto px-5 lg:px-8 pt-[132px] pb-20 lg:pt-[170px] lg:pb-28 grid lg:grid-cols-[1.05fr_1fr] gap-14 items-center">
        <div>
          <div className="hero-rise inline-flex items-center gap-2.5 border border-white/20 rounded-full pl-2.5 pr-4 py-1.5 mb-7"
               style={{ animationDelay: "0.05s" }}>
            <span className="w-2 h-2 rounded-full bg-brand-green" />
            <span className="text-[0.82rem] font-medium text-white/80">Underground utility detection &amp; surveying, Singapore</span>
          </div>
          <h1 className="hero-rise font-display font-extrabold text-[2.35rem] sm:text-[3rem] lg:text-[3.45rem] leading-[1.06] tracking-tight"
              style={{ animationDelay: "0.15s" }}>
            Precision underground utility detection &amp; engineering services
          </h1>
          <p className="hero-rise mt-6 text-lg leading-relaxed text-white/75 max-w-[54ch]"
             style={{ animationDelay: "0.27s" }}>
            Professional cable detection, underground service tracing, land surveying and water leak
            detection services in Singapore.
          </p>
          <div className="hero-rise mt-9 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.39s" }}>
            <a href="#contact" className="cta-btn cta-sheen group inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green700 text-white font-semibold px-7 py-4 rounded-sm">
              Request a quote <Icon name="arrow" className="w-4 h-4 arrow-nudge" />
            </a>
            <a href="#services" className="cta-btn inline-flex items-center gap-2 border border-white/30 hover:border-white text-white font-semibold px-7 py-4 rounded-sm">
              Explore our services
            </a>
          </div>
          <a href={"tel:" + PHONE_TEL} className="hero-rise mt-8 inline-flex items-center gap-3 text-white/85 hover:text-white group"
             style={{ animationDelay: "0.5s" }}>
            <span className="w-10 h-10 rounded-full border border-white/25 grid place-items-center group-hover:border-brand-green group-hover:scale-105 transition-all duration-300">
              <Icon name="phone" className="w-4 h-4" />
            </span>
            <span className="font-display font-bold text-lg tracking-tight">Call {PHONE_DISPLAY}</span>
          </a>
        </div>
        <div className="hero-panel relative">
          <div className="border border-white/12 bg-white/[0.03] p-5 sm:p-7 rounded-sm">
            <UtilityScan />
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.78rem] text-white/60">
              <span className="flex items-center gap-2"><span className="w-3 h-[3px] bg-brand-green" /> Detected cable</span>
              <span className="flex items-center gap-2"><span className="w-3 h-[3px] bg-brand-blue" /> Water service</span>
              <span className="flex items-center gap-2"><span className="w-3 h-[3px] bg-white/50" /> To be verified on site</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Service highlights ---------------- */
const HIGHLIGHTS = [
  { n: "01", icon: "radar", title: "Cable detection", text: "Locating underground cables so their positions are known before ground works begin." },
  { n: "02", icon: "route", title: "Underground service tracing", text: "Tracing and marking the route of buried services across the work area." },
  { n: "03", icon: "ruler", title: "Land surveying", text: "Site measurement and positioning support for planning and setting out." },
  { n: "04", icon: "droplet", title: "Water leak detection", text: "Investigation to help pinpoint suspected water leakage locations on site." }
];

function Highlights() {
  return (
    <section className="relative bg-mist">
      <div className="max-w-content mx-auto px-5 lg:px-8 py-20 lg:py-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-navy/10 border border-navy/10">
          {HIGHLIGHTS.map((h, i) => (
            <Reveal key={h.n} delay={i * 80} variant="scale" className="bg-white">
              <a href="#services" className="card-hover card-hover-sm group relative z-0 hover:z-10 block h-full p-7 lg:p-8 bg-white hover:bg-navy transition-colors duration-300">
                <div className="flex items-start justify-between">
                  <span className="text-brand-green transition-transform duration-300 group-hover:-translate-y-0.5"><Icon name={h.icon} className="w-8 h-8" /></span>
                  <span className="font-display font-bold text-sm text-navy/25 group-hover:text-white/30 transition-colors duration-300">{h.n}</span>
                </div>
                <h3 className="mt-7 font-display font-bold text-xl text-navy group-hover:text-white transition-colors">{h.title}</h3>
                <p className="mt-3 text-[0.94rem] leading-relaxed text-steel group-hover:text-white/70 transition-colors">{h.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue group-hover:text-brand-green transition-colors">
                  Learn more <Icon name="arrow" className="w-4 h-4 arrow-nudge" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */
function About() {
  const points = [
    { icon: "target", t: "Precision-focused", d: "Careful on-site detection and marking so findings can be relied on." },
    { icon: "shield", t: "Safety-conscious", d: "Work planned around avoiding damage to buried services." },
    { icon: "message", t: "Clear communication", d: "Straightforward updates before, during and after site work." },
    { icon: "layers", t: "Reliable reporting", d: "Findings presented so your team can act on them." }
  ];
  return (
    <section id="about" className="relative bg-white">
      <div className="max-w-content mx-auto px-5 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-[1fr_1.05fr] gap-14 lg:gap-20 items-center">
        <Reveal className="order-2 lg:order-1">
          <div className="relative border border-navy/10 bg-mist p-8 sm:p-10">
            <div className="absolute inset-0 grid-lines-dark" aria-hidden="true" />
            <svg viewBox="0 0 460 340" className="relative w-full h-auto" role="img" aria-label="Site plan with marked underground service routes">
              <rect x="20" y="20" width="420" height="300" fill="#ffffff" stroke="#0C2340" strokeOpacity=".15" />
              <g stroke="#0C2340" strokeOpacity=".1">
                {Array.from({ length: 9 }).map((_, i) => <line key={i} x1="20" y1={20 + i * 33} x2="440" y2={20 + i * 33} />)}
                {Array.from({ length: 12 }).map((_, i) => <line key={"v" + i} x1={20 + i * 35} y1="20" x2={20 + i * 35} y2="320" />)}
              </g>
              <rect x="70" y="70" width="130" height="95" fill="#0C2340" fillOpacity=".07" stroke="#0C2340" strokeOpacity=".3" />
              <rect x="255" y="185" width="140" height="100" fill="#0C2340" fillOpacity=".07" stroke="#0C2340" strokeOpacity=".3" />
              <path d="M20 200 H150 V120 H300 V60 H440" fill="none" stroke="#3EA845" strokeWidth="4" />
              <path d="M20 265 H210 V150 H440" fill="none" stroke="#1F4E9C" strokeWidth="4" strokeDasharray="12 8" />
              {[[150, 200], [300, 120], [210, 265]].map(([x, y], i) => (
                <g key={i}><circle cx={x} cy={y} r="9" fill="#fff" stroke="#3EA845" strokeWidth="3" /><circle cx={x} cy={y} r="3" fill="#3EA845" /></g>
              ))}
              <g fontFamily="Inter, sans-serif" fontSize="11" fill="#5A6B7F">
                <text x="34" y="192">Traced route</text>
                <text x="34" y="257">Service to verify</text>
                <text x="82" y="62">Structure</text>
              </g>
            </svg>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <SectionHead kicker="About us" title="STARLIVE ENGINEERING PTE LTD  LCDW 2020-1028" />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-6 space-y-5 text-[1.03rem] leading-relaxed text-steel max-w-[62ch]">
              <p>
                {COMPANY} provides underground utility detection, tracing, marking, land surveying and
                water leak detection services in Singapore. We work alongside contractors, developers,
                property owners and site teams who need to know what lies beneath a site before they break ground.
              </p>
              <p>
                Every job starts with understanding what you are planning and ends with findings you can
                use — marked on site and set out clearly for your team. The aim is practical: reduce
                uncertainty, support safer excavation, and keep your works moving.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-7">
            {points.map((p, i) => (
              <Reveal key={p.t} delay={120 + i * 70}>
                <div className="flex gap-4">
                  <span className="shrink-0 w-11 h-11 grid place-items-center bg-brand-green/10 text-brand-green700 rounded-sm">
                    <Icon name={p.icon} className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-navy">{p.t}</h3>
                    <p className="mt-1 text-[0.92rem] leading-relaxed text-steel">{p.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */
const SERVICES = [
  {
    id: "cable-detection", n: "Service 01", icon: "radar",
    title: "Cable detection, tracing & marking of underground services",
    desc: "Professional detection and tracing of underground cables and services to help identify their locations before excavation, construction or other ground works.",
    benefits: ["Service positions identified before digging", "Routes marked clearly on site", "Supports safer excavation planning"]
  },
  {
    id: "land-surveying", n: "Service 02", icon: "ruler",
    title: "Land surveying",
    desc: "Professional land surveying support for site measurement, positioning and project planning.",
    benefits: ["Site measurement and positioning", "Support for setting out and planning", "Findings prepared for your project team"]
  },
  {
    id: "water-piping", n: "Service 03", icon: "route",
    title: "Underground water cable / piping detection",
    desc: "Detection and tracing of underground water-related cables, pipes and services to assist with site investigation and planning.",
    benefits: ["Water-related services traced on site", "Assists site investigation work", "Helps plan around existing services"]
  },
  {
    id: "leak-detection", n: "Service 04", icon: "droplet",
    title: "Water leak detection",
    desc: "Professional investigation to help identify suspected water leakage locations and support efficient site assessment.",
    benefits: ["Investigation of suspected leak areas", "Narrows down areas to open up", "Supports faster site assessment"]
  }
];

function ServiceArt({ kind }) {
  const common = "w-full h-auto";
  if (kind === "radar") return (
    <svg viewBox="0 0 320 180" className={common} aria-hidden="true">
      <rect width="320" height="180" fill="#0C2340" />
      <g className="grid-lines" />
      <g stroke="#ffffff" strokeOpacity=".12">{Array.from({length:6}).map((_,i)=><line key={i} x1="0" y1={i*30} x2="320" y2={i*30}/>)}</g>
      <line x1="0" y1="74" x2="320" y2="74" stroke="#3EA845" strokeWidth="2.5" />
      <path d="M0 122 C80 104 140 140 220 122 C266 112 292 128 320 122" fill="none" stroke="#3EA845" strokeWidth="5" strokeLinecap="round" />
      <path d="M0 122 C80 104 140 140 220 122 C266 112 292 128 320 122" fill="none" stroke="#fff" strokeWidth="1.6" className="dash-move" opacity=".6" />
      <g stroke="#3EA845" fill="none" strokeWidth="1.8" opacity=".6">
        <path d="M150 72a26 26 0 0 1 40 0" /><path d="M138 74a42 42 0 0 1 64 0" opacity=".45" />
      </g>
      <g stroke="#fff" strokeWidth="2.4" strokeLinecap="round"><path d="M170 74V44" /><path d="M158 44h24" /></g>
      <circle cx="176" cy="120" r="6" fill="#3EA845" />
    </svg>
  );
  if (kind === "ruler") return (
    <svg viewBox="0 0 320 180" className={common} aria-hidden="true">
      <rect width="320" height="180" fill="#123258" />
      <g stroke="#ffffff" strokeOpacity=".1">{Array.from({length:8}).map((_,i)=><line key={i} x1={i*45} y1="0" x2={i*45} y2="180"/>)}</g>
      <g stroke="#3EA845" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M96 150 L110 86 M126 150 L112 86 M111 150 L111 96" />
        <path d="M98 86h26" />
      </g>
      <circle cx="111" cy="78" r="8" fill="#3EA845" />
      <path d="M119 74 L210 52" stroke="#fff" strokeDasharray="6 6" strokeWidth="1.6" opacity=".7" />
      <g stroke="#fff" strokeWidth="2.4" opacity=".85"><path d="M232 150V46" /><path d="M224 46h16M224 78h16M224 110h16" /></g>
      <line x1="30" y1="150" x2="290" y2="150" stroke="#3EA845" strokeWidth="2" />
    </svg>
  );
  if (kind === "route") return (
    <svg viewBox="0 0 320 180" className={common} aria-hidden="true">
      <rect width="320" height="180" fill="#0C2340" />
      <line x1="0" y1="52" x2="320" y2="52" stroke="#3EA845" strokeWidth="2.5" />
      <path d="M0 96 H110 V140 H320" fill="none" stroke="#1F4E9C" strokeWidth="9" strokeLinecap="round" />
      <path d="M0 96 H110 V140 H320" fill="none" stroke="#9FC3F0" strokeWidth="2" className="dash-move" opacity=".6" />
      <path d="M0 132 H70 V78 H320" fill="none" stroke="#3EA845" strokeWidth="4" strokeDasharray="10 8" opacity=".8" />
      <g fill="#fff" opacity=".85">
        <circle cx="110" cy="96" r="5" /><circle cx="70" cy="78" r="5" />
      </g>
      <g stroke="#ffffff" strokeOpacity=".1">{Array.from({length:5}).map((_,i)=><line key={i} x1="0" y1={62+i*28} x2="320" y2={62+i*28}/>)}</g>
    </svg>
  );
  return (
    <svg viewBox="0 0 320 180" className={common} aria-hidden="true">
      <rect width="320" height="180" fill="#123258" />
      <line x1="0" y1="48" x2="320" y2="48" stroke="#3EA845" strokeWidth="2.5" />
      <path d="M0 110 H140 M180 110 H320" stroke="#1F4E9C" strokeWidth="10" strokeLinecap="round" />
      <g stroke="#9FC3F0" strokeWidth="2" opacity=".7"><path d="M0 110 H140 M180 110 H320" className="dash-move" /></g>
      <path d="M160 104c-7 8-12 14-12 20a12 12 0 0 0 24 0c0-6-5-12-12-20z" fill="#3EA845" />
      <g stroke="#3EA845" fill="none" strokeWidth="1.8" opacity=".55">
        <circle cx="160" cy="112" r="26" /><circle cx="160" cy="112" r="42" opacity=".5" /><circle cx="160" cy="112" r="58" opacity=".28" />
      </g>
      <g stroke="#fff" strokeWidth="2.4" strokeLinecap="round" opacity=".9"><path d="M160 48V24" /><path d="M150 24h20" /></g>
    </svg>
  );
}

function Services() {
  return (
    <section id="services" className="relative bg-white">
      <div className="max-w-content mx-auto px-5 lg:px-8 py-20 lg:py-28">
        <Reveal>
          <SectionHead kicker="Our services"
            title="What we do on site"
            intro="Four core services covering detection, tracing, surveying and leak investigation for underground works in Singapore." />
        </Reveal>

        <div className="mt-14 space-y-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={i * 60} variant={i % 2 === 0 ? "left" : "right"}>
              <article id={s.id} className="group/svc card-hover grid lg:grid-cols-[minmax(0,320px)_1fr] border border-navy/12 overflow-hidden hover:border-brand-green/60 bg-white">
                <div className="service-art relative"><ServiceArt kind={s.icon} /></div>
                <div className="p-7 lg:p-10">
                  <div className="flex items-center gap-3">
                    <span className="svc-icon text-brand-green700"><Icon name={s.icon} className="w-5 h-5" /></span>
                    <span className="text-sm font-semibold text-steel">{s.n}</span>
                  </div>
                  <h3 className="mt-3 font-display font-bold text-xl lg:text-2xl text-navy leading-snug max-w-[34ch]">{s.title}</h3>
                  <p className="mt-4 text-[0.98rem] leading-relaxed text-steel max-w-[62ch]">{s.desc}</p>
                  <ul className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                    {s.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-[0.93rem] text-navy/85">
                        <span className="mt-0.5 text-brand-green"><Icon name="check" className="w-4 h-4" stroke={2.4} /></span>{b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a href="#contact" className="cta-btn inline-flex items-center gap-2 bg-navy hover:bg-brand-blue text-white text-sm font-semibold px-6 py-3 rounded-sm">
                      Request a quote
                    </a>
                    <a href="#process" className="group inline-flex items-center gap-2 border border-navy/20 hover:border-navy text-navy text-sm font-semibold px-6 py-3 rounded-sm transition-colors">
                      How we work <Icon name="arrow" className="w-4 h-4 arrow-nudge" />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Process ---------------- */
const STEPS = [
  { n: "01", t: "Understand the requirement", d: "We talk through your works, the site and what you need to know before starting." },
  { n: "02", t: "Site assessment", d: "We review site conditions and access to plan the detection or survey work." },
  { n: "03", t: "Detection / survey / investigation", d: "Work is carried out on site, with services traced and marked as found." },
  { n: "04", t: "Findings & reporting", d: "Findings are set out clearly so your team can plan the next stage." }
];

function Process() {
  return (
    <section id="process" className="relative bg-navy text-white overflow-hidden">
      <div className="absolute inset-0 grid-lines" aria-hidden="true" />
      <div className="relative max-w-content mx-auto px-5 lg:px-8 py-20 lg:py-28">
        <Reveal><SectionHead kicker="How we work" light title="A straightforward four-step process"
          intro="From first conversation to reported findings, you always know what stage the work is at." /></Reveal>

        <div className="mt-16 relative">
          <div className="hidden lg:block absolute left-0 right-0 top-[26px] h-px bg-white/15" aria-hidden="true" />
          <ol className="grid lg:grid-cols-4 gap-10 lg:gap-8">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 110} variant="scale" className="group relative pl-16 lg:pl-0">
                <span className="absolute left-0 top-0 lg:relative lg:block w-[52px] h-[52px] rounded-full bg-navy border-2 border-brand-green grid place-items-center font-display font-bold text-brand-green transition-transform duration-300 group-hover:scale-105">
                  {s.n}
                </span>
                <span className="lg:hidden absolute left-[25px] top-[52px] bottom-[-40px] w-px bg-white/15" aria-hidden="true" />
                <h3 className="mt-0 lg:mt-7 font-display font-bold text-lg text-white leading-snug">{s.t}</h3>
                <p className="mt-2.5 text-[0.94rem] leading-relaxed text-white/65 max-w-[38ch]">{s.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Why choose us ---------------- */
const WHY = [
  { icon: "compass", t: "Professional engineering approach", d: "Work is planned and carried out with an engineering mindset, not guesswork." },
  { icon: "target", t: "Precision-focused work", d: "Detection and marking done carefully so the results are usable on site." },
  { icon: "shield", t: "Safety-conscious planning", d: "Knowing what is buried where supports safer excavation decisions." },
  { icon: "message", t: "Clear communication", d: "You get direct answers about what we found and what it means for your works." },
  { icon: "wrench", t: "Practical site solutions", d: "Approach adapted to the site, the access and the stage your project is at." },
  { icon: "pin", t: "Singapore-based service", d: "Locally based and available for sites across Singapore." }
];

function WhyChooseUs() {
  return (
    <section id="why" className="bg-mist">
      <div className="max-w-content mx-auto px-5 lg:px-8 py-20 lg:py-28">
        <Reveal><SectionHead kicker="Why choose us" title={"Why choose " + "STARLIVE ENGINEERING?"} /></Reveal>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY.map((w, i) => (
            <Reveal key={w.t} delay={i * 60} variant="scale">
              <div className="card-hover group h-full bg-white border border-navy/10 p-8 hover:border-brand-green">
                <span className="inline-grid place-items-center w-12 h-12 bg-navy text-brand-green rounded-sm transition-transform duration-300 group-hover:-translate-y-0.5">
                  <Icon name={w.icon} className="w-6 h-6" />
                </span>
                <h3 className="mt-6 font-display font-bold text-lg text-navy leading-snug">{w.t}</h3>
                <p className="mt-3 text-[0.94rem] leading-relaxed text-steel">{w.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Industries ---------------- */
const INDUSTRIES = [
  { icon: "hardhat", t: "Construction" },
  { icon: "compass", t: "Civil engineering" },
  { icon: "layers", t: "Infrastructure works" },
  { icon: "building", t: "Property & facilities" },
  { icon: "zap", t: "Utility works" },
  { icon: "home", t: "Site development" }
];

function Industries() {
  return (
    <section className="bg-white">
      <div className="max-w-content mx-auto px-5 lg:px-8 py-20 lg:py-24">
        <Reveal><SectionHead kicker="Applications" title="Supporting projects across key sectors"
          intro="These are areas where underground detection, surveying and leak investigation work can support a project." /></Reveal>
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-3 gap-px bg-navy/10 border border-navy/10">
          {INDUSTRIES.map((s, i) => (
            <Reveal key={s.t} delay={i * 50} className="bg-white">
              <div className="group bg-white p-7 lg:p-9 flex items-center gap-4 transition-colors duration-300 hover:bg-mist">
                <span className="text-brand-blue transition-transform duration-300 group-hover:scale-110"><Icon name={s.icon} className="w-7 h-7" /></span>
                <h3 className="font-display font-bold text-navy text-[1.02rem] leading-snug">{s.t}</h3>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm text-steel max-w-[70ch]">
          Listed as potential application areas for our services.
        </p>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */
function CTA() {
  return (
    <section className="relative bg-brand-blue text-white overflow-hidden">
      <div className="absolute inset-0 grid-lines" aria-hidden="true" />
      <div className="cta-ring absolute -left-20 -bottom-28 w-[380px] h-[380px] rounded-full border border-white/15" aria-hidden="true" />
      <div className="relative max-w-content mx-auto px-5 lg:px-8 py-20 lg:py-24 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
        <Reveal variant="left">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[2.8rem] leading-[1.1] tracking-tight">
            Planning underground works?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/80 max-w-[56ch]">
            Speak with {COMPANY} about your underground utility detection, surveying or water leak
            detection requirements.
          </p>
        </Reveal>
        <Reveal delay={120} variant="right">
          <div className="flex flex-col gap-3">
            <a href="#contact" className="cta-btn cta-sheen group inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green700 text-white font-semibold px-7 py-4 rounded-sm">
              Request a quote <Icon name="arrow" className="w-4 h-4 arrow-nudge" />
            </a>
            <div className="grid sm:grid-cols-2 gap-3">
              <a href={"tel:" + PHONE_TEL} className="cta-btn inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 font-semibold px-6 py-4 rounded-sm">
                <Icon name="phone" className="w-4 h-4" /> Call us
              </a>
              <a href={"mailto:" + EMAIL} className="cta-btn inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 font-semibold px-6 py-4 rounded-sm">
                <Icon name="mail" className="w-4 h-4" /> Email us
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
const SERVICE_OPTIONS = [
  "Cable detection, tracing & marking",
  "Land surveying",
  "Underground water cable / piping detection",
  "Water leak detection",
  "Not sure yet / other"
];

function ContactForm() {
  const empty = { name: "", company: "", phone: "", email: "", service: "", location: "", message: "" };
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    if (errors[k]) setErrors({ ...errors, [k]: null });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Enter your name.";
    if (!form.phone.trim()) e.phone = "Enter a contact number.";
    else if (!/^[+0-9()\s-]{7,20}$/.test(form.phone.trim())) e.phone = "Use digits, spaces, + or - only.";
    if (!form.email.trim()) e.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = "Check the email address format.";
    if (!form.service) e.service = "Select the service you need.";
    if (!form.message.trim()) e.message = "Tell us briefly what you need.";
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      const first = document.querySelector("[data-err='true']");
      if (first) first.focus();
      return;
    }
    const body = [
      "Name: " + form.name,
      "Company: " + (form.company || "-"),
      "Phone: " + form.phone,
      "Email: " + form.email,
      "Service required: " + form.service,
      "Project location: " + (form.location || "-"),
      "", "Message:", form.message
    ].join("\n");
    window.location.href = "mailto:" + EMAIL +
      "?subject=" + encodeURIComponent("Website enquiry — " + form.service) +
      "&body=" + encodeURIComponent(body);
    setSent(true);
    setForm(empty);
  };

  const field = "w-full bg-white border border-navy/20 px-4 py-3.5 text-navy placeholder:text-navy/35 focus:border-brand-green outline-none transition-colors rounded-sm";
  const label = "block text-sm font-semibold text-navy mb-2";
  const errCls = "mt-1.5 text-[0.82rem] text-[#B3261E]";

  return (
    <form onSubmit={submit} noValidate className="bg-white border border-navy/12 p-7 sm:p-9">
      {sent && (
        <div className="mb-6 flex items-start gap-3 border border-brand-green/40 bg-brand-green/8 p-4 rounded-sm" role="status">
          <span className="text-brand-green700 mt-0.5"><Icon name="check" className="w-5 h-5" stroke={2.4} /></span>
          <p className="text-sm text-navy">
            Your email app is opening with the enquiry filled in. Send it and we will reply, or call {PHONE_DISPLAY} if it is urgent.
          </p>
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={label} htmlFor="f-name">Name <span className="text-brand-green700">*</span></label>
          <input id="f-name" className={field} value={form.name} onChange={set("name")} data-err={!!errors.name}
                 aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} placeholder="Your full name" />
          {errors.name && <p id="e-name" className={errCls}>{errors.name}</p>}
        </div>
        <div>
          <label className={label} htmlFor="f-company">Company</label>
          <input id="f-company" className={field} value={form.company} onChange={set("company")} placeholder="Company name (optional)" />
        </div>
        <div>
          <label className={label} htmlFor="f-phone">Phone <span className="text-brand-green700">*</span></label>
          <input id="f-phone" type="tel" className={field} value={form.phone} onChange={set("phone")} data-err={!!errors.phone}
                 aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "e-phone" : undefined} placeholder="+65 0000 0000" />
          {errors.phone && <p id="e-phone" className={errCls}>{errors.phone}</p>}
        </div>
        <div>
          <label className={label} htmlFor="f-email">Email <span className="text-brand-green700">*</span></label>
          <input id="f-email" type="email" className={field} value={form.email} onChange={set("email")} data-err={!!errors.email}
                 aria-invalid={!!errors.email} aria-describedby={errors.email ? "e-email" : undefined} placeholder="you@company.com" />
          {errors.email && <p id="e-email" className={errCls}>{errors.email}</p>}
        </div>
        <div>
          <label className={label} htmlFor="f-service">Service required <span className="text-brand-green700">*</span></label>
          <select id="f-service" className={field} value={form.service} onChange={set("service")} data-err={!!errors.service}
                  aria-invalid={!!errors.service} aria-describedby={errors.service ? "e-service" : undefined}>
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          {errors.service && <p id="e-service" className={errCls}>{errors.service}</p>}
        </div>
        <div>
          <label className={label} htmlFor="f-location">Project location</label>
          <input id="f-location" className={field} value={form.location} onChange={set("location")} placeholder="Site address or area" />
        </div>
      </div>
      <div className="mt-5">
        <label className={label} htmlFor="f-message">Message <span className="text-brand-green700">*</span></label>
        <textarea id="f-message" rows="5" className={field} value={form.message} onChange={set("message")} data-err={!!errors.message}
                  aria-invalid={!!errors.message} aria-describedby={errors.message ? "e-message" : undefined}
                  placeholder="Describe the works, the site and your timeline." />
        {errors.message && <p id="e-message" className={errCls}>{errors.message}</p>}
      </div>
      <button type="submit"
              className="cta-btn group mt-7 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green700 text-white font-semibold px-8 py-4 rounded-sm">
        Submit enquiry <Icon name="arrow" className="w-4 h-4 arrow-nudge" />
      </button>
    </form>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-mist">
      <div className="max-w-content mx-auto px-5 lg:px-8 py-20 lg:py-28">
        <Reveal><SectionHead kicker="Contact" title="Tell us about your site"
          intro="Send the details of your works and we will get back to you with the next step." /></Reveal>

        <div className="mt-14 grid lg:grid-cols-[1fr_1.15fr] gap-10">
          <Reveal variant="left">
            <div className="bg-navy text-white p-8 sm:p-9 h-full">
              <h3 className="font-display font-bold text-xl leading-snug">{COMPANY}</h3>
              <p className="mt-1 text-sm text-white/60">{DIRECTOR} — Director</p>

              <dl className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <span className="shrink-0 w-10 h-10 grid place-items-center border border-white/20 text-brand-green rounded-sm"><Icon name="phone" className="w-4 h-4" /></span>
                  <div>
                    <dt className="text-[0.78rem] text-white/55 font-medium">Phone</dt>
                    <dd><a className="font-display font-bold text-lg hover:text-brand-green transition-colors" href={"tel:" + PHONE_TEL}>{PHONE_DISPLAY}</a></dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="shrink-0 w-10 h-10 grid place-items-center border border-white/20 text-brand-green rounded-sm"><Icon name="mail" className="w-4 h-4" /></span>
                  <div className="min-w-0">
                    <dt className="text-[0.78rem] text-white/55 font-medium">Email</dt>
                    <dd><a className="font-semibold break-all hover:text-brand-green transition-colors" href={"mailto:" + EMAIL}>{EMAIL}</a></dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="shrink-0 w-10 h-10 grid place-items-center border border-white/20 text-brand-green rounded-sm"><Icon name="pin" className="w-4 h-4" /></span>
                  <div>
                    <dt className="text-[0.78rem] text-white/55 font-medium">Address</dt>
                    <dd className="text-white/85 leading-relaxed">
                      {ADDRESS_LINES.map((l) => <span key={l} className="block">{l}</span>)}
                    </dd>
                  </div>
                </div>
              </dl>
              {/* Google Maps embed */}
<div className="mt-8 border border-white/15 overflow-hidden">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.1866382394595!2d103.75042185314761!3d1.3280702891572238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da10753927e51b%3A0x6a44954f62b3159e!2s18%20Boon%20Lay%20Way%2C%20Singapore%20609966!5e0!3m2!1sen!2sin!4v1789720390648!5m2!1sen!2sin"
    width="100%"
    height="220"
    style={{ border: 0 }}
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="STARLIVE ENGINEERING PTE LTD location"
  />
</div>
            </div>
          </Reveal>
          <Reveal delay={120} variant="right"><ContactForm /></Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-content mx-auto px-5 lg:px-8 py-16 grid md:grid-cols-[1.4fr_1fr_1fr] gap-12">
        <div>
          <Logo light />
          <p className="mt-5 text-white/65 text-[0.95rem] leading-relaxed max-w-[42ch]">
            Engineering &amp; underground utility services — cable detection, tracing and marking,
            land surveying, underground water piping detection and water leak detection in Singapore.
          </p>
        </div>
        <nav aria-label="Footer">
          <h3 className="font-display font-bold text-white text-[0.95rem]">Quick links</h3>
          <ul className="mt-4 space-y-2.5">
            {NAV.filter(n => n.label !== "Why Choose Us").map((n) => (
              <li key={n.href}><a href={n.href} className="text-white/65 hover:text-brand-green transition-colors text-[0.94rem]">{n.label}</a></li>
            ))}
          </ul>
        </nav>
        <div>
          <h3 className="font-display font-bold text-white text-[0.95rem]">Contact</h3>
          <ul className="mt-4 space-y-2.5 text-[0.94rem]">
            <li><a href={"tel:" + PHONE_TEL} className="text-white/65 hover:text-brand-green transition-colors">{PHONE_DISPLAY}</a></li>
            <li><a href={"mailto:" + EMAIL} className="text-white/65 hover:text-brand-green transition-colors break-all">{EMAIL}</a></li>
            <li className="text-white/65">Singapore</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/12">
        <div className="max-w-content mx-auto px-5 lg:px-8 py-6 text-[0.84rem] text-white/50">
          © 2026 {COMPANY}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Floating contact button ----------------
   Collapsed: one round button, bottom-right.
   Expanded:  Call (primary) + Email (secondary).
   No WhatsApp — do not add one until the client confirms the
   number is registered on WhatsApp.
   --------------------------------------------------------- */
function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const wrapRef = useRef(null);
  const toggleRef = useRef(null);

  // Appear once the hero is behind the reader, so it never sits over the hero CTAs.
  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > 320;
      setVisible(past);
      if (!past) setOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes and returns focus; outside click closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setOpen(false);
        if (toggleRef.current) toggleRef.current.focus();
      }
    };
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [open]);

  const action = "fab-action group flex items-center gap-3 pl-4 pr-5 py-3 rounded-full font-semibold text-[0.95rem] shadow-[0_10px_24px_-14px_rgba(12,35,64,.65)]";

  return (
    <div ref={wrapRef} className={"fab-wrap" + (visible ? " is-visible" : "")}>
      {/* visibility:hidden when closed keeps these out of the tab order and the a11y tree */}
      <div id="fab-actions" className={"fab-actions" + (open ? " is-open" : "")}>
        <a href={"https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent("Hi, I'd like to enquire about your services.")}
           target="_blank" rel="noopener noreferrer"
           onClick={() => setOpen(false)}
           className={action + " bg-brand-green hover:bg-brand-green700 text-white"}
           style={{ transitionDelay: open ? "60ms" : "0ms" }}>
          <span className="grid place-items-center w-8 h-8 rounded-full bg-white/15 shrink-0">
            <Icon name="whatsapp" className="w-4 h-4" />
          </span>
          <span className="text-left leading-tight">
            <span className="block text-[0.72rem] font-medium text-white/75">WhatsApp us</span>
            <span className="block">{PHONE_DISPLAY}</span>
          </span>
        </a>

        <a href={"mailto:" + EMAIL}
           onClick={() => setOpen(false)}
           className={action + " bg-white hover:bg-mist text-navy border border-navy/12"}>
          <span className="grid place-items-center w-8 h-8 rounded-full bg-navy/5 text-brand-blue shrink-0">
            <Icon name="mail" className="w-4 h-4" />
          </span>
          <span className="text-left leading-tight min-w-0">
            <span className="block text-[0.72rem] font-medium text-steel">Email us</span>
            <span className="block truncate max-w-[13rem]">{EMAIL}</span>
          </span>
        </a>
      </div>

      <button ref={toggleRef} type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="fab-actions"
              aria-label={open ? "Close contact options" : "Contact " + COMPANY}
              className="fab-toggle grid place-items-center w-14 h-14 rounded-full bg-navy hover:bg-brand-blue text-white shadow-[0_14px_30px_-12px_rgba(12,35,64,.8)]">
        <Icon name={open ? "close" : "phone"} className="w-6 h-6" />
      </button>
      <span className="sr-only" aria-live="polite">{open ? "Contact options shown" : ""}</span>
    </div>
  );
}

/* ---------------- App ---------------- */
function App() {
  return (
    <React.Fragment>
      <a href="#home" className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:top-3 focus:left-3 focus:bg-white focus:text-navy focus:px-4 focus:py-2">Skip to content</a>
      <Navbar />
      <main>
        <Hero />
        <Highlights />
        <About />
        <Services />
        <Process />
        <WhyChooseUs />
        <Industries />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
