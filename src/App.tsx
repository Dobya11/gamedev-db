import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Hero from "./components/layout/Hero";
import Catalog from "./components/layout/Catalog/Catalog";
import BugReport from "./components/features/BugReport";
import NotFound from "./NotFound";
import "./App.css";
import About from "./About";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";


import Boom1 from "./assets/boom1.svg"
import Boom2 from "./assets/boom2.svg"

function App() {
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
            <img src={Boom1} alt="Boom" className="w-96 absolute top-128 -right-16 -z-1" />
            <img src={Boom2} alt="Boom" className="w-96 absolute top-64 -left-16 -z-1" />

              <Hero />
              <Catalog />
              <BugReport />

              
            </>
          }
        />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
