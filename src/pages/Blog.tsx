import { useState } from "react";
import { Clock, ArrowRight } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import SEOHead from "@/components/SEOHead";
import PageTransition from "@/components/PageTransition";
import { blogPosts, blogCategories } from "@/data/blog";
import { useLanguage, LocalizedLink, getLocalizedPath } from "@/i18n";

export default function Blog() {
  const { t, lang } = useLanguage();
  const categories = blogCategories[lang];
  const allLabel = categories[0]; // "Alle" / "All" / "Все"
  const [category, setCategory] = useState(allLabel);

  const filtered =
    category === allLabel
      ? blogPosts
      : blogPosts.filter((p) => p.translations[lang].category === category);

  return (
    <PageTransition>
      <SEOHead
        title={t("blog.seoTitle")}
        description={t("blog.seoDescription")}
        path={getLocalizedPath("blog", lang)}
        routeKey="blog"
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
              {t("blog.label")}
            </p>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              {t("blog.title")}
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              {t("blog.description")}
            </p>
          </AnimateOnScroll>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  category === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Article grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => {
              const tr = post.translations[lang];
              return (
                <AnimateOnScroll key={post.slug} delay={i * 0.06}>
                  <LocalizedLink
                    to="blogArticle"
                    params={{ slug: post.slug }}
                    className="glass-card rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-500 block h-full"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={post.image}
                        alt={tr.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          {tr.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" /> {tr.readTime}
                        </span>
                      </div>
                      <h2 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {tr.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {tr.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-1 text-sm text-primary font-medium">
                        {t("blog.readMore")} <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </LocalizedLink>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
