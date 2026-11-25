import { SearchIcon } from "lucide-react";

function SearchButton() {
  return (
    <a
      className="justify-self-center mx-auto mb-8 px-8 py-2 text-2xl bg-primary rounded-4xl border border-border"
      href="/database"
    >
      Search <SearchIcon className="inline -translate-y-0.5" />
    </a>
  );
}
export default SearchButton;
