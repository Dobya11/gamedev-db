import { CirclePlus } from "lucide-react";

function NewItem() {
  return (
    <button
      aria-label="Add new item"
      className="px-2"
      onClick={() =>
        window.open(
          "https://github.com/Dobya11/gamedev-db/issues/new?template=new-item.yml",
          "_blank",
          "noopener,noreferrer",
        )
      }
    >
      <CirclePlus size={14} className="" />
    </button>
  );
}

export default NewItem;
