import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <header
      style={{
        ...styles.header,
        background: scrolled
          ? "rgba(10,10,15,0.95)"
          : "rgba(10,10,15,0.75)",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.4)" : "none",
      }}
    >
      {/* Logo */}
      <Link to="/" style={styles.logo}>
        <div style={styles.logoIcon}>AP</div>
        <span style={styles.logoText}>Aman Pandey</span>
      </Link>

      {/* Desktop Nav */}
      <nav style={styles.nav}>
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              ...styles.navLink,
              color:
                location.pathname === link.to ? "#a78bfa" : "rgba(255,255,255,0.65)",
              borderBottom:
                location.pathname === link.to
                  ? "2px solid #6c63ff"
                  : "2px solid transparent",
            }}
          >
            {link.label}
          </Link>
        ))}

        <a href="mailto:pandeyaman3157@gmail.com" style={styles.hirBtn}>
          Hire Me
        </a>
      </nav>

      {/* Mobile Hamburger */}
      <button
        style={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span style={{ ...styles.bar, transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
        <span style={{ ...styles.bar, opacity: menuOpen ? 0 : 1 }} />
        <span style={{ ...styles.bar, transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                ...styles.mobileLink,
                color: location.pathname === link.to ? "#a78bfa" : "#e8e8f0",
              }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="mailto:pandeyaman3157@gmail.com"
            style={{ ...styles.hirBtn, marginTop: "8px", display: "inline-block" }}
            onClick={() => setMenuOpen(false)}
          >
            Hire Me
          </a>
        </div>
      )}
    </header>
  );
}

const styles = {
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 48px",
    height: "68px",
    backdropFilter: "blur(16px)",
    borderBottom: "1px solid rgba(108,99,255,0.12)",
    transition: "background 0.3s, box-shadow 0.3s",
  },

  /* Logo */
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
  },
  logoIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #6c63ff, #ff6584)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.82rem",
    fontWeight: "900",
    color: "#fff",
    letterSpacing: "0.02em",
    flexShrink: 0,
  },
  logoText: {
    fontFamily: "Georgia, serif",
    fontSize: "1.15rem",
    fontWeight: "700",
    color: "#e8e8f0",
    letterSpacing: "0.01em",
  },

  /* Desktop Nav */
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  navLink: {
    textDecoration: "none",
    fontSize: "0.9rem",
    fontWeight: "500",
    padding: "6px 14px",
    letterSpacing: "0.03em",
    transition: "color 0.2s",
    paddingBottom: "4px",
  },
  hirBtn: {
    marginLeft: "8px",
    padding: "8px 20px",
    background: "linear-gradient(135deg, #6c63ff, #9b59f5)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "0.88rem",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none",
    boxShadow: "0 4px 16px rgba(108,99,255,0.35)",
    transition: "opacity 0.2s",
  },

  /* Hamburger */
  hamburger: {
    display: "none",
    flexDirection: "column",
    gap: "5px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
  },
  bar: {
    display: "block",
    width: "22px",
    height: "2px",
    background: "#e8e8f0",
    borderRadius: "2px",
    transition: "all 0.3s",
  },

  /* Mobile Menu */
  mobileMenu: {
    position: "absolute",
    top: "68px",
    left: 0,
    right: 0,
    background: "rgba(10,10,15,0.97)",
    backdropFilter: "blur(16px)",
    borderBottom: "1px solid rgba(108,99,255,0.15)",
    display: "flex",
    flexDirection: "column",
    padding: "16px 24px 24px",
    gap: "4px",
  },
  mobileLink: {
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "500",
    padding: "10px 0",
    borderBottom: "1px solid rgba(108,99,255,0.08)",
    transition: "color 0.2s",
  },
};

// Inject responsive CSS for hamburger
const styleTag = document.createElement("style");
styleTag.innerHTML = `
  @media (max-width: 640px) {
    header { padding: 0 20px !important; }
    header nav { display: none !important; }
    button[aria-label="Toggle menu"] { display: flex !important; }
  }
`;
document.head.appendChild(styleTag);

export default Header;