import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import PageTransition from "@/components/PageTransition";
import { useLanguage, LocalizedLink } from "@/i18n";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <PageTransition>
      <SEOHead
        title={t("notFound.seoTitle")}
        description={t("notFound.seoDescription")}
        path="/404"
      />

      <section className="py-32 text-center">
        <div className="max-w-md mx-auto px-4">
          <h1 className="text-7xl font-serif font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            {t("notFound.title")}
          </h2>
          <p className="text-muted-foreground mb-8">
            {t("notFound.description")}
          </p>
          <LocalizedLink to="home">
            <Button className="rounded-full px-8 gap-2">
              <ArrowLeft className="w-4 h-4" /> {t("notFound.backHome")}
            </Button>
          </LocalizedLink>
        </div>
      </section>
    </PageTransition>
  );
}
