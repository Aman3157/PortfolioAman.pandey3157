import React from "react";
import aman from "../assets/aman.jpeg";
import { useNavigate } from "react-router-dom";

const projects = [
  {
    emoji: "🍽️",
    type: "Food Tech · Ionic · Angular · Node.js · MongoDB",
    typeColor: "#43e97b",
    name: "Kanteeno App",
    desc: "Food delivery & live kitchen streaming app for Android & iOS. Features real-time order tracking, push notifications, dynamic UI, and live video streaming.",
    tags: ["Ionic", "Angular", "Node.js", "MongoDB", "Socket.IO", "Live Streaming"],
    bg: "linear-gradient(135deg, #0d1f1a, #0f4033)",
    company: "Egreens Firms Pvt Ltd",
  },
  {
    emoji: "🏥",
    type: "Healthcare · Angular · Ionic · Node.js · MySQL",
    typeColor: "#60a5fa",
    name: "Healaxy — Hospital Management System",
    desc: "Comprehensive hospital management for browser & mobile. Modules: patient registration, appointments, doctor schedules, billing, pharmacy, inventory & reports. Role-based access for doctor, admin, patient & staff.",
    tags: ["Angular", "Ionic", "Node.js", "MySQL", "REST APIs", "Role-Based Access"],
    bg: "linear-gradient(135deg, #0d1833, #1a3a6b)",
    company: "DigitalNavigation Pvt Ltd",
  },
  {
    emoji: "🔧",
    type: "Facility Management · Ionic · Angular · Node.js",
    typeColor: "#fbbf24",
    name: "K1 Facility Maintenance App",
    desc: "Office maintenance management for Android & iOS + Web Panel. Operators receive & update tasks in real time. Reviewers monitor task status and ensure work is completed properly.",
    tags: ["Ionic", "Angular", "Node.js", "Socket.IO", "Real-Time", "Android · iOS"],
    bg: "linear-gradient(135deg, #1a1200, #4a3500)",
    company: "Egreens Firms Pvt Ltd",
  },
  {
    emoji: "📰",
    type: "Reporter App · Ionic · Angular · Node.js · MySQL",
    typeColor: "#f472b6",
    name: "Layout365 — Reporter App",
    desc: "Mobile app for print media houses. Reporters can capture images, create stories, and upload directly to cloud server. Designed to manage and publish reports efficiently.",
    tags: ["Ionic", "Angular", "Node.js", "MySQL", "Cloud Upload"],
    bg: "linear-gradient(135deg, #1f0d1a, #5c1a3a)",
    company: "DigitalNavigation Pvt Ltd",
  },
  {
    emoji: "📺",
    type: "News · Ionic · Angular · Node.js",
    typeColor: "#f97316",
    name: "Jai Maharashtra News App",
    desc: "Live news streaming app for Android & iOS. Developed REST APIs, integrated with frontend, and enabled live news streaming with real-time updates.",
    tags: ["Ionic", "Angular", "Node.js", "REST APIs", "Live Streaming", "Android · iOS"],
    bg: "linear-gradient(135deg, #1f1200, #5c3a00)",
    company: "DigitalNavigation Pvt Ltd",
  },
  {
    emoji: "🎙️",
    type: "News · Live Streaming · Ionic · Angular · Node.js",
    typeColor: "#a78bfa",
    name: "News11 — Live Streaming News App",
    desc: "News & live streaming app. Developed REST APIs, implemented live video streaming and real-time updates for breaking news and live coverage.",
    tags: ["Ionic", "Angular", "Node.js", "REST APIs", "Live Video", "Real-Time"],
    bg: "linear-gradient(135deg, #1a1040, #2d1b69)",
    company: "DigitalNavigation Pvt Ltd",
  },
  {
    emoji: "📡",
    type: "News Streaming · Ionic · Angular · Node.js",
    typeColor: "#2dd4bf",
    name: "HornbillTV — Android & iOS App",
    desc: "Regional news app for Android & iOS. Developed REST APIs, integrated with frontend, and enabled live news streaming for local audience.",
    tags: ["Ionic", "Angular", "Node.js", "REST APIs", "Live Streaming"],
    bg: "linear-gradient(135deg, #0d1f1f, #0f3333)",
    company: "DigitalNavigation Pvt Ltd",
  },
  {
    emoji: "🗞️",
    type: "Regional News · Ionic · Angular · Node.js",
    typeColor: "#fb923c",
    name: "Shekhawati Ab Tak — News App",
    desc: "News streaming app for Android & iOS. Built REST APIs, integrated with frontend, and enabled live news streaming with real-time updates.",
    tags: ["Ionic", "Angular", "Node.js", "REST APIs", "Live Streaming", "Android · iOS"],
    bg: "linear-gradient(135deg, #1f1500, #4a3000)",
    company: "DigitalNavigation Pvt Ltd",
  },
];

/* ── Inject responsive CSS once ── */
const responsiveCSS = `
  @media (max-width: 768px) {
    .hero-container {
      flex-direction: column !important;
      padding: 60px 24px 40px !important;
      text-align: center !important;
      min-height: unset !important;
    }
    .hero-left {
      width: 100% !important;
      order: 2;
    }
    .hero-right {
      width: 100% !important;
      order: 1;
      justify-content: center !important;
      margin-bottom: 28px;
    }
    .hero-image {
      width: 180px !important;
      height: 180px !important;
    }
    .hero-desc {
      max-width: 100% !important;
    }
    .hero-chips {
      justify-content: center;
    }
    .hero-buttons {
      display: flex;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .section-inner {
      padding: 0 16px;
    }
    .portfolio-grid {
      grid-template-columns: 1fr !important;
    }
  }
  @media (max-width: 480px) {
    .hero-h1 {
      font-size: 2.2rem !important;
    }
    .section-title {
      font-size: 1.8rem !important;
    }
  }
`;

if (typeof document !== "undefined") {
  const styleId = "home-responsive-styles";
  if (!document.getElementById(styleId)) {
    const styleTag = document.createElement("style");
    styleTag.id = styleId;
    styleTag.innerHTML = responsiveCSS;
    document.head.appendChild(styleTag);
  }
}

function Home() {
  const navigate = useNavigate();

  const handlePortfolioClick = () => {
    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <div>
      {/* ── HERO ── */}
      <div className="hero-container" style={styles.container}>
        <div className="hero-left" style={styles.left}>
          <p style={styles.badge}>👋 4+ Years Experience</p>
          <h1 className="hero-h1" style={styles.h1}>
            Hello, I'm <span style={styles.highlight}>Aman</span>
          </h1>
          <h2 style={styles.h2}>Full Stack Developer</h2>
          <p className="hero-desc" style={styles.desc}>
            I build modern <strong>Web, Android & iOS</strong> applications using{" "}
            <strong>Ionic, Angular, React, Node.js</strong>, and{" "}
            <strong>MySQL / MongoDB</strong>. Experienced in delivering end-to-end
            solutions with real-time apps, live streaming & app store publishing.
          </p>
          <div className="hero-chips" style={styles.chips}>
            {["Ionic", "Angular", "React", "Node.js", "MongoDB", "MySQL", "Socket.IO", "TypeScript"].map((s) => (
              <span key={s} style={styles.chip}>{s}</span>
            ))}
          </div>
          <div className="hero-buttons">
            <button style={styles.btn} onClick={handlePortfolioClick}>
              View Portfolio
            </button>
            <button style={styles.btn2} onClick={handleContactClick}>
              Contact Me
            </button>
          </div>
        </div>

        <div className="hero-right" style={styles.right}>
          <div style={styles.imageWrap}>
            <img className="hero-image" src={aman} alt="Aman Pandey" style={styles.image} />
          </div>
        </div>
      </div>

      {/* ── PORTFOLIO ── */}
      <div id="portfolio" style={styles.portfolio}>
        <div className="section-inner" style={styles.sectionInner}>
          <p style={styles.sectionLabel}>Real Work · Real Products</p>
          <h2 className="section-title" style={styles.sectionTitle}>My Projects</h2>
          <div style={styles.divider}></div>

          <div className="portfolio-grid" style={styles.grid}>
            {projects.map((p, i) => (
              <ProjectCard key={i} project={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      style={{
        ...styles.card,
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        borderColor: hovered ? "rgba(108,99,255,0.5)" : "rgba(108,99,255,0.15)",
        boxShadow: hovered
          ? "0 24px 48px rgba(0,0,0,0.5)"
          : "0 4px 16px rgba(0,0,0,0.2)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ ...styles.thumb, background: project.bg }}>
        <span style={{ fontSize: "3rem" }}>{project.emoji}</span>
      </div>

      <div style={styles.cardBody}>
        <p style={{ ...styles.projectType, color: project.typeColor }}>
          {project.type}
        </p>
        <h3 style={styles.projectName}>{project.name}</h3>
        <p style={styles.projectDesc}>{project.desc}</p>

        <div style={styles.tags}>
          {project.tags.map((t) => (
            <span key={t} style={styles.tag}>{t}</span>
          ))}
        </div>

        <div style={styles.companyBadge}>🏢 {project.company}</div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: "100vh",
    padding: "80px 60px",
    background: "linear-gradient(135deg, #0a0a0f 0%, #1f1040 50%, #0a1f1a 100%)",
    gap: "40px",
  },
  left: { color: "white", width: "55%" },
  badge: {
    display: "inline-block",
    background: "rgba(108,99,255,0.15)",
    border: "1px solid rgba(108,99,255,0.35)",
    borderRadius: "100px",
    padding: "6px 16px",
    fontSize: "0.82rem",
    color: "#a78bfa",
    fontWeight: "600",
    marginBottom: "16px",
    letterSpacing: "0.05em",
  },
  h1: {
    fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
    fontWeight: "900",
    lineHeight: "1.1",
    marginBottom: "8px",
    fontFamily: "Georgia, serif",
  },
  highlight: {
    background: "linear-gradient(135deg, #6c63ff, #ff6584)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  h2: {
    fontSize: "1.4rem",
    fontWeight: "400",
    color: "rgba(255,255,255,0.6)",
    marginBottom: "20px",
    letterSpacing: "0.05em",
  },
  desc: {
    fontSize: "1rem",
    color: "rgba(255,255,255,0.7)",
    lineHeight: "1.8",
    marginBottom: "20px",
    maxWidth: "480px",
  },
  chips: { display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" },
  chip: {
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "6px",
    padding: "4px 12px",
    fontSize: "0.78rem",
    color: "rgba(255,255,255,0.65)",
    fontWeight: "500",
  },
  btn: {
    marginRight: "12px",
    padding: "12px 28px",
    background: "linear-gradient(135deg, #6c63ff, #9b59f5)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "600",
    boxShadow: "0 4px 20px rgba(108,99,255,0.4)",
  },
  btn2: {
    padding: "12px 28px",
    background: "transparent",
    color: "white",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "500",
  },
  right: { width: "40%", display: "flex", justifyContent: "center" },
  imageWrap: {
    padding: "6px",
    borderRadius: "50%",
    border: "2px solid rgba(108,99,255,0.3)",
  },
  image: {
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    objectFit: "cover",
    objectPosition: "top",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    display: "block",
  },
  portfolio: { background: "#0a0a0f", padding: "80px 20px" },
  sectionInner: { maxWidth: "1150px", margin: "0 auto" },
  sectionLabel: {
    fontSize: "0.75rem",
    letterSpacing: "0.15em",
    fontWeight: "600",
    color: "#6c63ff",
    textTransform: "uppercase",
    marginBottom: "6px",
  },
  sectionTitle: {
    fontFamily: "Georgia, serif",
    fontSize: "2.5rem",
    fontWeight: "900",
    color: "#e8e8f0",
    marginBottom: "12px",
  },
  divider: {
    width: "48px",
    height: "3px",
    background: "linear-gradient(90deg, #6c63ff, #ff6584)",
    borderRadius: "2px",
    marginBottom: "48px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))",
    gap: "24px",
  },
  card: {
    background: "#16161f",
    border: "1px solid rgba(108,99,255,0.15)",
    borderRadius: "16px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
    cursor: "default",
  },
  thumb: {
    height: "140px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardBody: { padding: "20px", display: "flex", flexDirection: "column", flex: 1 },
  projectType: {
    fontSize: "0.68rem",
    letterSpacing: "0.08em",
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: "6px",
  },
  projectName: {
    fontFamily: "Georgia, serif",
    fontSize: "1.15rem",
    fontWeight: "700",
    color: "#e8e8f0",
    marginBottom: "8px",
  },
  projectDesc: { color: "#7a7a9a", fontSize: "0.88rem", lineHeight: "1.7", flex: 1 },
  tags: { display: "flex", flexWrap: "wrap", gap: "6px", margin: "14px 0 10px" },
  tag: {
    background: "rgba(108,99,255,0.1)",
    border: "1px solid rgba(108,99,255,0.2)",
    borderRadius: "4px",
    padding: "3px 10px",
    fontSize: "0.72rem",
    color: "#a78bfa",
    fontWeight: "500",
  },
  companyBadge: {
    marginTop: "6px",
    fontSize: "0.78rem",
    color: "#5a5a7a",
    fontWeight: "500",
    borderTop: "1px solid rgba(108,99,255,0.1)",
    paddingTop: "10px",
  },
};

export default Home;