import { legalComplianceFaqs } from "../../data/faqs/legalCompliance";

export default function LegalComplianceFAQ() {
  return (
    <section
      aria-labelledby="legal-title"
      className="py-20 px-6 sm:px-10 lg:px-16 bg-white text-black border-b-4 border-black"
    >

      <div className="mx-auto max-w-7xl">

        <h2
          id="legal-title"
          className="text-4xl font-black uppercase mb-8"
        >
          Legal Compliance
        </h2>

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10">

          <div>
            <p className="text-sm font-black uppercase tracking-widest mb-4">
              Policy • Terms • License
            </p>

            <p className="text-base font-bold leading-relaxed normal-case">
              CodeLens follows transparent policies around privacy,
              open-source licensing, user rights, and responsible data handling.
            </p>
          </div>

          <div className="space-y-6">

            {legalComplianceFaqs.map((faq) => (
              <div
                key={faq.id}
                className="border-4 border-black p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
              >

                <h3 className="text-xl font-black uppercase">
                  {faq.q}
                </h3>

                <p className="mt-4 font-bold leading-relaxed normal-case">
                  {faq.a}
                </p>

              </div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}