import { gettingStartedFaqs } from "../../data/faqs/gettingStarted";

export default function GettingStartedFAQ() {
  return (
    <section
      aria-labelledby="getting-started-title"
      className="py-20 px-6 sm:px-10 lg:px-16 bg-white text-black border-b-4 border-black"
    >
      <div className="mx-auto max-w-7xl"> 

        <div className="mb-14">
          <h2
            id="getting-started-title"
            className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none"
          >
            Getting Started
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {gettingStartedFaqs.map((faq) => (
            <div
              key={faq.id}
              className="border-4 border-black p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)]"
            >
              <h3 className="text-2xl font-black uppercase">
                {faq.q}
              </h3>

              <p className="mt-4 text-base font-bold leading-relaxed normal-case">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

      </div>   
    </section>
  );
}