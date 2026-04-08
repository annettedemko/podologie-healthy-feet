import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageGuard } from "@/i18n";
import Layout from "@/components/Layout";
import Home from "./pages/Home";
import Leistungen from "./pages/Leistungen";
import Standorte from "./pages/Standorte";
import Booking from "./pages/Booking";
import UeberUns from "./pages/UeberUns";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Kontakt from "./pages/Kontakt";
import FAQ from "./pages/FAQ";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import NotFound from "./pages/NotFound";
import { LocationAugsburg, LocationMuenchen } from "./pages/LocationDetail";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="clinic-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Redirect root to /de/ */}
              <Route path="/" element={<Navigate to="/de/" replace />} />

              {/* Language-prefixed routes */}
              <Route path="/:lang" element={<LanguageGuard />}>
                <Route element={<Layout />}>
                  <Route index element={<Home />} />

                  {/* Services - DE/EN/RU slugs */}
                  <Route path="leistungen" element={<Leistungen />} />
                  <Route path="services" element={<Leistungen />} />
                  <Route path="uslugi" element={<Leistungen />} />

                  {/* Locations */}
                  <Route path="standorte" element={<Standorte />} />
                  <Route path="locations" element={<Standorte />} />
                  <Route path="lokatsii" element={<Standorte />} />

                  {/* Location Detail - Augsburg */}
                  <Route path="standorte/augsburg" element={<LocationAugsburg />} />
                  <Route path="locations/augsburg" element={<LocationAugsburg />} />
                  <Route path="lokatsii/augsburg" element={<LocationAugsburg />} />

                  {/* Location Detail - München */}
                  <Route path="standorte/muenchen" element={<LocationMuenchen />} />
                  <Route path="locations/munich" element={<LocationMuenchen />} />
                  <Route path="lokatsii/myunkhen" element={<LocationMuenchen />} />

                  {/* Booking */}
                  <Route path="termin" element={<Booking />} />
                  <Route path="appointment" element={<Booking />} />
                  <Route path="zapis" element={<Booking />} />

                  {/* About */}
                  <Route path="ueber-uns" element={<UeberUns />} />
                  <Route path="about-us" element={<UeberUns />} />
                  <Route path="o-nas" element={<UeberUns />} />

                  {/* Blog */}
                  <Route path="blog" element={<Blog />} />
                  <Route path="blog/:slug" element={<BlogArticle />} />

                  {/* Contact */}
                  <Route path="kontakt" element={<Kontakt />} />
                  <Route path="contact" element={<Kontakt />} />
                  <Route path="kontakty" element={<Kontakt />} />

                  {/* FAQ */}
                  <Route path="faq" element={<FAQ />} />
                  <Route path="voprosy" element={<FAQ />} />

                  {/* Imprint */}
                  <Route path="impressum" element={<Impressum />} />
                  <Route path="imprint" element={<Impressum />} />

                  {/* Privacy */}
                  <Route path="datenschutz" element={<Datenschutz />} />
                  <Route path="privacy-policy" element={<Datenschutz />} />
                  <Route path="politika-konfidentsialnosti" element={<Datenschutz />} />

                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Route>

              {/* Catch-all: redirect to /de/ */}
              <Route path="*" element={<Navigate to="/de/" replace />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
