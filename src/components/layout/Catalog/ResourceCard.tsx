import { useState } from "react";
import { ArrowUpRight, Gamepad2 } from "lucide-react";

import categories from "@/data/categories.json";
import pricingOptions from "@/data/pricing.json";
import resourceTypes from "@/data/resource-types.json";
import tags from "@/data/tags.json";
import type { Resource } from "../../types/resource";

interface ResourceCardProps {
  resource: Resource;
}

const commercialUseLabels = {
  yes: "Commercial use OK",
  limited: "Limited use",
  varies: "Check license",
  no: "Non-commercial",
} as const;

function ResourceCard({ resource }: ResourceCardProps) {
  const [iconFailed, setIconFailed] = useState(false);
  const categoryName =
    categories.find((item) => item.id === resource.category)?.name ??
    resource.category.replaceAll("-", " ");
  const typeName =
    resourceTypes.find((item) => item.id === resource.type)?.name ??
    resource.type;
  const pricingName = pricingOptions.find(
    (item) => item.id === resource.pricing,
  )?.name;
  const resourceTags = (resource.tags ?? []).map(
    (id) => tags.find((tag) => tag.id === id)?.name ?? id,
  );
  const commercialUseLabel = resource.commercialUse
    ? commercialUseLabels[resource.commercialUse]
    : undefined;
  const faviconUrl = (() => {
    try {
      const url = new URL(resource.url);
      return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=128`;
    } catch {
      return "/favicon.svg";
    }
  })();

  return (
    <article className="group flex h-full flex-col rounded-xl border border-border/70 bg-card/50 p-4 transition-colors hover:border-indigo-500/30 hover:bg-card">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-neutral-100 text-muted-foreground">
          {!iconFailed ? (
            <img
              src={faviconUrl}
              alt=""
              loading="lazy"
              className="size-6 object-contain"
              onError={() => setIconFailed(true)}
            />
          ) : (
            <Gamepad2 aria-hidden="true" className="size-8 text-indigo-500" />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold">{resource.name}</h3>
          <p className="truncate text-xs text-muted-foreground">
            {categoryName} · {typeName}
          </p>
        </div>
        {resource.featured && (
          <span className="shrink-0 rounded-full bg-secondary px-2 py-1 text-[11px] text-indigo-500">
            Featured
          </span>
        )}{" "}
      </div>

      <p className="flex-1 text-sm leading-6 text-muted-foreground">
        {resource.description}
      </p>

      {resourceTags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {resourceTags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-muted/70 px-2 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2 border-t border-border/70 pt-3 text-xs">
        {pricingName && (
          <span className="rounded-md bg-muted/70 px-2 py-1 text-xs text-muted-foreground">
            {pricingName}
          </span>
        )}
        {commercialUseLabel && (
          <span className="rounded-md bg-muted/70 px-2 py-1 text-xs text-muted-foreground">
            {commercialUseLabel}
          </span>
        )}
      </div>

      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1 self-start text-sm font-medium text-muted-foreground outline-none transition hover:text-foreground focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        Visit website
        <ArrowUpRight aria-hidden="true" className="size-4" />
      </a>
    </article>
  );
}

export default ResourceCard;
