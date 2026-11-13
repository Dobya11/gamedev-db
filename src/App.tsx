import Header from "./components/layout/Header";
import "./App.css";
import Hero from "./components/layout/Hero";
import Catalog from "./components/layout/Catalog/Catalog";
import BugReport from "./components/layout/BugReport";
function App() {
  return (
    <div>
      <Header />
      <Hero />
      <Catalog />
      <BugReport />
    </div>
  );
}

export default App;
