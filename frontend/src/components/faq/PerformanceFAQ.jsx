import { performanceFaqs } from "../../data/faqs/performance";

export default function PerformanceFAQ() {
  return (
    <section
      aria-labelledby="performance-title"
      className="py-20 px-6 sm:px-10 lg:px-16 bg-white text-black border-b-4 border-black"
    >
      <div className="mx-auto max-w-7xl">

        <h2
          id="performance-title"
          className="text-4xl font-black uppercase mb-8"
        >
          Performance
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {performanceFaqs.map((faq) => (
            <div
              key={faq.id}
              className="border-4 border-black p-8 bg-white shadow-[10px_10px_0_0_rgba(0,0,0,1)]"
            >
              <h3 className="text-2xl font-black uppercase">
                {faq.q}
              </h3>

              <div className="border-t-4 border-black mt-4 pt-4">
                <p className="text-base font-bold leading-relaxed normal-case">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}