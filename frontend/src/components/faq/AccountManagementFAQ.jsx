import { accountManagementFaqs } from "../../data/faqs/accountManagement";

export default function AccountManagementFAQ() {
  return (
    <section
      aria-labelledby="account-title"
      className="py-20 px-6 sm:px-10 lg:px-16 bg-white text-black border-b-4 border-black"
    >

      <div className="mx-auto max-w-7xl">

        <h2
          id="account-title"
          className="text-4xl font-black uppercase mb-8"
        >
          Account Management
        </h2>

        <div className="space-y-6">

          {accountManagementFaqs.map((faq) => (

            <div
              key={faq.id}
              className="border-4 border-black p-6 bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)]"
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