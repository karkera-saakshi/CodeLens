import FAQAccordion from "./FAQAccordion";
import { roadmapFaqs } from "../../data/faqs/roadmap";

export default function RoadmapFAQ() {
  return (
    <section
      aria-labelledby="roadmap-title"
      className="py-20 px-6 sm:px-10 lg:px-16 bg-white text-black border-b-4 border-black"
    >
      <div className="mx-auto max-w-7xl">

        <h2
          id="roadmap-title"
          className="text-4xl font-black uppercase mb-8"
        >
          Roadmap & Future Features
        </h2>

        <FAQAccordion faqs={roadmapFaqs} />

      </div>

    </section>
  );
}