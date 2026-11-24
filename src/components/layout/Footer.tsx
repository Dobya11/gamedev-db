import { ArrowUpRight } from "lucide-react";
function Header() {
  return (
    <footer className="grid grid-cols-2 items-center border-t border-border bg-card px-4 py-3">
      <p className="justify-self-left text-muted-foreground">
        Made by{" "}
        <a href="https://github.com/Dobya11" className="font-semibold">
          Dobya
        </a>
        <ArrowUpRight className="inline-block size-4" />
      </p>
      <p className="justify-self-right text-muted-foreground flex flex-row justify-end">
        <a href="https://github.com/Dobya11/gamedev-db">
          <img
            src="https://cdn.simpleicons.org/github/dark?size=24"
            alt="GitHub"
            className="block dark:hidden"
          />

          <img
            src="https://cdn.simpleicons.org/github/white?size=24"
            alt="GitHub"
            className="hidden dark:block"
          />
        </a>
      </p>
    </footer>
  );
}

export default Header;
