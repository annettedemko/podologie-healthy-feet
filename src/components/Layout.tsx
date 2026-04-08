import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ClinicHeader from "@/components/ClinicHeader";
import ClinicFooter from "@/components/ClinicFooter";
import CookieConsent from "@/components/CookieConsent";
import StructuredData from "@/components/StructuredData";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function Layout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ScrollToTop />
      <StructuredData type="organization" />
      <ClinicHeader />
      <main className="flex-1 pt-[calc(1.875rem+4rem)] md:pt-[calc(1.875rem+5rem)]">
        <Outlet />
      </main>
      <ClinicFooter />
      <CookieConsent />
    </div>
  );
}
