import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Filter from "./Filter";
import ResourceCard from "./ResourceCard";

import resources from "@/data/resources.json";
import tags from "@/data/tags.json";
import type { Resource } from "../../types/resource";
import NewItem from "../../features/NewItem";

import NoItems from "/src/assets/no-items.svg";

const PAGE_SIZE = 24;

function Catalog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [type, setType] = useState("all");
  const [pricing, setPricing] = useState("all");
  const [commercialUse, setCommercialUse] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);

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

  const pageCount = Math.ceil(filteredResources.length / PAGE_SIZE);
  const page = Math.min(currentPage, pageCount || 1);
  const pageResources = filteredResources.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );
  const firstResource = (page - 1) * PAGE_SIZE + 1;
  const lastResource = Math.min(page * PAGE_SIZE, filteredResources.length);

  function updateFilter<T>(setter: (value: T) => void, value: T) {
    setter(value);
    setCurrentPage(1);
  }

  function resetFilters() {
    setSearch("");
    setCategory("all");
    setType("all");
    setPricing("all");
    setCommercialUse("all");
    setSelectedTags([]);
    setSortBy("featured");
    setCurrentPage(1);
  }

  function renderPagination(className: string) {
    if (pageCount <= 1) return null;

    return (
      <nav
        aria-label="Resource pages"
        className={`${className} flex items-center justify-center gap-4`}
      >
        <button
          type="button"
          onClick={() => setCurrentPage(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
          className="inline-flex h-10 items-center gap-1 rounded-lg border border-input px-3 text-sm text-foreground outline-none transition hover:bg-muted focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft aria-hidden="true" className="size-4" />
          Previous
        </button>
        <span className="text-sm text-muted-foreground" aria-live="polite">
          Page {page} of {pageCount}
        </span>
        <button
          type="button"
          onClick={() => setCurrentPage(page + 1)}
          disabled={page === pageCount}
          aria-label="Next page"
          className="inline-flex h-10 items-center gap-1 rounded-lg border border-input px-3 text-sm text-foreground outline-none transition hover:bg-muted focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
          <ChevronRight aria-hidden="true" className="size-4" />
        </button>
      </nav>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl overflow-x-clip px-4 py-6 sm:px-6 lg:px-8">
      <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
        Database
      </h2>

      <div className="flex flex-col gap-3">
        <Filter
          search={search}
          setSearch={(value) => updateFilter(setSearch, value)}
          category={category}
          setCategory={(value) => updateFilter(setCategory, value)}
          type={type}
          setType={(value) => updateFilter(setType, value)}
          pricing={pricing}
          setPricing={(value) => updateFilter(setPricing, value)}
          commercialUse={commercialUse}
          setCommercialUse={(value) => updateFilter(setCommercialUse, value)}
          selectedTags={selectedTags}
          setSelectedTags={(value) => updateFilter(setSelectedTags, value)}
          sortBy={sortBy}
          setSortBy={(value) => updateFilter(setSortBy, value)}
          onReset={resetFilters}
        />

        <div>
          <p className="mb-3 text-sm text-muted-foreground" aria-live="polite">
            {filteredResources.length > 0
              ? `Showing ${firstResource}–${lastResource} of ${filteredResources.length} resource${
                  filteredResources.length === 1 ? "" : "s"
                }`
              : "0 resources"}
          </p>

          {renderPagination("mb-4")}

          {filteredResources.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pageResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
              {renderPagination("mt-6")}
            </>
          ) : (
            <div className="flex flex-col items-center py-12 text-center justify-center ">
              <img src={NoItems} alt="nothing found" className="w-32" />
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
