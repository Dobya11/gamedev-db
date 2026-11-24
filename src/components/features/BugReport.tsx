import { Bug } from "lucide-react";

function BugReport() {
  return (
    <button
      className="fixed bottom-10 right-10 z-50 rounded-full p-3 shadow-lg bg-card textl-foreground hover:opacity-80 transition border border-border/70"
      aria-label="Report bug"
      onClick={() =>
        window.open(
          "https://github.com/Dobya11/gamedev-db/issues/new?template=bug-report.yml",
          "_blank",
          "noopener,noreferrer",
        )
      }
    >
      <Bug size={20} />
    </button>
  );
}

export default BugReport;
