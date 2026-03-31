import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const getUserDisplayName = () => {
    if (!user) return "";
    return user.name ? user.name.toUpperCase() : user.email ? user.email.split("@")[0].toUpperCase() : "";
  };

  const getUserInitial = () => {
    if (!user) return "";
    if (user.name) return user.name.charAt(0).toUpperCase();
    if (user.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b-4 border-black">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 md:px-8 md:py-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl sm:text-2xl md:text-3xl font-black tracking-tighter uppercase text-black hover:text-gray-800 truncate"
          onClick={closeMenu}
        >
          CODELENS
        </Link>

        {/* Hamburger Button - Mobile Only */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] focus:outline-none"
          aria-label="Toggle menu"
        >
          <span
            className={`w-8 h-1 bg-black transition-transform duration-200 origin-center ${
              isMenuOpen ? "rotate-45 translate-y-[10px]" : ""
            }`}
          />
          <span
            className={`w-8 h-1 bg-black transition-opacity duration-200 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-8 h-1 bg-black transition-transform duration-200 origin-center ${
              isMenuOpen ? "-rotate-45 -translate-y-[10px]" : ""
            }`}
          />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-sm font-black uppercase tracking-widest text-black hover:underline underline-offset-8 decoration-4"
              >
                LOGIN
              </Link>
              <Link
                to="/signup"
                className="px-8 py-4 bg-black text-white text-sm font-black uppercase tracking-widest hover:bg-gray-900 transition-colors border-4 border-black rounded-none"
              >
                SIGN UP
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 flex items-center justify-center bg-black text-white font-black text-sm">
                  {getUserInitial()}
                </span>
                <span className="text-sm font-bold uppercase tracking-wide text-black">
                  {getUserDisplayName()}
                </span>
              </div>
              <Link
                to="/dashboard"
                className="text-sm font-black uppercase tracking-widest text-black hover:underline underline-offset-8 decoration-4"
              >
                DASHBOARD
              </Link>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-white text-black text-sm font-black uppercase tracking-widest hover:bg-gray-100 transition-colors border-4 border-black rounded-none"
              >
                LOGOUT
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden w-full bg-white border-b-4 border-black">
          <div className="flex flex-col px-4 sm:px-6 py-4 gap-2">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="text-sm font-black uppercase tracking-widest text-black hover:underline underline-offset-8 decoration-4 py-3 min-h-[44px] flex items-center"
                >
                  LOGIN
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="px-8 py-3 bg-black text-white text-sm font-black uppercase tracking-widest hover:bg-gray-900 transition-colors border-4 border-black rounded-none text-center min-h-[44px] flex items-center justify-center"
                >
                  SIGN UP
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 py-3 border-b-4 border-black pb-4 min-h-[44px]">
                  <span className="w-10 h-10 flex items-center justify-center bg-black text-white font-black text-lg">
                    {getUserInitial()}
                  </span>
                  <span className="text-sm font-bold uppercase tracking-wide text-black">
                    {getUserDisplayName()}
                  </span>
                </div>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="text-sm font-black uppercase tracking-widest text-black hover:underline underline-offset-8 decoration-4 py-3 min-h-[44px] flex items-center"
                >
                  DASHBOARD
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 bg-white text-black text-sm font-black uppercase tracking-widest hover:bg-gray-100 transition-colors border-4 border-black rounded-none min-h-[44px]"
                >
                  LOGOUT
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
