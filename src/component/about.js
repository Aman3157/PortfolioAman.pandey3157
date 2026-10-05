import { useState, useEffect, useRef } from "react";
import amanFace from "../assets/aman-face.jpg";

const data = {
  name: "Aman Pandey",
  role: "Full Stack · Mobile · Web Developer",
  email: "pandeyaman3157@gmail.com",
  phone: "+91 6392387249",
  location: "Noida, Uttar Pradesh",
  linkedin: "aman-pandey-a3868419a",
  about:
    "Hello! My name is Aman Pandey and I am a Full Stack Developer with over 4 years of experience in cross-platform mobile and web development.I specialize in Ionic Angular, TypeScript, Node.js, and Socket.IO. Currently, I am working as a Software Engineer at Healaxy Software India Pvt Ltd, Noida, building healthcare SaaS products including the We Nourish You dietitian management system. I enjoy building complete end-to-end solutions — from designing the frontend to developing the backend and publishing apps on both Android and iOS platforms.Some of my key projects include We Nourish You, a clinical nutrition platform for dietitians; Kanteeno, a food delivery and live kitchen streaming app; Healaxy, a comprehensive hospital management system with modules like appointments, billing, and pharmacy; and the Jai Maharashtra News App, which features live news streaming.I have successfully published multiple apps on both the App Store and Google Play Store, and I am very comfortable working with real-time features using Socket.IO.I am a collaborative team player who works closely with designers, backend developers, and clients to deliver quality solutions on time.If you are looking for a dedicated developer who can work independently, communicate effectively, and deliver clean results — I am ready to contribute to your team.You can reach me at pandeyaman3157@gmail.com or connect with me on LinkedIn. Thank you!",
  stats: [
    { num: 4, suffix: "+", label: "Years of Experience" },
    { num: 10, suffix: "+", label: "Projects Delivered" },
    { num: 2, suffix: "", label: "Platforms (Browser,iOS & Android)" },
  ],
  skills: [
    "Ionic Framework", "Angular", "TypeScript", "JavaScript",
    "RxJS", "NgRx", "Node.js", "Express.js",
    "Socket.IO", "REST APIs", "MySQL", "HTML & CSS",
    "Bootstrap", "jQuery", "iOS Publishing", "Android Publishing",
    "Git", "Postman", "Swagger",
    "Claude AI", "ChatGPT", "Gemini", "AI API Integration",
  ],
  projects: [
    { tag: "Web · HealthTech", name: "We Nourish You", desc: "Dietitian management system with multi-step nutrition intake wizard, PG-SGA / MUST / SARC-F screening, WHO/CDC growth charts, and meal planning with allergen conflict detection." },
    { tag: "Android · iOS", name: "Kanteeno", desc: "Food delivery and live kitchen streaming app. Real-time order tracking, push notifications, dynamic UI, and live video streaming." },
    { tag: "Web · Mobile", name: "Healaxy", desc: "Hospital management system with patient registration, doctor schedules, appointments, billing, pharmacy, and role-based access." },
    { tag: "Android · iOS", name: "Jai Maharashtra News", desc: "Live news streaming application with REST API development, frontend integration, and real-time content updates." },
    { tag: "Mobile · Admin Panel", name: "K1 Facility Maintenance", desc: "Office maintenance app where operators update task progress in real time and reviewers monitor completion status." },
    { tag: "Android · iOS", name: "Layout365 — Reporter App", desc: "Mobile app for print media reporters to capture images, write stories, and upload directly to a cloud server." },
    { tag: "Android · iOS", name: "HornbillTV & News11", desc: "Live streaming news apps with real-time video integration and dynamic content delivery on Android and iOS." },
  ],
  experience: [
    { company: "Healaxy Software India Pvt Ltd", location: "Noida", role: "Software Engineer", date: "March 2026 – Present", desc: "Building healthcare SaaS products — Healaxy hospital platform and We Nourish You dietitian management system. Angular frontend, Node.js/Express APIs, MySQL, dynamic role-based access control (RBAC), and clinical nutrition modules. Uses AI-assisted development with Claude AI Desktop (Anthropic), ChatGPT and Gemini to build, debug and ship features faster." },
    { company: "Egreens Firms Pvt Ltd", location: "Gurugram", role: "Full Stack Developer", date: "May 2025 – February 2026", desc: "Worked on Kanteeno (food delivery & kitchen streaming) and K1 Facility Maintenance app. Ionic Angular, authentication, live updates, and real-time socket communication." },
    { company: "DigitalNavigation Pvt Ltd", location: "Noida", role: "Software Developer", date: "June 2022 – May 2025", desc: "Delivered 5 end-to-end projects across 5+ modules. Developed REST APIs, collaborated directly with clients, and maintained coding best practices." },
    { company: "Likhita Infrastructure Ltd", location: "Delhi", role: "Technical Support Engineer", date: "December 2018 – March 2022", desc: "Worked with SAP & CRM software to resolve customer complaints. Installed and configured hardware, operating systems, and business applications." },
  ],
  education: [
    { degree: "B.Tech in Information Technology", institute: "Buddha Institute of Technology, AKTU University", year: "2014 – 2018 · Gorakhpur" },
  ],
};

/* ── Animated counter ── */
function useCounter(target, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(Math.floor(start));
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ── Introduction Video ── */
const INTRO_VIDEO = `${process.env.PUBLIC_URL}/aman-intro.mp4`;
const INTRO_POSTER = `${process.env.PUBLIC_URL}/aman-intro-poster.jpg`;

function IntroVideo() {
  return (
    <div style={iv.wrap}>
      <video
        src={INTRO_VIDEO}
        poster={INTRO_POSTER}
        controls
        playsInline
        preload="metadata"
        style={iv.video}
        title="Aman Pandey — Introduction Video"
      />
      <div style={iv.caption}>
        <span style={iv.dot} /> 33 sec intro · Software Engineer @ Healaxy Software India Pvt Ltd
      </div>
    </div>
  );
}

/* ── Sub-components ── */
function StatCard({ num, suffix, label }) {
  const count = useCounter(num);
  return (
    <div style={styles.statCard}>
      <div style={styles.statNum}>{count}{suffix}</div>
      <div style={styles.statLabel}>{label}</div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={styles.sectionLabelWrap}>
      <span style={styles.sectionLabel}>{children}</span>
      <div style={styles.sectionLine} />
    </div>
  );
}

function FadeSection({ children, delay = 0 }) {
  const [ref, visible] = useFadeIn();
  return (
    <div ref={ref} style={{ ...styles.fadeSection, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease` }}>
      {children}
    </div>
  );
}

function SkillChip({ label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ ...styles.skillChip, borderColor: hovered ? "#00e5ff" : "rgba(0,229,255,0.15)", background: hovered ? "rgba(0,229,255,0.07)" : "#12121a", transform: hovered ? "translateX(4px)" : "none" }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={styles.skillBar} />{label}
    </div>
  );
}

function ProjectCard({ tag, name, desc }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ ...styles.projectCard, borderColor: hovered ? "#00e5ff" : "rgba(0,229,255,0.15)", transform: hovered ? "translateY(-4px)" : "none", boxShadow: hovered ? "0 16px 48px rgba(0,0,0,0.4)" : "none" }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <span style={styles.projectTag}>{tag}</span>
      <div style={styles.projectName}>{name}</div>
      <div style={styles.projectDesc}>{desc}</div>
    </div>
  );
}

function TimelineItem({ company, location, role, date, desc }) {
  return (
    <div style={styles.timelineItem}>
      <div style={styles.timelineDot} />
      <div style={styles.expCompany}>{company} <span style={styles.expLoc}>— {location}</span></div>
      <div style={styles.expRole}>{role}</div>
      <div style={styles.expDate}>{date}</div>
      <div style={styles.expDesc}>{desc}</div>
    </div>
  );
}

const TABS = ["About", "Skills", "Projects", "Experience", "Contact"];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("About");
  const [pulsing, setPulsing] = useState(true);
  useEffect(() => { const t = setInterval(() => setPulsing(p => !p), 1500); return () => clearInterval(t); }, []);

  return (
    <div style={styles.root}>
      <div style={styles.gridBg} />
      <div style={styles.glowBg} />
      <div style={styles.container}>

        {/* HERO */}
        <div style={styles.hero}>
          <div style={{ ...styles.avatarRing, boxShadow: pulsing ? "0 0 0 0 rgba(0,229,255,0.5), 0 0 40px rgba(124,77,255,0.3)" : "0 0 0 14px rgba(0,229,255,0), 0 0 60px rgba(124,77,255,0.5)", transition: "box-shadow 1.5s ease" }}>
            <img src={amanFace} alt="Aman Pandey" style={styles.avatarImg} />
          </div>
          <div style={styles.roleBadge}>Full Stack · Mobile · Web Developer</div>
          <h1 style={styles.heroName}>Aman <span style={styles.heroNameAccent}>Pandey</span></h1>
          <p style={styles.heroSub}>Building end-to-end cross-platform applications since 2018</p>
          <div style={styles.contactBar}>
            {[{ text: data.email }, { text: data.phone }, { text: data.location }].map(c => (
              <span key={c.text} style={styles.contactItem}><span style={styles.contactDot} />{c.text}</span>
            ))}
          </div>
        </div>

        {/* STATS */}
        <div style={styles.statsRow}>
          {data.stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        {/* TABS */}
        <div style={styles.tabBar}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ ...styles.tabBtn, color: activeTab === tab ? "#00e5ff" : "#7a7a9a", borderBottom: activeTab === tab ? "2px solid #00e5ff" : "2px solid transparent" }}>
              {tab}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div style={styles.tabContent}>

          {activeTab === "About" && (
            <FadeSection>
              <SectionLabel>About Me</SectionLabel>
              <div style={styles.aboutBox}>
                <p style={styles.aboutText}>{data.about}</p>
                <div style={styles.aboutHighlights}>
                  {["Ionic Angular Expert", "Node.js Backend", "iOS & Android Publisher", "Real-time Apps"].map(h => (
                    <span key={h} style={styles.highlight}>{h}</span>
                  ))}
                </div>
              </div>
              <SectionLabel>Video Introduction</SectionLabel>
              <IntroVideo />
            </FadeSection>
          )}

          {activeTab === "Skills" && (
            <FadeSection>
              <SectionLabel>Technical Skills</SectionLabel>
              <div style={styles.skillsGrid}>
                {data.skills.map(s => <SkillChip key={s} label={s} />)}
              </div>
            </FadeSection>
          )}

          {activeTab === "Projects" && (
            <FadeSection>
              <SectionLabel>Key Projects</SectionLabel>
              <div style={styles.projectsGrid}>
                {data.projects.map(p => <ProjectCard key={p.name} {...p} />)}
              </div>
            </FadeSection>
          )}

          {activeTab === "Experience" && (
            <FadeSection>
              <SectionLabel>Work Experience</SectionLabel>
              <div style={styles.timeline}>
                {data.experience.map(e => <TimelineItem key={e.company} {...e} />)}
              </div>
              <div style={{ marginTop: 36 }}>
                <SectionLabel>Education</SectionLabel>
                <div style={styles.timeline}>
                  {data.education.map(e => (
                    <div key={e.degree} style={styles.timelineItem}>
                      <div style={styles.timelineDot} />
                      <div style={styles.expCompany}>{e.degree}</div>
                      <div style={styles.expRole}>{e.institute}</div>
                      <div style={styles.expDate}>{e.year}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeSection>
          )}

          {activeTab === "Contact" && (
            <FadeSection>
              <SectionLabel>Get In Touch</SectionLabel>
              <div style={styles.contactCard}>
                <div style={styles.ctaTitle}>Open to New Opportunities 🚀</div>
                <div style={styles.ctaSub}>Available for full-time roles · Noida / Delhi NCR · Open to Remote</div>
                <div style={styles.contactDetails}>
                  {[
                    { label: "Email", value: data.email, href: `mailto:${data.email}` },
                    { label: "Phone", value: data.phone, href: `tel:${data.phone}` },
                    { label: "Location", value: data.location, href: null },
                    { label: "LinkedIn", value: `linkedin.com/in/${data.linkedin}`, href: `https://linkedin.com/in/${data.linkedin}` },
                  ].map(c => (
                    <div key={c.label} style={styles.contactRow}>
                      <span style={styles.contactLabel}>{c.label}</span>
                      {c.href ? <a href={c.href} target="_blank" rel="noreferrer" style={styles.contactLink}>{c.value}</a> : <span style={styles.contactValue}>{c.value}</span>}
                    </div>
                  ))}
                </div>
                <div style={styles.btnRow}>
                  <a href={`mailto:${data.email}`} style={styles.btnPrimary}>📧 Send an Email</a>
                  <a href={`tel:${data.phone}`} style={styles.btnOutline}>📞 Call Now</a>
                  <a href={`https://linkedin.com/in/${data.linkedin}`} target="_blank" rel="noreferrer" style={styles.btnOutline}>🔗 LinkedIn</a>
                </div>
              </div>
            </FadeSection>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Intro Video Styles ── */
const iv = {
  wrap: { background: "#1a1a26", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 16, padding: 14, marginBottom: 20 },
  video: { width: "100%", aspectRatio: "16/9", borderRadius: 10, background: "#000", display: "block" },
  caption: { display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#7a7a9a", marginTop: 12, paddingLeft: 4 },
  dot: { width: 6, height: 6, borderRadius: "50%", background: "#00e5ff", display: "inline-block" },
};

/* ── Main Styles ── */
const styles = {
  root: { background: "#0a0a0f", color: "#e8e8f0", minHeight: "100vh", fontFamily: "'DM Sans','Segoe UI',sans-serif", position: "relative", overflowX: "hidden" },
  gridBg: { position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(0,229,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.03) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none", zIndex: 0 },
  glowBg: { position: "fixed", inset: 0, background: "radial-gradient(ellipse 60% 50% at 20% 20%,rgba(124,77,255,0.07) 0%,transparent 70%),radial-gradient(ellipse 50% 40% at 80% 80%,rgba(0,229,255,0.05) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 },
  container: { maxWidth: 860, margin: "0 auto", padding: "40px 24px 80px", position: "relative", zIndex: 1 },
  hero: { textAlign: "center", padding: "60px 0 40px" },
  avatarRing: { width: 110, height: 110, borderRadius: "50%", background: "linear-gradient(135deg,#00e5ff,#7c4dff)", padding: 3, margin: "0 auto 24px" },
  avatarImg: { width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", display: "block", background: "#1a1a26" },
  avatarInner: { width: "100%", height: "100%", borderRadius: "50%", background: "#1a1a26", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 800, color: "#00e5ff", fontFamily: "Syne,sans-serif" },
  roleBadge: { display: "inline-block", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "#7a7a9a", marginBottom: 10 },
  heroName: { fontSize: "clamp(34px,6vw,54px)", fontWeight: 800, letterSpacing: -1, lineHeight: 1, marginBottom: 12, fontFamily: "Syne,sans-serif" },
  heroNameAccent: { background: "linear-gradient(90deg,#00e5ff,#7c4dff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
  heroSub: { fontSize: 14, color: "#7a7a9a", marginBottom: 20 },
  contactBar: { display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" },
  contactItem: { display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#7a7a9a" },
  contactDot: { width: 6, height: 6, borderRadius: "50%", background: "#00e5ff", display: "inline-block" },
  statsRow: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, margin: "32px 0" },
  statCard: { background: "#1a1a26", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 12, padding: 22, textAlign: "center" },
  statNum: { fontSize: 34, fontWeight: 800, fontFamily: "Syne,sans-serif", background: "linear-gradient(90deg,#00e5ff,#7c4dff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
  statLabel: { fontSize: 11, color: "#7a7a9a", textTransform: "uppercase", letterSpacing: 2, marginTop: 4 },
  tabBar: { display: "flex", gap: 0, borderBottom: "1px solid rgba(0,229,255,0.1)", marginBottom: 32, overflowX: "auto" },
  tabBtn: { background: "none", border: "none", cursor: "pointer", padding: "12px 20px", fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", transition: "color 0.2s", whiteSpace: "nowrap", fontFamily: "Syne,sans-serif" },
  tabContent: { minHeight: 400 },
  fadeSection: {},
  sectionLabelWrap: { display: "flex", alignItems: "center", gap: 12, marginBottom: 20, marginTop: 8 },
  sectionLabel: { fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: "#00e5ff", whiteSpace: "nowrap", fontFamily: "Syne,sans-serif" },
  sectionLine: { flex: 1, height: 1, background: "rgba(0,229,255,0.15)" },
  aboutBox: { background: "#1a1a26", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 12, padding: 24, marginBottom: 32 },
  aboutText: { fontSize: 14, lineHeight: 1.9, color: "#a0a0c0", marginBottom: 20 },
  aboutHighlights: { display: "flex", flexWrap: "wrap", gap: 10 },
  highlight: { fontSize: 12, fontWeight: 600, color: "#00e5ff", background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.2)", borderRadius: 6, padding: "5px 12px" },
  skillsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 10 },
  skillChip: { background: "#12121a", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 8, padding: "10px 14px", fontSize: 13, fontWeight: 500, color: "#e8e8f0", position: "relative", overflow: "hidden", transition: "all 0.2s", cursor: "default", paddingLeft: 18 },
  skillBar: { position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "linear-gradient(180deg,#00e5ff,#7c4dff)", borderRadius: "3px 0 0 3px" },
  projectsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16 },
  projectCard: { background: "#1a1a26", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 12, padding: 20, transition: "all 0.3s", cursor: "default" },
  projectTag: { display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#00e5ff", background: "rgba(0,229,255,0.1)", borderRadius: 4, padding: "3px 8px", marginBottom: 10 },
  projectName: { fontSize: 16, fontWeight: 700, marginBottom: 6, fontFamily: "Syne,sans-serif" },
  projectDesc: { fontSize: 13, color: "#7a7a9a", lineHeight: 1.6 },
  timeline: { position: "relative", paddingLeft: 24, borderLeft: "1px solid rgba(0,229,255,0.2)" },
  timelineItem: { position: "relative", marginBottom: 28, paddingLeft: 20 },
  timelineDot: { position: "absolute", left: -29, top: 6, width: 10, height: 10, borderRadius: "50%", background: "#00e5ff", boxShadow: "0 0 10px rgba(0,229,255,0.6)" },
  expCompany: { fontSize: 16, fontWeight: 700, fontFamily: "Syne,sans-serif" },
  expLoc: { fontSize: 14, fontWeight: 400, color: "#7a7a9a" },
  expRole: { fontSize: 13, color: "#00e5ff", margin: "2px 0 4px", fontWeight: 500 },
  expDate: { fontSize: 11, color: "#7a7a9a", letterSpacing: 1, marginBottom: 8 },
  expDesc: { fontSize: 13, color: "#7a7a9a", lineHeight: 1.7 },
  contactCard: { background: "#1a1a26", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 20, padding: 40, textAlign: "center" },
  ctaTitle: { fontSize: 26, fontWeight: 800, marginBottom: 8, fontFamily: "Syne,sans-serif" },
  ctaSub: { color: "#7a7a9a", fontSize: 14, marginBottom: 32 },
  contactDetails: { textAlign: "left", maxWidth: 460, margin: "0 auto 32px" },
  contactRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid rgba(0,229,255,0.08)" },
  contactLabel: { fontSize: 12, fontWeight: 700, color: "#7a7a9a", letterSpacing: 2, textTransform: "uppercase" },
  contactLink: { fontSize: 13, color: "#00e5ff", textDecoration: "none" },
  contactValue: { fontSize: 13, color: "#e8e8f0" },
  btnRow: { display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" },
  btnPrimary: { padding: "12px 28px", borderRadius: 8, background: "linear-gradient(135deg,#00e5ff,#7c4dff)", color: "#0a0a0f", fontWeight: 700, fontSize: 14, textDecoration: "none", display: "inline-block" },
  btnOutline: { padding: "12px 28px", borderRadius: 8, background: "transparent", color: "#e8e8f0", border: "1px solid rgba(0,229,255,0.2)", fontSize: 14, textDecoration: "none", display: "inline-block" },
};