import { CirclePlus } from "lucide-react";

function NewItem() {
  return (
    <a
      aria-label="Add new item"
      href="https://github.com/Dobya11/gamedev-db/issues/new?template=new-item.yml"
      target="_blank"
      rel="noopener noreferrer"
      className="ml-1 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <CirclePlus aria-hidden="true" size={14} />
      <span>new item</span>
    </a>
  );
}

export default NewItem;
