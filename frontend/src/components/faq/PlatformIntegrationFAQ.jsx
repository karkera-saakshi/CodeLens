import { platformIntegrationFaqs } from "../../data/faqs/platformIntegration";
import FAQAccordion from "./FAQAccordion";

export default function PlatformIntegrationFAQ() {
  return (
    <section
      id="platform-integration"
      aria-labelledby="platform-title"
      className="py-20 px-6 sm:px-10 lg:px-16 bg-white text-black border-b-4 border-black"
    >

      <div className="mx-auto max-w-7xl">

        <h2
          id="platform-title"
          className="text-4xl font-black uppercase mb-8"
        >
          Platform Integrations
        </h2>

        <FAQAccordion faqs={platformIntegrationFaqs} />

      </div>

    </section>
  );
}