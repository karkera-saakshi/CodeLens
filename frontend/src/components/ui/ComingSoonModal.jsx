import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function ComingSoonModal({ isOpen, onClose, featureName }) {
  const closeButtonRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Store the element that was focused before modal opened
    const previouslyFocused = document.activeElement;

    // Prevent background scroll
    document.body.style.overflow = "hidden";

    // Focus the close button when modal opens
    closeButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Focus trap — keep Tab inside modal
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Restore background scroll
      document.body.style.overflow = "";
      // Restore focus to the element that opened the modal
      if (previouslyFocused) {
        previouslyFocused.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="coming-soon-title"
      aria-describedby="coming-soon-desc"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-white border-4 border-black shadow-[16px_16px_0_0_rgba(0,0,0,1)] p-8 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-150"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {/* Status badge */}
        <span className="inline-block text-[10px] font-black tracking-widest border-2 border-black px-2 py-1 mb-6">
          COMING SOON
        </span>

        {/* Title */}
        <h2
          id="coming-soon-title"
          className="text-3xl sm:text-4xl font-black uppercase tracking-tighter leading-none text-black mb-4"
        >
          {featureName}
        </h2>

        {/* Description */}
        <p
          id="coming-soon-desc"
          className="text-sm font-bold text-black uppercase tracking-wide leading-relaxed mb-8"
        >
          We're building this out. CodeLens unifies your competitive
          programming journey across GitHub, LeetCode &amp; Codeforces —
          with AI-driven insights, zero noise. Check back soon, or explore
          what's already live below.
        </p>

        {/* Quick links */}
        <div className="flex flex-col gap-4 border-t-4 border-black pt-6">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-black">
            In the meantime, explore
          </h3>
          <div className="flex flex-wrap gap-4">
            {[
              { to: "/explore", label: "Explore" },
              { to: "/faq", label: "FAQ" },
              { to: "/about", label: "About" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={onClose}
                className="text-sm font-black uppercase tracking-widest text-black hover:underline underline-offset-8 decoration-[3px] hover:opacity-60 transition-opacity"
              >
                {l.label} →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}