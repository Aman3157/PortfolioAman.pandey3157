import React, { useState,useEffect } from "react";

import { getUsers } from "../services/userService";

function Contact() {
   const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
  console.log("Users State:", users);
}, [users]);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      console.log("API Response:", res);       // full response
      console.log("Users Data:", res.data); 

      setUsers(res.data);
      console.log(users);
      
    } catch (error) {
      console.log(error);
    }
  };
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
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .contact-page {
          min-height: 100vh;
          background: #0a0a0f;
          padding-top: 88px;
          padding-bottom: 60px;
          position: relative;
          overflow: hidden;
        }

        .contact-hero-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 10% 20%, rgba(108,99,255,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 90% 80%, rgba(255,101,132,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .contact-wrapper {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        .contact-head {
          text-align: center;
          margin-bottom: 56px;
        }

        .section-label {
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          font-weight: 600;
          color: #6c63ff;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .section-title {
          font-family: Georgia, serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 900;
          color: #e8e8f0;
          margin-bottom: 12px;
        }

        .divider {
          width: 48px;
          height: 3px;
          background: linear-gradient(90deg, #6c63ff, #ff6584);
          border-radius: 2px;
          margin: 0 auto 20px;
        }

        .subtitle {
          color: #7a7a9a;
          font-size: 1rem;
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto;
        }

        /* Grid: 2 cols on desktop, 1 col on mobile */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 32px;
          align-items: start;
        }

        .left-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* Contact Card */
        .contact-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          background: #16161f;
          border: 1px solid rgba(108,99,255,0.15);
          border-radius: 12px;
          transition: border-color 0.3s, transform 0.3s;
          cursor: pointer;
          position: relative;
          text-decoration: none;
        }

        .contact-card:hover {
          border-color: rgba(108,99,255,0.45);
          transform: translateX(6px);
        }

        .contact-icon {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .contact-label {
          font-size: 0.75rem;
          color: #5a5a7a;
          font-weight: 600;
          margin-bottom: 2px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .contact-value {
          font-size: 0.93rem;
          color: #e8e8f0;
          font-weight: 500;
          word-break: break-all;
        }

        .contact-arrow {
          margin-left: auto;
          color: #6c63ff;
          font-size: 1rem;
          flex-shrink: 0;
        }

        /* Availability */
        .avail-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background: rgba(67,233,123,0.07);
          border: 1px solid rgba(67,233,123,0.2);
          border-radius: 12px;
          font-size: 0.85rem;
          color: #43e97b;
          font-weight: 500;
          margin-top: 4px;
        }

        .avail-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #43e97b;
          flex-shrink: 0;
          box-shadow: 0 0 8px #43e97b;
          animation: pulse 2s infinite;
        }

        /* Skills */
        .skill-box {
          padding: 16px;
          background: #16161f;
          border: 1px solid rgba(108,99,255,0.15);
          border-radius: 12px;
          margin-top: 4px;
        }

        .skill-title {
          font-size: 0.78rem;
          color: #7a7a9a;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 10px;
        }

        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .skill-tag {
          background: rgba(108,99,255,0.1);
          border: 1px solid rgba(108,99,255,0.2);
          border-radius: 4px;
          padding: 3px 10px;
          font-size: 0.73rem;
          color: #a78bfa;
          font-weight: 500;
        }

        /* Form */
        .form-box {
          background: #16161f;
          border: 1px solid rgba(108,99,255,0.15);
          border-radius: 16px;
          padding: 32px;
        }

        .form-title {
          font-family: Georgia, serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #e8e8f0;
          margin-bottom: 24px;
        }

        .success-msg {
          background: rgba(67,233,123,0.1);
          border: 1px solid rgba(67,233,123,0.3);
          border-radius: 8px;
          padding: 12px 16px;
          color: #43e97b;
          font-size: 0.88rem;
          margin-bottom: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
        }

        .form-label {
          font-size: 0.82rem;
          color: #7a7a9a;
          font-weight: 500;
        }

        .form-input {
          background: #0a0a0f;
          border: 1px solid rgba(108,99,255,0.2);
          border-radius: 8px;
          padding: 10px 14px;
          color: #e8e8f0;
          font-size: 0.95rem;
          outline: none;
          font-family: inherit;
          transition: border-color 0.3s;
          width: 100%;
          box-sizing: border-box;
          /* Better tap target on mobile */
          min-height: 44px;
        }

        .form-input:focus {
          border-color: #6c63ff;
        }

        .form-textarea {
          background: #0a0a0f;
          border: 1px solid rgba(108,99,255,0.2);
          border-radius: 8px;
          padding: 10px 14px;
          color: #e8e8f0;
          font-size: 0.95rem;
          outline: none;
          font-family: inherit;
          height: 130px;
          resize: vertical;
          transition: border-color 0.3s;
          width: 100%;
          box-sizing: border-box;
        }

        .form-textarea:focus {
          border-color: #6c63ff;
        }

        .submit-btn {
          width: 100%;
          padding: 13px;
          background: linear-gradient(135deg, #6c63ff, #9b59f5);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(108,99,255,0.4);
          margin-top: 4px;
          transition: opacity 0.2s;
          /* Good tap target on mobile */
          min-height: 48px;
        }

        .submit-btn:hover {
          opacity: 0.88;
        }

        /* ─── MOBILE ─── */
        @media (max-width: 768px) {
          .contact-page {
            padding-top: 64px;
            padding-bottom: 40px;
          }

          .contact-wrapper {
            padding: 0 16px;
          }

          .contact-head {
            margin-bottom: 36px;
          }

          /* Stack grid to single column, form goes first on mobile */
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          /* Reorder: form on top, info cards below */
          .form-box {
            order: -1;
            padding: 24px 20px;
          }

          .left-col {
            gap: 10px;
          }

          /* Slightly smaller cards on mobile */
          .contact-card:hover {
            transform: none; /* Disable slide-in on touch */
          }

          .contact-value {
            font-size: 0.85rem;
          }

          .form-title {
            font-size: 1.2rem;
            margin-bottom: 18px;
          }

          .avail-badge {
            font-size: 0.8rem;
          }
        }

        /* ─── SMALL MOBILE ─── */
        @media (max-width: 380px) {
          .contact-wrapper {
            padding: 0 12px;
          }

          .form-box {
            padding: 18px 14px;
          }

          .contact-card {
            padding: 12px;
            gap: 10px;
          }

          .contact-icon {
            width: 36px;
            height: 36px;
            font-size: 1rem;
          }
        }
      `}</style>

      <div className="contact-page">
        <div className="contact-hero-bg" />

        <div className="contact-wrapper">
          {/* Header */}
          <div className="contact-head">
            <p className="section-label">Let's Talk</p>
            <h1 className="section-title">Contact Me</h1>
            <div className="divider" />
            <p className="subtitle">
              Open to new opportunities, collaborations, or just a friendly chat.
              My inbox is always open!
            </p>
          </div>

          {/* Content Grid */}
          <div className="contact-grid">
            {/* Left — Info Cards */}
            <div className="left-col">
              {contactItems.map((item) => (
                <ContactCard key={item.label} item={item} />
              ))}

              {/* Availability Badge */}
              <div className="avail-badge">
                <span className="avail-dot" />
                <span>Available for Freelance &amp; Full-Time roles</span>
              </div>

              {/* Skills */}
              <div className="skill-box">
                <p className="skill-title">Core Skills</p>
                <div className="skill-tags">
                  {["Ionic", "Angular", "React", "Node.js", "MySQL", "MongoDB", "Socket.IO", "TypeScript", "REST APIs"].map((s) => (
                    <span key={s} className="skill-tag">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="form-box">
              <h3 className="form-title">Send a Message</h3>

              {sent && (
                <div className="success-msg">
                  ✅ Opening your email client... Talk soon!
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  className="form-input"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  autoComplete="name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  className="form-input"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  autoComplete="email"
                  inputMode="email"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  className="form-input"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry / Job Offer"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  className="form-textarea"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              <button className="submit-btn" onClick={handleSubmit}>
                Send Message 🚀
              </button>
            </div>
          </div>
        </div>
         <h3 style={{color:"#fff", marginTop:"40px"}}>Users List</h3>

<table style={{width:"100%", borderCollapse:"collapse", color:"#fff"}}>
  <thead>
    <tr style={{background:"#16161f"}}>
      <th style={{border:"1px solid #333", padding:"8px"}}>#</th>
      <th style={{border:"1px solid #333", padding:"8px"}}>Name</th>
      <th style={{border:"1px solid #333", padding:"8px"}}>Email</th>
      <th style={{border:"1px solid #333", padding:"8px"}}>Mobile</th>
      <th style={{border:"1px solid #333", padding:"8px"}}>userId</th>
    </tr>
  </thead>

  <tbody>
    {users.map((user, index) => (
      <tr key={user._id}>
        <td style={{border:"1px solid #333", padding:"8px"}}>{index + 1}</td>
        <td style={{border:"1px solid #333", padding:"8px"}}>{user?.name}</td>
        <td style={{border:"1px solid #333", padding:"8px"}}>{user?.email}</td>
        <td style={{border:"1px solid #333", padding:"8px"}}>{user?.contactNo}</td>
        <td style={{border:"1px solid #333", padding:"8px"}}>{user?.userId}</td>
      </tr>
    ))}
  </tbody>
</table>
      </div>
  
    </>
  );
}

function ContactCard({ item }) {
  const inner = (
    <div className="contact-card" style={{ textDecoration: "none" }}>
      <div className="contact-icon" style={{ background: item.bg }}>{item.icon}</div>
      <div style={{ minWidth: 0 }}>
        <div className="contact-label">{item.label}</div>
        <div className="contact-value">{item.value}</div>
      </div>
      {item.link && <span className="contact-arrow">→</span>}
    </div>
  );

  return item.link ? (
    <a href={item.link} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
      {inner}
    </a>
  ) : (
    inner
  );
}

export default Contact;