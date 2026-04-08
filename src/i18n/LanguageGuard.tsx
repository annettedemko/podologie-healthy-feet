import { Navigate, Outlet, useParams } from "react-router-dom";
import { LanguageProvider } from "./context";
import type { Language } from "./types";
import { languages } from "./types";

export default function LanguageGuard() {
  const { lang } = useParams<{ lang: string }>();

  if (!lang || !languages.includes(lang as Language)) {
    return <Navigate to="/de/" replace />;
  }

  return (
    <LanguageProvider lang={lang as Language}>
      <Outlet />
    </LanguageProvider>
  );
}
