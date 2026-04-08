import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage, languages, type Language, resolveRouteKey, getLocalizedPath } from "@/i18n";

export default function LanguageSwitcher() {
  const { lang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const switchLanguage = (newLang: Language) => {
    if (newLang === lang) return;

    // Extract current slug from pathname (remove /:lang/ prefix)
    const slug = location.pathname.replace(`/${lang}/`, "").replace(`/${lang}`, "");
    const resolved = resolveRouteKey(slug);

    if (resolved) {
      const newPath = getLocalizedPath(resolved.routeKey, newLang, resolved.params);
      navigate(newPath + location.hash);
    } else {
      navigate(`/${newLang}/`);
    }
  };

  return (
    <div className="flex items-center gap-0.5 rounded-full bg-muted/50 p-0.5">
      {languages.map((l) => (
        <button
          key={l}
          onClick={() => switchLanguage(l)}
          className={`px-2 py-1 text-xs font-medium rounded-full transition-all ${
            l === lang
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label={l.toUpperCase()}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
