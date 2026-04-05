import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// ─── Mega Menu Data ────────────────────────────────────────────────────────────
const MEGA_MENU_ITEMS = [
  {
    label: "Practice CP",
    desc: "Curated competitive programming problems by topic & difficulty",
    icon: "⌥",
    tag: "HOT",
    to: "/practice",
  },
  {
    label: "Project Ideas",
    desc: "AI-generated project concepts matched to your skill stack",
    icon: "◈",
    tag: null,
    to: null,
  },
  {
    label: "Doctor CP",
    desc: "Talk to your personal CP strategist — diagnose weak spots, prescribe drills",
    icon: "⊕",
    tag: "AI",
    to: null,
  },
  {
    label: "Interview Prep",
    desc: "Structured DSA + system design roadmaps for top-tier placements",
    icon: "⌬",
    tag: null,
    to: null,
  },
  {
    label: "Doctor Dev",
    desc: "Full-stack & open-source mentorship — from syntax to architecture",
    icon: "⊞",
    tag: "AI",
    to: null,
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileMegaOpen, setMobileMegaOpen] = useState(false);
  const megaRef = useRef(null);
  const megaTriggerRef = useRef(null);
  const megaLeaveTimer = useRef(null);

  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Close mega menu on route change
  useEffect(() => {
    setMegaOpen(false);
    setIsMenuOpen(false);
    setMobileMegaOpen(false);
  }, [location.pathname]);

  // Close mega on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        megaRef.current &&
        !megaRef.current.contains(e.target) &&
        megaTriggerRef.current &&
        !megaTriggerRef.current.contains(e.target)
      ) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen((v) => !v);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setMobileMegaOpen(false);
  };

  const getUserDisplayName = () => {
    if (!user) return "";
    return user.name
      ? user.name.toUpperCase()
      : user.email
      ? user.email.split("@")[0].toUpperCase()
      : "";
  };

  const getUserInitial = () => {
    if (!user) return "";
    if (user.name) return user.name.charAt(0).toUpperCase();
    if (user.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  // Hover intent — stay open when moving cursor from trigger to panel
  const handleMegaMouseEnter = () => {
    clearTimeout(megaLeaveTimer.current);
    setMegaOpen(true);
  };

  const handleMegaMouseLeave = () => {
    megaLeaveTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

  const isActive = (path) => location.pathname === path;

  const linkCls = (path) =>
    `text-sm font-black uppercase tracking-widest transition-all duration-150 ${
      isActive(path)
        ? "text-black underline underline-offset-8 decoration-4 decoration-black"
        : "text-black hover:underline underline-offset-8 decoration-4 decoration-black"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b-4 border-black">
      {/* ── Main Row ── */}
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 md:py-4 gap-4">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="text-xl sm:text-2xl font-black tracking-tighter uppercase text-black hover:opacity-70 transition-opacity flex-shrink-0"
        >
          CODELENS
        </Link>

        {/* ── Desktop Centre Nav ── */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {isAuthenticated && (
            <Link to="/dashboard" className={linkCls("/dashboard")}>
              Dashboard
            </Link>
          )}
          <Link to="/explore" className={linkCls("/explore")}>
            Explore
          </Link>
          {isAuthenticated && (
            <Link to="/codeforces" className={linkCls("/codeforces")}>
              Codeforces
            </Link>
          )}

          {/* ── Tools Mega Menu Trigger ── */}
          <div
            className="relative"
            onMouseEnter={handleMegaMouseEnter}
            onMouseLeave={handleMegaMouseLeave}
          >
            <button
              ref={megaTriggerRef}
              className={`text-sm font-black uppercase tracking-widest text-black flex items-center gap-1 transition-all duration-150 hover:underline underline-offset-8 decoration-4 decoration-black focus:outline-none ${
                megaOpen ? "underline underline-offset-8 decoration-4 decoration-black" : ""
              }`}
              aria-haspopup="true"
              aria-expanded={megaOpen}
            >
              Tools
              <span
                className="inline-block transition-transform duration-200 text-xs"
                style={{ transform: megaOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                ▾
              </span>
            </button>

            {/* ── Mega Menu Panel ── */}
            {megaOpen && (
              <div
                ref={megaRef}
                onMouseEnter={handleMegaMouseEnter}
                onMouseLeave={handleMegaMouseLeave}
                className="absolute top-full left-1/2 mt-[18px] w-[640px] bg-white border-4 border-black z-50"
                style={{ transform: "translateX(-50%)" }}
              >
                {/* Top accent bar */}
                <div className="h-[3px] w-full bg-black" />

                <div className="p-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 border-b-2 border-black pb-3">
                    AI-Powered Tools — GSSoC '26
                  </p>
                  <div className="grid grid-cols-2 gap-0">
                    {MEGA_MENU_ITEMS.map((item, i) => {
                      const Wrapper = item.to ? Link : "button";
                      return (
                        <Wrapper
                          key={item.label}
                          to={item.to}
                          onClick={closeMenu}
                          className={`group text-left p-4 border-black transition-colors duration-150 hover:bg-black hover:text-white ${
                            i % 2 === 0 ? "border-r-2" : ""
                          } ${i < MEGA_MENU_ITEMS.length - 2 ? "border-b-2" : ""}`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-base font-black leading-none">{item.icon}</span>
                            <span className="text-sm font-black uppercase tracking-widest">
                              {item.label}
                            </span>
                            {item.tag && (
                              <span className="text-[9px] font-black tracking-widest border-2 border-current px-[5px] py-[1px] leading-tight">
                                {item.tag}
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-bold tracking-wide leading-snug opacity-60 group-hover:opacity-80 pl-6">
                            {item.desc}
                          </p>
                        </Wrapper>
                      );
                    })}
                  </div>

                  {/* Footer strip */}
                  <div className="mt-4 pt-3 border-t-2 border-black flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-500">
                      More tools shipping soon
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest border-b-2 border-black hover:opacity-60 cursor-pointer">
                      View All →
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Desktop Right Controls ── */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-4 flex-shrink-0">
          {/* VELA — AI Chatbot */}
          <Link
            to="/vela-ai"
            className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-black uppercase tracking-widest border-4 border-black hover:bg-white hover:text-black transition-colors duration-150"
            title="VELA — Your personal AI guide. Powered by everything you've built."
          >
            <span className="text-base leading-none">✦</span>
            VELA
          </Link>

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-sm font-black uppercase tracking-widest text-black hover:underline underline-offset-8 decoration-4 decoration-black"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 bg-black text-white text-sm font-black uppercase tracking-widest border-4 border-black hover:bg-white hover:text-black transition-colors duration-150"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 border-l-4 border-black pl-4">
                <span className="w-7 h-7 flex items-center justify-center bg-black text-white font-black text-xs flex-shrink-0">
                  {getUserInitial()}
                </span>
                <span className="text-xs font-black uppercase tracking-wide text-black max-w-[90px] truncate">
                  {getUserDisplayName()}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-white text-black text-sm font-black uppercase tracking-widest border-4 border-black hover:bg-black hover:text-white transition-colors duration-150"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* ── Mobile Right: VELA + Hamburger ── */}
        <div className="lg:hidden flex items-center gap-3">
          <Link
            to="/vela-ai"
            className="flex items-center gap-1 px-3 py-2 bg-black text-white text-xs font-black uppercase tracking-widest border-2 border-black hover:bg-white hover:text-black transition-colors duration-150"
            title="VELA AI"
          >
            <span>✦</span>
            VELA
          </Link>
          <button
            onClick={toggleMenu}
            className="flex flex-col justify-center items-center w-10 h-10 gap-[6px] border-2 border-black focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span
              className={`w-6 h-[2px] bg-black transition-transform duration-200 origin-center ${
                isMenuOpen ? "rotate-45 translate-y-[8px]" : ""
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-black transition-opacity duration-200 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-black transition-transform duration-200 origin-center ${
                isMenuOpen ? "-rotate-45 -translate-y-[8px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {isMenuOpen && (
        <div className="lg:hidden w-full bg-white border-t-4 border-black">
          <div className="flex flex-col">
            {/* Nav links */}
            {isAuthenticated && (
              <Link
                to="/dashboard"
                onClick={closeMenu}
                className="px-5 py-4 text-sm font-black uppercase tracking-widest text-black border-b-2 border-black hover:bg-black hover:text-white transition-colors duration-150 flex items-center justify-between"
              >
                Dashboard <span className="opacity-40">→</span>
              </Link>
            )}
            <Link
              to="/explore"
              onClick={closeMenu}
              className="px-5 py-4 text-sm font-black uppercase tracking-widest text-black border-b-2 border-black hover:bg-black hover:text-white transition-colors duration-150 flex items-center justify-between"
            >
              Explore <span className="opacity-40">→</span>
            </Link>
            {isAuthenticated && (
              <Link
                to="/codeforces"
                onClick={closeMenu}
                className="px-5 py-4 text-sm font-black uppercase tracking-widest text-black border-b-2 border-black hover:bg-black hover:text-white transition-colors duration-150 flex items-center justify-between"
              >
                Codeforces <span className="opacity-40">→</span>
              </Link>
            )}

            {/* Tools accordion */}
            <button
              onClick={() => setMobileMegaOpen((v) => !v)}
              className="px-5 py-4 text-sm font-black uppercase tracking-widest text-black border-b-2 border-black hover:bg-gray-50 transition-colors duration-150 flex items-center justify-between w-full text-left"
            >
              <span>Tools</span>
              <span
                className="transition-transform duration-200 text-xs"
                style={{ transform: mobileMegaOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                ▾
              </span>
            </button>

            {mobileMegaOpen && (
              <div className="border-b-2 border-black bg-gray-50">
                {MEGA_MENU_ITEMS.map((item) => {
                  const Wrapper = item.to ? Link : "button";
                  return (
                    <Wrapper
                      key={item.label}
                      to={item.to}
                      onClick={closeMenu}
                      className="w-full text-left px-8 py-3 border-b border-black/10 hover:bg-black hover:text-white transition-colors duration-150 group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black">{item.icon}</span>
                        <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                        {item.tag && (
                          <span className="text-[9px] font-black tracking-widest border border-current px-1 leading-tight">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-bold tracking-wide text-gray-500 group-hover:text-white mt-0.5 pl-6 leading-snug">
                        {item.desc}
                      </p>
                    </Wrapper>
                  );
                })}
              </div>
            )}

            {/* Auth section */}
            {!isAuthenticated ? (
              <div className="flex flex-col gap-0">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="px-5 py-4 text-sm font-black uppercase tracking-widest text-black border-b-2 border-black hover:bg-black hover:text-white transition-colors duration-150 flex items-center justify-between"
                >
                  Login <span className="opacity-40">→</span>
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="px-5 py-4 bg-black text-white text-sm font-black uppercase tracking-widest border-b-2 border-black hover:bg-gray-900 transition-colors duration-150 text-center"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-0">
                <div className="px-5 py-4 border-b-2 border-black flex items-center gap-3 bg-gray-50">
                  <span className="w-9 h-9 flex items-center justify-center bg-black text-white font-black text-base flex-shrink-0">
                    {getUserInitial()}
                  </span>
                  <span className="text-sm font-black uppercase tracking-wide text-black">
                    {getUserDisplayName()}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-5 py-4 text-sm font-black uppercase tracking-widest text-black border-b-2 border-black hover:bg-black hover:text-white transition-colors duration-150 text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
