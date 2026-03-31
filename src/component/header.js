import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { generateAIContent } from "../services/userService";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResult("");
    try {
      const res = await generateAIContent(prompt);
      setResult(res.data.data);
    } catch {
      setResult("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Allow Enter key to submit
  const handleKeyDown = (e) => {
    if (e.key === "Enter") generate();
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close AI panel when clicking outside
  useEffect(() => {
    const close = (e) => {
      if (aiOpen && !e.target.closest(".ai-panel") && !e.target.closest(".ai-btn")) {
        setAiOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [aiOpen]);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Contact", to: "/contact" },
     { label: "About", to: "/about" },
      // { label: "Video Editor", to: "/video" },
  
  ];

  return (
    <>
      <style>{`
        .header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
          height: 68px;
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(108,99,255,0.12);
          transition: background 0.3s, box-shadow 0.3s;
        }
        .logo {
          display: flex; align-items: center; gap: 10px; text-decoration: none;
        }
        .logo-icon {
          width: 36px; height: 36px; border-radius: 8px;
          background: linear-gradient(135deg, #6c63ff, #ff6584);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.82rem; font-weight: 900; color: #fff;
          letter-spacing: 0.02em; flex-shrink: 0;
        }
        .logo-text {
          font-family: Georgia, serif; font-size: 1.15rem;
          font-weight: 700; color: #e8e8f0; letter-spacing: 0.01em;
        }
        .desktop-nav {
          display: flex; align-items: center; gap: 8px;
        }
        .nav-link {
          text-decoration: none; font-size: 0.9rem; font-weight: 500;
          padding: 6px 14px 4px; letter-spacing: 0.03em; transition: color 0.2s;
        }
        .hire-btn {
          margin-left: 8px; padding: 8px 20px;
          background: linear-gradient(135deg, #6c63ff, #9b59f5);
          color: #fff; border: none; border-radius: 8px;
          font-size: 0.88rem; font-weight: 600; cursor: pointer;
          text-decoration: none; box-shadow: 0 4px 16px rgba(108,99,255,0.35);
          transition: opacity 0.2s;
        }
        .hire-btn:hover { opacity: 0.85; }

        /* ── AI Button ── */
        .ai-btn {
          margin-left: 6px; padding: 8px 14px;
          background: rgba(108,99,255,0.15);
          border: 1px solid rgba(108,99,255,0.35);
          color: #a78bfa; border-radius: 8px;
          font-size: 0.85rem; font-weight: 600; cursor: pointer;
          display: flex; align-items: center; gap: 6px;
          transition: background 0.2s;
        }
        .ai-btn:hover { background: rgba(108,99,255,0.28); }

        /* ── AI Dropdown Panel ── */
        .ai-panel {
          position: absolute;
          top: 76px; right: 48px;
          width: 360px;
          background: #16161f;
          border: 1px solid rgba(108,99,255,0.25);
          border-radius: 14px;
          padding: 20px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.5);
          z-index: 2000;
          animation: fadeSlideDown 0.2s ease;
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ai-panel-title {
          font-size: 0.8rem; font-weight: 700; color: #7a7a9a;
          text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;
        }
        .ai-input {
          width: 100%; box-sizing: border-box;
          background: #0a0a0f;
          border: 1px solid rgba(108,99,255,0.2);
          border-radius: 8px; padding: 10px 12px;
          color: #e8e8f0; font-size: 0.9rem;
          outline: none; font-family: inherit;
          transition: border-color 0.2s;
          resize: none;
        }
        .ai-input:focus { border-color: #6c63ff; }
        .ai-generate-btn {
          margin-top: 10px; width: 100%; padding: 10px;
          background: linear-gradient(135deg, #6c63ff, #9b59f5);
          color: #fff; border: none; border-radius: 8px;
          font-size: 0.9rem; font-weight: 600; cursor: pointer;
          transition: opacity 0.2s;
        }
        .ai-generate-btn:disabled { opacity: 0.55; cursor: not-allowed; }
        .ai-generate-btn:hover:not(:disabled) { opacity: 0.85; }
        .ai-result {
          margin-top: 14px; padding: 12px;
          background: rgba(108,99,255,0.07);
          border: 1px solid rgba(108,99,255,0.15);
          border-radius: 8px;
          color: #c4c4e0; font-size: 0.88rem; line-height: 1.6;
          max-height: 180px; overflow-y: auto;
          white-space: pre-wrap;
        }
        .ai-loading {
          margin-top: 12px; text-align: center;
          color: #6c63ff; font-size: 0.85rem;
          animation: pulse 1.2s infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

        /* ── Hamburger ── */
        .hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .bar {
          display: block; width: 22px; height: 2px;
          background: #e8e8f0; border-radius: 2px; transition: all 0.3s;
        }

        /* ── Mobile Menu ── */
        .mobile-menu {
          position: absolute; top: 68px; left: 0; right: 0;
          background: rgba(10,10,15,0.97);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(108,99,255,0.15);
          display: flex; flex-direction: column;
          padding: 16px 24px 24px; gap: 4px;
        }
        .mobile-link {
          text-decoration: none; font-size: 1rem; font-weight: 500;
          padding: 10px 0; border-bottom: 1px solid rgba(108,99,255,0.08);
          transition: color 0.2s;
        }

        /* ── Mobile AI section inside menu ── */
        .mobile-ai {
          margin-top: 14px; padding-top: 14px;
          border-top: 1px solid rgba(108,99,255,0.12);
        }
        .mobile-ai-title {
          font-size: 0.75rem; font-weight: 700; color: #7a7a9a;
          text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px;
        }

        @media (max-width: 640px) {
          .header { padding: 0 20px !important; }
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
          .ai-panel { right: 16px; left: 16px; width: auto; top: 76px; }
        }
      `}</style>

      <header
        className="header"
        style={{
          background: scrolled ? "rgba(10,10,15,0.95)" : "rgba(10,10,15,0.75)",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.4)" : "none",
        }}
      >
        {/* Logo */}
        <Link to="/" className="logo">
          <div className="logo-icon">AP</div>
          <span className="logo-text">Aman Pandey</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="nav-link"
              style={{
                color: location.pathname === link.to ? "#a78bfa" : "rgba(255,255,255,0.65)",
                borderBottom: location.pathname === link.to ? "2px solid #6c63ff" : "2px solid transparent",
              }}
            >
              {link.label}
            </Link>
          ))}

          {/* ✨ AI Button */}
          <button className="ai-btn" onClick={() => setAiOpen(!aiOpen)}>
            ✨ Ask AI
          </button>

          <a href="mailto:pandeyaman3157@gmail.com" className="hire-btn">
            Hire Me
          </a>
        </nav>

        {/* ✨ AI Dropdown Panel */}
        {aiOpen && (
          <div className="ai-panel">
            <p className="ai-panel-title">✨ AI Assistant</p>
            <textarea
              className="ai-input"
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything… (Enter to send)"
            />
            <button
              className="ai-generate-btn"
              onClick={generate}
              disabled={loading || !prompt.trim()}
            >
              {loading ? "Generating…" : "Generate ✨"}
            </button>
            {loading && <p className="ai-loading">Thinking…</p>}
            {result && <div className="ai-result">{result}</div>}
          </div>
        )}

        {/* Mobile Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="bar" style={{ transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
          <span className="bar" style={{ opacity: menuOpen ? 0 : 1 }} />
          <span className="bar" style={{ transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
        </button>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="mobile-menu">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="mobile-link"
                style={{ color: location.pathname === link.to ? "#a78bfa" : "#e8e8f0" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="mailto:pandeyaman3157@gmail.com"
              className="hire-btn"
              style={{ marginTop: "10px", display: "inline-block" }}
              onClick={() => setMenuOpen(false)}
            >
              Hire Me
            </a>

            {/* AI inside mobile menu */}
            <div className="mobile-ai">
              <p className="mobile-ai-title">✨ AI Assistant</p>
              <textarea
                className="ai-input"
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything…"
              />
              <button
                className="ai-generate-btn"
                onClick={generate}
                disabled={loading || !prompt.trim()}
              >
                {loading ? "Generating…" : "Generate ✨"}
              </button>
              {loading && <p className="ai-loading">Thinking…</p>}
              {result && <div className="ai-result">{result}</div>}
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;