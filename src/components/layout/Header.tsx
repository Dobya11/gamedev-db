import ThemeToggle from "@/components/features/ThemeToggle";

function Header() {
  return (
    <header className="grid grid-cols-3 items-center border-b border-border bg-card/80 px-4 py-3">
      <div className="justify-self-start">
        <a href="/" className="transition-colors hover:text-primary">
          Home
        </a>
        <a href="/about/" className="ml-4 transition-colors hover:text-primary">
          About
        </a>
      </div>

      <h1 className="justify-self-center font-semibold">GameDev database</h1>

      <div className="justify-self-end">
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;
