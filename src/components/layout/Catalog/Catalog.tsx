import { useMemo, useState } from "react";

import Filter from "./Filter";
import ResourceCard from "./ResourceCard";

import resources from "@/data/resources.json";
import tags from "@/data/tags.json";
import type { Resource } from "../../types/resource";
import NewItem from "../../features/NewItem";
function Catalog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [type, setType] = useState("all");
  const [pricing, setPricing] = useState("all");
  const [commercialUse, setCommercialUse] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");

  const filteredResources = useMemo(() => {
    const query = search.toLowerCase().trim();

    return (resources as Resource[])
      .filter((resource) => {
        const searchableText = [
          resource.name,
          resource.description ?? "",
          ...(resource.tags ?? []).flatMap((tagId) => [
            tagId,
            tags.find((tag) => tag.id === tagId)?.name ?? "",
          ]),
        ]
          .join(" ")
          .toLowerCase();
        const matchesSearch = searchableText.includes(query);
        const matchesCategory =
          category === "all" || resource.category === category;
        const matchesType = type === "all" || resource.type === type;
        const matchesPricing =
          pricing === "all" || resource.pricing === pricing;
        const matchesCommercialUse =
          commercialUse === "all" || resource.commercialUse === commercialUse;
        const matchesTags =
          selectedTags.length === 0 ||
          selectedTags.some((tag) => resource.tags?.includes(tag));

        return (
          matchesSearch &&
          matchesCategory &&
          matchesType &&
          matchesPricing &&
          matchesCommercialUse &&
          matchesTags
        );
      })
      .sort((a, b) => {
        if (sortBy === "name-asc") return a.name.localeCompare(b.name);
        if (sortBy === "name-desc") return b.name.localeCompare(a.name);

        const featuredDiff =
          Number(Boolean(b.featured)) - Number(Boolean(a.featured));

        if (featuredDiff !== 0) return featuredDiff;
        return a.name.localeCompare(b.name);
      });
  }, [search, category, type, pricing, commercialUse, selectedTags, sortBy]);

  function resetFilters() {
    setSearch("");
    setCategory("all");
    setType("all");
    setPricing("all");
    setCommercialUse("all");
    setSelectedTags([]);
    setSortBy("featured");
  }

  return (
    <section className="mx-auto w-full max-w-7xl overflow-x-clip px-4 py-6 sm:px-6 lg:px-8">
      <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
        Database
      </h2>

      <div className="flex flex-col gap-3">
        <Filter
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          type={type}
          setType={setType}
          pricing={pricing}
          setPricing={setPricing}
          commercialUse={commercialUse}
          setCommercialUse={setCommercialUse}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onReset={resetFilters}
        />

        <div>
          <p className="mb-3 text-sm text-muted-foreground" aria-live="polite">
            {filteredResources.length}{" "}
            {filteredResources.length === 1 ? "resource" : "resources"}
          </p>

          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <h3 className="text-lg font-medium">No resources found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try another search or clear a few filters. Or add new
                <NewItem />
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Catalog;
