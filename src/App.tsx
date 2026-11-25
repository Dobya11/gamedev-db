import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import BugReport from "./components/features/BugReport";
import NotFound from "./NotFound";
import "./App.css";
import About from "./About";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import { initParallax } from "./assets/ts/parallax";

import Database from "./Database";
import Hero from "./components/layout/Hero";
import FeaturedCarousel from "./components/features/FeaturedCarousel";
import SearchButton from "./components/features/Search";
function App() {
  useEffect(() => {
    return initParallax();
  }, []);
  return (
    <BrowserRouter>
      <Analytics />
      <SpeedInsights />
      <Header />
      <main className="flex flex-1 flex-col">
        <Routes>
          <Route path="database" element={<Database />} />
          <Route
            path="/"
            element={
              <>
                <Hero />
                <SearchButton />
                <FeaturedCarousel />
              </>
            }
          />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BugReport />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
