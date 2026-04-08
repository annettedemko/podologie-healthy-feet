import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import PageTransition from "@/components/PageTransition";
import { faqs } from "@/data/faq";
import { useLanguage, LocalizedLink, getLocalizedPath } from "@/i18n";

export default function FAQ() {
  const { t, lang } = useLanguage();

  const faqData = {
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.translations[lang].question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.translations[lang].answer,
      },
    })),
  };

  return (
    <PageTransition>
      <SEOHead
        title={t("faq.seoTitle")}
        description={t("faq.seoDescription")}
        path={getLocalizedPath("faq", lang)}
        routeKey="faq"
      />
      <StructuredData type="faqPage" data={faqData} />

      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-12">
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
              {t("faq.label")}
            </p>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              {t("faq.title")}
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              {t("faq.description")}
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-border"
                >
                  <AccordionTrigger className="text-left text-sm md:text-base font-medium hover:no-underline py-5">
                    {faq.translations[lang].question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground pb-5">
                    {faq.translations[lang].answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.2} className="mt-16">
            <div className="glass-card rounded-2xl p-8 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t("faq.moreQuestionsTitle")}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t("faq.moreQuestionsDesc")}
              </p>
              <LocalizedLink to="contact">
                <Button className="rounded-full px-8 gap-2">
                  {t("faq.contactButton")} <ArrowRight className="w-4 h-4" />
                </Button>
              </LocalizedLink>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </PageTransition>
  );
}
