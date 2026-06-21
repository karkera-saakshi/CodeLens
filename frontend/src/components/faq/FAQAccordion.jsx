import { useState } from "react";

export default function FAQAccordion({ faqs = [] }) {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (index) => {
    setOpenIdx(openIdx === index ? null : index);
  };

  return (
    <div className="space-y-6">
      {faqs.map((item, index) => {
        const isOpen = openIdx === index;
        const buttonId = `faq-button-${item.id}`;
        const panelId = `faq-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all"
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between text-left"
              aria-expanded={isOpen}
              aria-controls={panelId}
              id={buttonId}
            >
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                {item.q}
              </h3>

              <span className="text-3xl font-black">
                {isOpen ? "-" : "+"}
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`${isOpen ? "mt-4 block" : "hidden"}`}
            >
                <p className="border-t-2 border-black pt-4 text-base font-bold leading-relaxed text-gray-700">
                  {item.a}
                </p>
              
            </div>
      </div>
      );
    })}
  </div>
  );
}