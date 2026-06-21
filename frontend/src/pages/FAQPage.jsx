import { useNavigate } from "react-router-dom";
import GettingStartedFAQ from "../components/faq/GettingStartedFAQ";
import PlatformIntegrationFAQ from "../components/faq/PlatformIntegrationFAQ";
import AnalyticsDashboardFAQ from "../components/faq/AnalyticsDashboardFAQ";
import DataPrivacyFAQ from "../components/faq/DataPrivacyFAQ";
import AccountManagementFAQ from "../components/faq/AccountManagementFAQ";
import OpenSourceContribFAQ from "../components/faq/OpenSourceContribFAQ";
import LegalComplianceFAQ from "../components/faq/LegalComplianceFAQ";
import TroubleshootingFAQ from "../components/faq/TroubleshootingFAQ";
import PerformanceFAQ from "../components/faq/PerformanceFAQ";
import CommunityFAQ from "../components/faq/CommunityFAQ";
import RoadmapFAQ from "../components/faq/RoadmapFAQ";
import AccessibilityFAQ from "../components/faq/AccessibilityFAQ";


export default function FAQPage() {

  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/explore");
  };


  return (
    <main className="w-full overflow-x-hidden bg-white text-black">
    
      <section className="border-b-4 border-black px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          
          <div>
            <p className="mb-5 text-xs font-black uppercase tracking-[0.28em] text-black">
              Help Center / FAQ
            </p>

            <h1 className="text-5xl font-black uppercase leading-none tracking-tight text-black sm:text-7xl lg:text-8xl">
              Answers Without The Noise.
            </h1>
          </div>
        
          <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)] sm:p-8 sm:shadow-[10px_10px_0_0_rgba(0,0,0,1)]">

            <p className="text-base font-bold leading-relaxed text-black sm:text-lg">
                Quick answers for developers connecting coding platforms, reading analytics,
                protecting profile data, and contributing to CodeLens.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">

              <span className="border-2 border-black px-3 py-3 text-center text-[11px] font-black uppercase tracking-widest whitespace-nowrap bg-white">
                Getting Started
              </span>

              <span className="border-2 border-black px-3 py-3 text-center text-[11px] font-black uppercase tracking-widest whitespace-nowrap bg-white">
                Platform Integration
              </span>

              <span className="border-2 border-black px-3 py-3 text-center text-[11px] font-black uppercase tracking-widest whitespace-nowrap bg-white">
                Analytics
              </span>

              <span className="border-2 border-black px-3 py-3 text-center text-[11px] font-black uppercase tracking-widest whitespace-nowrap bg-white">
                Privacy
              </span>

              <span className="border-2 border-black px-3 py-3 text-center text-[11px] font-black uppercase tracking-widest whitespace-nowrap bg-white">
                Account Management
              </span>

              <span className="border-2 border-black px-3 py-3 text-center text-[11px] font-black uppercase tracking-widest whitespace-nowrap bg-white">
                Open Source
              </span>

              <span className="border-2 border-black px-3 py-3 text-center text-[11px] font-black uppercase tracking-widest whitespace-nowrap bg-white">
                Legal Compliance
              </span>

              <span className="border-2 border-black px-3 py-3 text-center text-[11px] font-black uppercase tracking-widest whitespace-nowrap bg-white">
                Troubleshooting
              </span>

              <span className="border-2 border-black px-3 py-3 text-center text-[11px] font-black uppercase tracking-widest whitespace-nowrap bg-white">
                Performance
              </span>

              <span className="border-2 border-black px-3 py-3 text-center text-[11px] font-black uppercase tracking-widest whitespace-nowrap bg-white">
                Community
              </span>

              <span className="border-2 border-black px-3 py-3 text-center text-[11px] font-black uppercase tracking-widest whitespace-nowrap bg-white">
                Roadmap
              </span>

              <span className="border-2 border-black px-3 py-3 text-center text-[11px] font-black uppercase tracking-widest whitespace-nowrap bg-white">
                Accessibility
              </span>

            </div>
          </div>
        </div>

      </section>
      <GettingStartedFAQ />
      <PlatformIntegrationFAQ />
      <AnalyticsDashboardFAQ />
      <DataPrivacyFAQ />
      <AccountManagementFAQ />
      <OpenSourceContribFAQ />
      <LegalComplianceFAQ />
      <TroubleshootingFAQ />
      <PerformanceFAQ />
      <CommunityFAQ />
      <RoadmapFAQ />
      <AccessibilityFAQ />

      

      <section className="border-t-4 border-black bg-black px-6 py-14 text-white sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.28em]">
              All Caught Up?
            </p>
            <h2 className="text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl">
              Head Back To The Platform.
            </h2>
          </div>
          <button
            type="button"
            onClick={handleGoBack}
            className="inline-flex border-4 border-white px-8 py-5 text-sm font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black"
          >
            Go Back
          </button>
        </div>
      </section>
    </main>
  );
}