import { analyticsDashboardFaqs } from "../../data/faqs/analyticsDashboard";

export default function AnalyticsDashboardFAQ() {
  return (
    <section
      aria-labelledby="analytics-title"
      className="py-20 px-6 sm:px-10 lg:px-16 bg-white text-black border-b-4 border-black"
    >

      <div className="mx-auto max-w-7xl">

        <h2
          id="analytics-title"
          className="text-4xl font-black uppercase mb-8"
        >
          Analytics Dashboard
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {analyticsDashboardFaqs.map((faq) => (

            <div
              key={faq.id}
              className="border-4 border-black p-6 bg-black text-white shadow-[8px_8px_0_0_rgba(0,0,0,1)]"
            >

              <h3 className="text-xl font-black uppercase">
                {faq.q}
              </h3>

              <p className="mt-4 text-sm leading-relaxed font-bold normal-case">
                {faq.a}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}