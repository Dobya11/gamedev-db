import ThemeToggle from "@/components/features/ThemeToggle";

function Header() {
  return (
    <header className="grid grid-cols-3 items-center border-b border-border bg-card px-4 py-3">
      <div className="justify-self-start">
        <a href="/">Home</a>
        <a href="/about/" className="ml-4">
          About
        </a>
      </div>

      <h1 className="justify-self-center font-semibold text-zinc-900 dark:text-zinc-100">
        GameDev database
      </h1>

      <div className="justify-self-end">
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;
