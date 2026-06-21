import { openSourceContribFaqs } from "../../data/faqs/openSourceContrib";
import FAQAccordion from "./FAQAccordion";

export default function OpenSourceContribFAQ() {
  return (
    <section
      aria-labelledby="opensource-title"
      className="py-20 px-6 sm:px-10 lg:px-16 bg-white text-black border-b-4 border-black"
    >

      <div className="mx-auto max-w-7xl">

        <h2
          id="opensource-title"
          className="text-4xl font-black uppercase mb-8"
        >
          Open Source Contribution
        </h2>

        <FAQAccordion faqs={openSourceContribFaqs} />

      </div> 

    </section>
  );
}