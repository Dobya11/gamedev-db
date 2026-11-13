import { ChevronDown, RotateCcw, Search } from "lucide-react";

import categories from "@/data/categories.json";
import pricingOptions from "@/data/pricing.json";
import resourceTypes from "@/data/resource-types.json";
import tags from "@/data/tags.json";

interface FilterProps {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  type: string;
  setType: (value: string) => void;
  pricing: string;
  setPricing: (value: string) => void;
  commercialUse: string;
  setCommercialUse: (value: string) => void;
  selectedTags: string[];
  setSelectedTags: (value: string[]) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  onReset: () => void;
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { id: string; name: string }[];
  allLabel: string;
  className: string;
}

const controlClass =
  "h-10 w-full appearance-none rounded-lg border border-input bg-background px-3 pr-9 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function SelectField({
  label,
  value,
  onChange,
  options,
  allLabel,
  className,
}: SelectFieldProps) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={controlClass}
      >
        <option value="all">{allLabel}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  );
}

function Filter({
  search,
  setSearch,
  category,
  setCategory,
  type,
  setType,
  pricing,
  setPricing,
  commercialUse,
  setCommercialUse,
  selectedTags,
  setSelectedTags,
  sortBy,
  setSortBy,
  onReset,
}: FilterProps) {
  const activeFilterCount =
    Number(search.length > 0) +
    Number(category !== "all") +
    Number(type !== "all") +
    Number(pricing !== "all") +
    Number(commercialUse !== "all") +
    selectedTags.length;

  function toggleTag(tagId: string) {
    setSelectedTags(
      selectedTags.includes(tagId)
        ? selectedTags.filter((tag) => tag !== tagId)
        : [...selectedTags, tagId],
    );
  }

  return (
    <div className="min-w-0">
      <div
        role="group"
        aria-label="Catalog filters"
        className="w-full min-w-0 max-w-full overflow-x-auto p-2"
      >
        <div className="flex min-w-max items-center gap-2">
          <div className="relative w-36 shrink-0">
            <select
              aria-label="Sort resources"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className={controlClass}
            >
              <option value="featured">Featured first</option>
              <option value="name-asc">Name: A–Z</option>
              <option value="name-desc">Name: Z–A</option>
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
          </div>

          <label className="relative block shrink-0" htmlFor="resource-search">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              id="resource-search"
              type="search"
              aria-label="Search resources"
              placeholder="Search resources"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-10 w-44 rounded-lg border border-input bg-background pl-9 pr-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            />
          </label>

          <SelectField
            label="Category"
            value={category}
            onChange={setCategory}
            options={categories}
            allLabel="All categories"
            className="w-36"
          />
          <SelectField
            label="Resource type"
            value={type}
            onChange={setType}
            options={resourceTypes}
            allLabel="All types"
            className="w-32"
          />
          <SelectField
            label="Pricing"
            value={pricing}
            onChange={setPricing}
            options={pricingOptions}
            allLabel="Any price"
            className="w-28"
          />
          <div className="relative w-42 shrink-0">
            <select
              aria-label="Commercial use"
              value={commercialUse}
              onChange={(event) => setCommercialUse(event.target.value)}
              className={controlClass}
            >
              <option value="all">Commercial use</option>
              <option value="yes">Allowed</option>
              <option value="limited">Limited</option>
              <option value="varies">Depends on resource</option>
              <option value="no">Not allowed</option>
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
          </div>

          <button
            type="button"
            onClick={onReset}
            disabled={activeFilterCount === 0 && sortBy === "featured"}
            className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-muted-foreground outline-none transition hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RotateCcw aria-hidden="true" className="size-4" />
            Clear
          </button>
        </div>
      </div>

      <fieldset className="mt-2 flex flex-wrap items-center gap-2">
        <legend className="sr-only">Filter by tags</legend>
        <span aria-hidden="true" className="mr-1 text-xs text-muted-foreground">
          Tags
        </span>
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag.id);

          return (
            <label
              key={tag.id}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-2.5 py-1 text-xs transition focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-background ${
                isSelected
                  ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-500"
                  : "border-border/70 text-muted-foreground hover:border-indigo-500/40 hover:text-foreground"
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleTag(tag.id)}
                className="sr-only"
              />
              {tag.name}
            </label>
          );
        })}
      </fieldset>
    </div>
  );
}

export default Filter;
