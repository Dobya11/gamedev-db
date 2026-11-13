import { Bug } from "lucide-react";

function BugReport() {
  return (
    <a
      href="https://github.com/Dobya11/gamedev-db/issues/new?template=bug-report.yml"
      target="_blank"
    >
      <button
        className="fixed bottom-6 right-6 z-50 rounded-full p-3 shadow-lg bg-card text-primary-foreground hover:opacity-80 transition border border-border/70"
        aria-label="Report bug"
      >
        <Bug size={20} />
      </button>
    </a>
  );
}

export default BugReport;
