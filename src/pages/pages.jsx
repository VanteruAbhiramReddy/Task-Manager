import PageFrame from "../components/PageFrame.jsx";
import DashboardSection from "../components/DashboardSection.jsx";

export function LandingPage() {
  return (
    <PageFrame>
      <DashboardSection />
    </PageFrame>
  );
}

export function LoginForm() {
  return (
    <PageFrame>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <p className="text-lg text-slate-700">Login form coming soon.</p>
      </div>
    </PageFrame>
  );
}