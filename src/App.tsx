import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/layout/Hero";
import Catalog from "./components/layout/Catalog/Catalog";
import BugReport from "./components/features/BugReport";
import NotFound from "./NotFound";
import "./App.css";
import About from "./About";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import { initParallax } from "./assets/ts/parallax";

import Boom1 from "./assets/boom1.svg";
import Boom2 from "./assets/boom2.svg";

function App() {
  useEffect(() => {
    return initParallax();
  }, []);
  return (
    <BrowserRouter>
      <Analytics />
      <SpeedInsights />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <img
                src={Boom1}
                alt="Boom"
                className="w-96 absolute top-128 -right-16 -z-1 parallax will-change-transform pointer-events-none"
                data-speed="0.25"
              />
              <img
                src={Boom2}
                alt="Boom"
                className="w-96 absolute top-64 -left-16 -z-1 parallax will-change-transform pointer-events-none"
                data-speed="0.25"
              />

              <Hero />
              <Catalog />
              <BugReport />
            </>
          }
        />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
