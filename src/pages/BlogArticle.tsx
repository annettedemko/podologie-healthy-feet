import { useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import PageTransition from "@/components/PageTransition";
import { blogPosts } from "@/data/blog";
import { useLanguage, LocalizedLink, getLocalizedPath } from "@/i18n";

export default function BlogArticle() {
  const { slug } = useParams();
  const { t, lang } = useLanguage();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to={`/${lang}/blog`} replace />;

  const tr = post.translations[lang];
  const dateLocale = lang === "de" ? "de-DE" : lang === "ru" ? "ru-RU" : "en-US";

  const articleData = {
    headline: tr.title,
    datePublished: post.date,
    description: tr.metaDescription,
    author: {
      "@type": "Organization",
      name: "Healthy Feet Podologie",
    },
    publisher: {
      "@type": "Organization",
      name: "Healthy Feet Podologie",
    },
  };

  return (
    <PageTransition>
      <SEOHead
        title={tr.title}
        description={tr.metaDescription}
        path={getLocalizedPath("blogArticle", lang, { slug: post.slug })}
        type="article"
        routeKey="blogArticle"
        routeParams={{ slug: post.slug }}
      />
      <StructuredData type="article" data={articleData} />

      <article className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <AnimateOnScroll>
            <LocalizedLink
              to="blog"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> {t("blogArticle.backToBlog")}
            </LocalizedLink>
          </AnimateOnScroll>

          {/* Header */}
          <AnimateOnScroll>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                  {tr.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" /> {tr.readTime}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(post.date).toLocaleDateString(dateLocale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground leading-tight">
                {tr.title}
              </h1>
            </div>
          </AnimateOnScroll>

          {/* Cover image */}
          <AnimateOnScroll delay={0.1}>
            <div className="rounded-2xl overflow-hidden mb-10">
              <img
                src={post.image}
                alt={tr.title}
                className="w-full aspect-[16/9] object-cover"
              />
            </div>
          </AnimateOnScroll>

          {/* Content */}
          <AnimateOnScroll delay={0.2}>
            <div className="prose prose-lg max-w-none text-foreground prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-primary">
              {tr.content.split("\n\n").map((block, i) => {
                if (block.startsWith("## ")) {
                  return <h2 key={i} className="text-2xl font-bold mt-10 mb-4">{block.replace("## ", "")}</h2>;
                }
                if (block.startsWith("### ")) {
                  return <h3 key={i} className="text-xl font-semibold mt-8 mb-3">{block.replace("### ", "")}</h3>;
                }
                if (block.startsWith("- ")) {
                  const items = block.split("\n").filter(Boolean);
                  return (
                    <ul key={i} className="list-disc pl-6 space-y-2 mb-4">
                      {items.map((item, j) => (
                        <li key={j} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item.replace(/^- /, "")) }} />
                      ))}
                    </ul>
                  );
                }
                if (block.match(/^\d+\. /)) {
                  const items = block.split("\n").filter(Boolean);
                  return (
                    <ol key={i} className="list-decimal pl-6 space-y-2 mb-4">
                      {items.map((item, j) => (
                        <li key={j} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item.replace(/^\d+\.\s*/, "")) }} />
                      ))}
                    </ol>
                  );
                }
                return <p key={i} className="mb-4" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(block) }} />;
              })}
            </div>
          </AnimateOnScroll>

          {/* CTA */}
          <AnimateOnScroll delay={0.3} className="mt-16">
            <div className="glass-card rounded-2xl p-8 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {t("blogArticle.ctaTitle")}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t("blogArticle.ctaDescription")}
              </p>
              <LocalizedLink to="booking">
                <Button className="rounded-full px-8 gap-2">
                  {t("blogArticle.ctaButton")} <ArrowRight className="w-4 h-4" />
                </Button>
              </LocalizedLink>
            </div>
          </AnimateOnScroll>
        </div>
      </article>
    </PageTransition>
  );
}

function formatInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}
