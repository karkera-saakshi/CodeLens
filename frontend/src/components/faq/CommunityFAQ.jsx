import FAQAccordion from "./FAQAccordion";
import { communityFaqs } from "../../data/faqs/community";

export default function CommunityFAQ() {
  return (
    <section
      aria-labelledby="community-title"
      className="py-20 px-6 sm:px-10 lg:px-16 bg-white text-black border-b-4 border-black"
    >

      <div className="mx-auto max-w-7xl">

        <h2
          id="community-title"
          className="text-4xl font-black uppercase mb-8"
        >
          Community Support
        </h2>

        <div className="border-4 border-black p-6 mb-10 bg-black text-white shadow-[8px_8px_0_0_rgba(0,0,0,1)]">

          <p className="text-sm font-black uppercase tracking-widest mb-4">
            Community First
          </p>

          <p className="text-base font-bold leading-relaxed normal-case">
            CodeLens grows through open-source contributors, developer feedback,
            bug reports, and collaborative community support.
          </p>

        </div>

        <FAQAccordion faqs={communityFaqs} />

      </div> {/* CLOSE WRAPPER */}

    </section>
  );
}