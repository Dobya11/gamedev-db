import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Header from "./components/layout/Header";
import "./App.css";
import { ArrowUpRight } from "lucide-react";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Header />
    <article className="pl-4 pt-4">
      <h1 className="text-4xl ">Raw data</h1>
      <ul className="pl-8">
        <li>
          <a href="https://docs.google.com/document/d/1rDIupep9HG7u6rcsQBHnJ2v1J3TL9ZjpfRrM3OME9Xs/edit?tab=t.0">
            yaustar's Gamedev Megadoc{" "}
            <ArrowUpRight aria-hidden="true" className="size-4 inline" />
          </a>
        </li>
      </ul>
    </article>
  </StrictMode>,
);
