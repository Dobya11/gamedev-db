import { CirclePlus } from "lucide-react";

function NewItem() {
  return (
    <a
      href="https://github.com/Dobya11/gamedev-db/issues/new?template=new-item.yml"
      target="_blank"
    >
      <button aria-label="Add new item" className="px-2">
        <CirclePlus size={14} className="" />
      </button>
    </a>
  );
}

export default NewItem;
