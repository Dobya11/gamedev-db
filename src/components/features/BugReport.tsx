import { Bug } from "lucide-react";

function BugReport() {
  return (
    <a
      href="https://github.com/Dobya11/gamedev-db/issues/new?template=bug-report.yml"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 inline-flex size-11 items-center justify-center rounded-full border border-border/70 bg-card text-card-foreground shadow-lg transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:bottom-6 sm:right-6"
      aria-label="Report bug"
    >
      <Bug aria-hidden="true" size={20} />
    </a>
  );
}

export default BugReport;
