import FAQAccordion from "./FAQAccordion";
import { troubleshootingFaqs } from "../../data/faqs/troubleshooting";

export default function TroubleshootingFAQ() {
  return (
    <section
      id="troubleshooting"
      aria-labelledby="troubleshooting-title"
      className="py-20 px-6 sm:px-10 lg:px-16 bg-white text-black border-b-4 border-black"
    >

      <div className="mx-auto max-w-7xl">

        <h2
          id="troubleshooting-title"
          className="text-4xl font-black uppercase mb-8"
        >
          Troubleshooting
        </h2>

        <FAQAccordion faqs={troubleshootingFaqs} />

      </div>

    </section>
  );
}