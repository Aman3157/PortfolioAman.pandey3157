import React, { useState } from "react";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    const mailto = `mailto:pandeyaman3157@gmail.com?subject=${encodeURIComponent(
      form.subject || "Portfolio Inquiry"
    )}&body=${encodeURIComponent(
      `Hi Aman,\n\nMy name is ${form.name}.\n\n${form.message}\n\nFrom: ${form.email}`
    )}`;
    window.open(mailto, "_blank");
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const contactItems = [
    {
      icon: "📧",
      label: "Email",
      value: "pandeyaman3157@gmail.com",
      link: "mailto:pandeyaman3157@gmail.com",
      bg: "rgba(108,99,255,0.12)",
    },
    {
      icon: "📞",
      label: "Phone",
      value: "+91 6392387249",
      link: "tel:+916392387249",
      bg: "rgba(67,233,123,0.1)",
    },
    {
      icon: "💼",
      label: "LinkedIn",
      value: "aman-pandey-a3868419a",
      link: "https://www.linkedin.com/in/aman-pandey-a3868419a/",
      bg: "rgba(96,165,250,0.1)",
    },
    {
      icon: "📍",
      label: "Location",
      value: "Noida, India",
      link: null,
      bg: "rgba(255,101,132,0.1)",
    },
  ];

  return (
    <div style={styles.page}>
      {/* Background */}
      <div style={styles.heroBg} />

      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.headSection}>
          <p style={styles.sectionLabel}>Let's Talk</p>
          <h1 style={styles.sectionTitle}>Contact Me</h1>
          <div style={styles.divider} />
          <p style={styles.subtitle}>
            Open to new opportunities, collaborations, or just a friendly chat.
            My inbox is always open!
          </p>
        </div>

        {/* Content Grid */}
        <div style={styles.grid}>
          {/* Left — Info Cards */}
          <div style={styles.leftCol}>
            {contactItems.map((item) => (
              <ContactCard key={item.label} item={item} />
            ))}

            {/* Availability Badge */}
            <div style={styles.availBadge}>
              <span style={styles.availDot} />
              <span>Available for Freelance & Full-Time roles</span>
            </div>

            {/* Skills quick */}
            <div style={styles.skillBox}>
              <p style={styles.skillTitle}>Core Skills</p>
              <div style={styles.skillTags}>
                {["Ionic", "Angular", "React", "Node.js", "MySQL", "MongoDB", "Socket.IO", "TypeScript", "REST APIs"].map((s) => (
                  <span key={s} style={styles.skillTag}>{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div style={styles.formBox}>
            <h3 style={styles.formTitle}>Send a Message</h3>

            {sent && (
              <div style={styles.successMsg}>
                ✅ Opening your email client... Talk soon!
              </div>
            )}

            <div style={styles.formGroup}>
              <label style={styles.label}>Your Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                style={styles.input}
                onFocus={(e) => (e.target.style.borderColor = "#6c63ff")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(108,99,255,0.2)")}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                style={styles.input}
                onFocus={(e) => (e.target.style.borderColor = "#6c63ff")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(108,99,255,0.2)")}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Subject</label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Project Inquiry / Job Offer"
                style={styles.input}
                onFocus={(e) => (e.target.style.borderColor = "#6c63ff")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(108,99,255,0.2)")}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or opportunity..."
                style={styles.textarea}
                onFocus={(e) => (e.target.style.borderColor = "#6c63ff")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(108,99,255,0.2)")}
              />
            </div>

            <button style={styles.submitBtn} onClick={handleSubmit}>
              Send Message 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactCard({ item }) {
  const [hovered, setHovered] = useState(false);

  const content = (
    <div
      style={{
        ...styles.contactCard,
        borderColor: hovered ? "rgba(108,99,255,0.45)" : "rgba(108,99,255,0.15)",
        transform: hovered ? "translateX(6px)" : "translateX(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ ...styles.contactIcon, background: item.bg }}>{item.icon}</div>
      <div>
        <div style={styles.contactLabel}>{item.label}</div>
        <div style={styles.contactValue}>{item.value}</div>
      </div>
      {item.link && <span style={styles.arrow}>→</span>}
    </div>
  );

  return item.link ? (
    <a href={item.link} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
      {content}
    </a>
  ) : (
    content
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0a0a0f",
    paddingTop: "88px",
    paddingBottom: "60px",
    position: "relative",
    overflow: "hidden",
  },
  heroBg: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(ellipse 60% 50% at 10% 20%, rgba(108,99,255,0.12) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 90% 80%, rgba(255,101,132,0.08) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  wrapper: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 24px",
    position: "relative",
    zIndex: 1,
  },

  /* Head */
  headSection: { textAlign: "center", marginBottom: "56px" },
  sectionLabel: {
    fontSize: "0.75rem",
    letterSpacing: "0.15em",
    fontWeight: "600",
    color: "#6c63ff",
    textTransform: "uppercase",
    marginBottom: "8px",
  },
  sectionTitle: {
    fontFamily: "Georgia, serif",
    fontSize: "clamp(2rem, 5vw, 3rem)",
    fontWeight: "900",
    color: "#e8e8f0",
    marginBottom: "12px",
  },
  divider: {
    width: "48px",
    height: "3px",
    background: "linear-gradient(90deg, #6c63ff, #ff6584)",
    borderRadius: "2px",
    margin: "0 auto 20px",
  },
  subtitle: {
    color: "#7a7a9a",
    fontSize: "1rem",
    lineHeight: "1.7",
    maxWidth: "480px",
    margin: "0 auto",
  },

  /* Grid */
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1.2fr",
    gap: "32px",
    alignItems: "start",
  },
  leftCol: { display: "flex", flexDirection: "column", gap: "12px" },

  /* Contact Card */
  contactCard: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "14px 16px",
    background: "#16161f",
    border: "1px solid rgba(108,99,255,0.15)",
    borderRadius: "12px",
    transition: "border-color 0.3s, transform 0.3s",
    cursor: "pointer",
    position: "relative",
  },
  contactIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
    flexShrink: 0,
  },
  contactLabel: { fontSize: "0.75rem", color: "#5a5a7a", fontWeight: "600", marginBottom: "2px", textTransform: "uppercase", letterSpacing: "0.06em" },
  contactValue: { fontSize: "0.93rem", color: "#e8e8f0", fontWeight: "500" },
  arrow: { marginLeft: "auto", color: "#6c63ff", fontSize: "1rem", flexShrink: 0 },

  /* Availability */
  availBadge: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 16px",
    background: "rgba(67,233,123,0.07)",
    border: "1px solid rgba(67,233,123,0.2)",
    borderRadius: "12px",
    fontSize: "0.85rem",
    color: "#43e97b",
    fontWeight: "500",
    marginTop: "4px",
  },
  availDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#43e97b",
    flexShrink: 0,
    boxShadow: "0 0 8px #43e97b",
    animation: "pulse 2s infinite",
  },

  /* Skills */
  skillBox: {
    padding: "16px",
    background: "#16161f",
    border: "1px solid rgba(108,99,255,0.15)",
    borderRadius: "12px",
    marginTop: "4px",
  },
  skillTitle: { fontSize: "0.78rem", color: "#7a7a9a", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" },
  skillTags: { display: "flex", flexWrap: "wrap", gap: "6px" },
  skillTag: {
    background: "rgba(108,99,255,0.1)",
    border: "1px solid rgba(108,99,255,0.2)",
    borderRadius: "4px",
    padding: "3px 10px",
    fontSize: "0.73rem",
    color: "#a78bfa",
    fontWeight: "500",
  },

  /* Form */
  formBox: {
    background: "#16161f",
    border: "1px solid rgba(108,99,255,0.15)",
    borderRadius: "16px",
    padding: "32px",
  },
  formTitle: {
    fontFamily: "Georgia, serif",
    fontSize: "1.4rem",
    fontWeight: "700",
    color: "#e8e8f0",
    marginBottom: "24px",
  },
  successMsg: {
    background: "rgba(67,233,123,0.1)",
    border: "1px solid rgba(67,233,123,0.3)",
    borderRadius: "8px",
    padding: "12px 16px",
    color: "#43e97b",
    fontSize: "0.88rem",
    marginBottom: "16px",
  },
  formGroup: { display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px" },
  label: { fontSize: "0.82rem", color: "#7a7a9a", fontWeight: "500" },
  input: {
    background: "#0a0a0f",
    border: "1px solid rgba(108,99,255,0.2)",
    borderRadius: "8px",
    padding: "10px 14px",
    color: "#e8e8f0",
    fontSize: "0.95rem",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.3s",
  },
  textarea: {
    background: "#0a0a0f",
    border: "1px solid rgba(108,99,255,0.2)",
    borderRadius: "8px",
    padding: "10px 14px",
    color: "#e8e8f0",
    fontSize: "0.95rem",
    outline: "none",
    fontFamily: "inherit",
    height: "130px",
    resize: "vertical",
    transition: "border-color 0.3s",
  },
  submitBtn: {
    width: "100%",
    padding: "13px",
    background: "linear-gradient(135deg, #6c63ff, #9b59f5)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 20px rgba(108,99,255,0.4)",
    marginTop: "4px",
    transition: "opacity 0.2s",
  },
};

export default Contact;