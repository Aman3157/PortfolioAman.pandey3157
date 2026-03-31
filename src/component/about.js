import { useState, useEffect, useRef, useCallback } from "react";

const data = {
  name: "Aman Pandey",
  role: "Full Stack · Mobile · Web Developer",
  email: "pandeyaman3157@gmail.com",
  phone: "+91 6392387249",
  location: "Noida, Uttar Pradesh",
  linkedin: "aman-pandey-a3868419a",
  about:
    "Hello! My name is Aman Pandey and I am a Full Stack Developer with over 4 years of experience in cross-platform mobile and web development.I specialize in Ionic Angular, TypeScript, Node.js, and Socket.IO. I enjoy building complete end-to-end solutions — from designing the frontend to developing the backend and publishing apps on both Android and iOS platforms.Some of my key projects include Kanteeno, a food delivery and live kitchen streaming app; Healaxy, a comprehensive hospital management system with modules like appointments, billing, and pharmacy; and the Jai Maharashtra News App, which features live news streaming.I have successfully published multiple apps on both the App Store and Google Play Store, and I am very comfortable working with real-time features using Socket.IO.I am a collaborative team player who works closely with designers, backend developers, and clients to deliver quality solutions on time.If you are looking for a dedicated developer who can work independently, communicate effectively, and deliver clean results — I am ready to contribute to your team.You can reach me at pandeyaman3157@gmail.com or connect with me on LinkedIn. Thank you!",
  stats: [
    { num: 4, suffix: "+", label: "Years of Experience" },
    { num: 10, suffix: "+", label: "Projects Delivered" },
    { num: 2, suffix: "", label: "Platforms (iOS & Android)" },
  ],
  skills: [
    "Ionic Framework", "Angular", "TypeScript", "JavaScript",
    "RxJS", "NgRx", "Node.js", "Express.js",
    "Socket.IO", "REST APIs", "MySQL", "HTML & CSS",
    "Bootstrap", "jQuery", "iOS Publishing", "Android Publishing",
    "Git", "Postman", "Swagger",
  ],
  projects: [
    { tag: "Android · iOS", name: "Kanteeno", desc: "Food delivery and live kitchen streaming app. Real-time order tracking, push notifications, dynamic UI, and live video streaming." },
    { tag: "Web · Mobile", name: "Healaxy", desc: "Hospital management system with patient registration, doctor schedules, appointments, billing, pharmacy, and role-based access." },
    { tag: "Android · iOS", name: "Jai Maharashtra News", desc: "Live news streaming application with REST API development, frontend integration, and real-time content updates." },
    { tag: "Mobile · Admin Panel", name: "K1 Facility Maintenance", desc: "Office maintenance app where operators update task progress in real time and reviewers monitor completion status." },
    { tag: "Android · iOS", name: "Layout365 — Reporter App", desc: "Mobile app for print media reporters to capture images, write stories, and upload directly to a cloud server." },
    { tag: "Android · iOS", name: "HornbillTV & News11", desc: "Live streaming news apps with real-time video integration and dynamic content delivery on Android and iOS." },
  ],
  experience: [
    { company: "Egreens Firms Pvt Ltd", location: "Gurugram", role: "Full Stack Developer", date: "May 2025 – Present", desc: "Working on Kanteeno (food delivery & kitchen streaming) and K1 Facility Maintenance app. Ionic Angular, authentication, live updates, and real-time socket communication." },
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

/* ── Video Recorder Component ── */
function VideoSection() {
  const [mode, setMode] = useState("idle"); // idle | record | preview | embed | uploaded
  const [stream, setStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [recordedUrl, setRecordedUrl] = useState(null);
  const [embedLink, setEmbedLink] = useState("");
  const [embedUrl, setEmbedUrl] = useState(null);
  const [timer, setTimer] = useState(0);
  const [uploadedLocalUrl, setUploadedLocalUrl] = useState(null);
  const liveRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const stopStream = useCallback(() => {
    if (stream) stream.getTracks().forEach(t => t.stop());
    setStream(null);
    clearInterval(timerRef.current);
  }, [stream]);

  // Start webcam
  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(s);
      setMode("record");
      setTimer(0);
      setTimeout(() => {
        if (liveRef.current) { liveRef.current.srcObject = s; liveRef.current.play(); }
      }, 100);
    } catch {
      alert("Camera/mic permission denied. Please allow access.");
    }
  };

  const startRecording = () => {
    chunksRef.current = [];
    const mr = new MediaRecorder(stream, { mimeType: "video/webm" });
    mr.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
    mr.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setRecordedBlob(blob);
      setRecordedUrl(url);
      setMode("preview");
      stopStream();
    };
    mr.start();
    setMediaRecorder(mr);
    setRecording(true);
    timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setRecording(false);
    clearInterval(timerRef.current);
  };

  const downloadVideo = () => {
    const a = document.createElement("a");
    a.href = recordedUrl;
    a.download = "aman-pandey-intro.webm";
    a.click();
  };

  // File upload handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUploadedLocalUrl(url);
    setMode("uploaded");
  };

  // Embed YouTube/Drive
  const handleEmbed = () => {
    let url = embedLink.trim();
    // Convert YouTube watch URL to embed
    if (url.includes("youtube.com/watch?v=")) {
      const id = url.split("v=")[1].split("&")[0];
      url = `https://www.youtube.com/embed/${id}`;
    } else if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1].split("?")[0];
      url = `https://www.youtube.com/embed/${id}`;
    } else if (url.includes("drive.google.com/file/d/")) {
      const id = url.match(/\/d\/([^/]+)/)?.[1];
      if (id) url = `https://drive.google.com/file/d/${id}/preview`;
    }
    setEmbedUrl(url);
    setMode("embed");
  };

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div>
      {/* ── IDLE STATE ── */}
      {mode === "idle" && (
        <div style={vs.idleBox}>
          <div style={vs.idleTitle}>🎬 Add Your Introduction Video</div>
          <div style={vs.idleOptions}>

            {/* Option 1: Record */}
            <div style={vs.optCard} onClick={startCamera}>
              <div style={vs.optIcon}>📹</div>
              <div style={vs.optLabel}>Record with Webcam</div>
              <div style={vs.optSub}>Use your camera & mic directly in browser</div>
            </div>

            {/* Option 2: Upload file */}
            <label style={vs.optCard}>
              <div style={vs.optIcon}>📁</div>
              <div style={vs.optLabel}>Upload Video File</div>
              <div style={vs.optSub}>MP4, MOV, WebM — from phone or camera</div>
              <input type="file" accept="video/*" style={{ display: "none" }} onChange={handleFileUpload} />
            </label>

            {/* Option 3: Embed link */}
            <div style={vs.optCard} onClick={() => setMode("embedInput")}>
              <div style={vs.optIcon}>🔗</div>
              <div style={vs.optLabel}>Embed YouTube / Drive</div>
              <div style={vs.optSub}>Paste your YouTube or Google Drive link</div>
            </div>
          </div>
        </div>
      )}

      {/* ── EMBED INPUT ── */}
      {mode === "embedInput" && (
        <div style={vs.embedBox}>
          <div style={vs.embedTitle}>🔗 Paste Video Link</div>
          <div style={vs.embedHint}>YouTube link ya Google Drive sharable link paste karo</div>
          <input
            style={vs.embedInput}
            placeholder="https://youtube.com/watch?v=... or https://drive.google.com/..."
            value={embedLink}
            onChange={e => setEmbedLink(e.target.value)}
          />
          <div style={vs.embedBtns}>
            <button style={vs.btnPrimary} onClick={handleEmbed} disabled={!embedLink.trim()}>✅ Embed Video</button>
            <button style={vs.btnOutline} onClick={() => setMode("idle")}>← Back</button>
          </div>
          <div style={vs.embedSteps}>
            <strong>YouTube se kaise link lein:</strong><br />
            1. YouTube pe video open karo → Share → Copy Link<br /><br />
            <strong>Google Drive se kaise link lein:</strong><br />
            1. Drive pe video upload karo<br />
            2. Right click → Share → "Anyone with the link" set karo<br />
            3. Copy link karo aur yahan paste karo
          </div>
        </div>
      )}

      {/* ── LIVE CAMERA / RECORDING ── */}
      {mode === "record" && (
        <div style={vs.recordBox}>
          <video ref={liveRef} muted autoPlay playsInline style={vs.video} />
          <div style={vs.recControls}>
            {!recording ? (
              <button style={vs.btnRecord} onClick={startRecording}>🔴 Start Recording</button>
            ) : (
              <>
                <div style={vs.recTimer}>🔴 {fmt(timer)} — Recording...</div>
                <button style={vs.btnStop} onClick={stopRecording}>⏹ Stop</button>
              </>
            )}
            <button style={vs.btnOutline} onClick={() => { stopStream(); setMode("idle"); }}>✕ Cancel</button>
          </div>
          <div style={vs.scriptMini}>
            💡 Script: "Hello! My name is Aman Pandey and I am a Full Stack Developer with over 4 years of experience in cross-platform mobile and web development.I specialize in Ionic Angular, TypeScript, Node.js, and Socket.IO. I enjoy building complete end-to-end solutions — from designing the frontend to developing the backend and publishing apps on both Android and iOS platforms.Some of my key projects include Kanteeno, a food delivery and live kitchen streaming app; Healaxy, a comprehensive hospital management system with modules like appointments, billing, and pharmacy; and the Jai Maharashtra News App, which features live news streaming.I have successfully published multiple apps on both the App Store and Google Play Store, and I am very comfortable working with real-time features using Socket.IO.I am a collaborative team player who works closely with designers, backend developers, and clients to deliver quality solutions on time.If you are looking for a dedicated developer who can work independently, communicate effectively, and deliver clean results — I am ready to contribute to your team.You can reach me at pandeyaman3157@gmail.com or connect with me on LinkedIn. Thank you!"
          </div>
        </div>
      )}

      {/* ── PREVIEW RECORDED ── */}
      {mode === "preview" && (
        <div style={vs.previewBox}>
          <video src={recordedUrl} controls style={vs.video} />
          <div style={vs.previewBtns}>
            <button style={vs.btnPrimary} onClick={downloadVideo}>⬇ Download Video</button>
            <button style={vs.btnOutline} onClick={() => { setMode("record"); startCamera(); }}>🔄 Re-record</button>
            <button style={vs.btnOutline} onClick={() => setMode("idle")}>✕ Cancel</button>
          </div>
          <div style={vs.downloadNote}>
            ✅ Video download karke YouTube ya Google Drive pe upload karo, phir "Embed" option se link paste karo.
          </div>
        </div>
      )}

      {/* ── UPLOADED LOCAL FILE ── */}
      {mode === "uploaded" && (
        <div style={vs.previewBox}>
          <video src={uploadedLocalUrl} controls style={vs.video} />
          <div style={vs.previewBtns}>
            <button style={vs.btnOutline} onClick={() => setMode("idle")}>🔄 Change Video</button>
          </div>
          <div style={vs.downloadNote}>
            ℹ️ Yeh video sirf is session mein dikhegi. Permanent ke liye YouTube/Drive pe upload karo aur Embed karo.
          </div>
        </div>
      )}

      {/* ── EMBEDDED VIDEO ── */}
      {mode === "embed" && (
        <div style={vs.previewBox}>
          <iframe
            src={embedUrl}
            style={{ ...vs.video, border: "none", borderRadius: 12 }}
            allow="autoplay; fullscreen"
            allowFullScreen
            title="Introduction Video"
          />
          <div style={vs.previewBtns}>
            <button style={vs.btnOutline} onClick={() => { setEmbedUrl(null); setEmbedLink(""); setMode("idle"); }}>🔄 Change Video</button>
          </div>
        </div>
      )}
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
            <div style={styles.avatarInner}>AP</div>
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
              <VideoSection />
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

/* ── Video Styles ── */
const vs = {
  idleBox: { background: "#1a1a26", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 16, padding: 28, marginBottom: 20 },
  idleTitle: { fontSize: 16, fontWeight: 700, marginBottom: 20, textAlign: "center", fontFamily: "Syne, sans-serif" },
  idleOptions: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 },
  optCard: {
    background: "#12121a", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 12,
    padding: 20, textAlign: "center", cursor: "pointer",
    transition: "all 0.2s", display: "block",
    ":hover": { borderColor: "#00e5ff" }
  },
  optIcon: { fontSize: 28, marginBottom: 10 },
  optLabel: { fontSize: 14, fontWeight: 700, marginBottom: 6, fontFamily: "Syne, sans-serif" },
  optSub: { fontSize: 12, color: "#7a7a9a", lineHeight: 1.5 },
  recordBox: { background: "#1a1a26", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 16, padding: 20, marginBottom: 20 },
  previewBox: { background: "#1a1a26", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 16, padding: 20, marginBottom: 20 },
  video: { width: "100%", borderRadius: 10, marginBottom: 16, aspectRatio: "16/9", background: "#000", display: "block" },
  recControls: { display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 14 },
  recTimer: { fontSize: 18, fontWeight: 700, color: "#ff4444", fontFamily: "Syne, sans-serif" },
  btnRecord: { padding: "10px 24px", borderRadius: 8, background: "#ff4444", color: "#fff", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700 },
  btnStop: { padding: "10px 24px", borderRadius: 8, background: "#ff8800", color: "#fff", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700 },
  btnPrimary: { padding: "10px 22px", borderRadius: 8, background: "linear-gradient(135deg,#00e5ff,#7c4dff)", color: "#0a0a0f", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, textDecoration: "none" },
  btnOutline: { padding: "10px 22px", borderRadius: 8, background: "transparent", color: "#e8e8f0", border: "1px solid rgba(0,229,255,0.3)", cursor: "pointer", fontSize: 14, textDecoration: "none" },
  previewBtns: { display: "flex", gap: 12, flexWrap: "wrap" },
  downloadNote: { fontSize: 12, color: "#7a7a9a", marginTop: 12, lineHeight: 1.6, background: "rgba(0,229,255,0.05)", padding: "10px 14px", borderRadius: 8 },
  scriptMini: { fontSize: 12, color: "#7a7a9a", lineHeight: 1.8, borderLeft: "3px solid rgba(0,229,255,0.3)", paddingLeft: 12, marginTop: 4 },
  embedBox: { background: "#1a1a26", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 16, padding: 28, marginBottom: 20 },
  embedTitle: { fontSize: 16, fontWeight: 700, marginBottom: 8, fontFamily: "Syne, sans-serif" },
  embedHint: { fontSize: 13, color: "#7a7a9a", marginBottom: 14 },
  embedInput: { width: "100%", background: "#0a0a0f", border: "1px solid rgba(0,229,255,0.2)", borderRadius: 8, padding: "10px 14px", color: "#e8e8f0", fontSize: 13, marginBottom: 14, boxSizing: "border-box" },
  embedBtns: { display: "flex", gap: 12, marginBottom: 16 },
  embedSteps: { fontSize: 12, color: "#7a7a9a", lineHeight: 2, background: "rgba(124,77,255,0.07)", padding: "14px 16px", borderRadius: 8 },
};

/* ── Main Styles ── */
const styles = {
  root: { background: "#0a0a0f", color: "#e8e8f0", minHeight: "100vh", fontFamily: "'DM Sans','Segoe UI',sans-serif", position: "relative", overflowX: "hidden" },
  gridBg: { position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(0,229,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.03) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none", zIndex: 0 },
  glowBg: { position: "fixed", inset: 0, background: "radial-gradient(ellipse 60% 50% at 20% 20%,rgba(124,77,255,0.07) 0%,transparent 70%),radial-gradient(ellipse 50% 40% at 80% 80%,rgba(0,229,255,0.05) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 },
  container: { maxWidth: 860, margin: "0 auto", padding: "40px 24px 80px", position: "relative", zIndex: 1 },
  hero: { textAlign: "center", padding: "60px 0 40px" },
  avatarRing: { width: 110, height: 110, borderRadius: "50%", background: "linear-gradient(135deg,#00e5ff,#7c4dff)", padding: 3, margin: "0 auto 24px" },
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