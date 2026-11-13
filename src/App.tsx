import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Hero from "./components/layout/Hero";
import Catalog from "./components/layout/Catalog/Catalog";
import BugReport from "./components/features/BugReport";
import NotFound from "./NotFound";
import "./App.css";
import About from "./About";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
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
