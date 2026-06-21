import FAQAccordion from "./FAQAccordion";
import { dataPrivacyFaqs } from "../../data/faqs/dataPrivacy";

export default function DataPrivacyFAQ() {
  return (
    <section
      aria-labelledby="privacy-title"
      className="py-20 px-6 sm:px-10 lg:px-16 bg-white text-black border-b-4 border-black"
    >

      <div className="mx-auto max-w-7xl">

        <h2
          id="privacy-title"
          className="text-4xl font-black uppercase mb-8"
        >
          Data Privacy & Security
        </h2>

        <div className="border-4 border-black p-6 mb-10 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">

          <p className="text-sm font-black uppercase tracking-widest mb-3">
            Privacy Commitment
          </p>

          <p className="text-base font-bold leading-relaxed normal-case">
            CodeLens is designed to prioritize secure platform integrations,
            responsible data handling, and transparent privacy practices for developers.
          </p>

        </div>

        <FAQAccordion faqs={dataPrivacyFaqs} />

      </div> {/* CLOSE WRAPPER */}

    </section>
  );
}