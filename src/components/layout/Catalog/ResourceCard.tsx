import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Gamepad2 } from "lucide-react";

import categories from "@/data/categories.json";
import resourceTypes from "@/data/resource-types.json";
import tags from "@/data/tags.json";
import type { Resource } from "../../types/resource";

interface ResourceCardProps {
  resource: Resource;
}

const licenseLabels = {
  yes: "Commercial use OK",
  limited: "Limited use",
  varies: "Check license",
  no: "Non-commercial",
  attribution: "Attribution required",
} as const;

const priceLabels = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
  varies: "Varies",
} as const;

function ResourceCard({ resource }: ResourceCardProps) {
  const [iconIndex, setIconIndex] = useState(0);
  const [iconLoaded, setIconLoaded] = useState(false);
  const [accountIcon, setAccountIcon] = useState<string>();
  const categoryName =
    categories.find((item) => item.id === resource.category)?.name ??
    resource.category.replaceAll("-", " ");
  const typeName =
    resourceTypes.find((item) => item.id === resource.type)?.name ??
    resource.type;

  const resourceTags = (resource.tags ?? []).map(
    (id) => tags.find((tag) => tag.id === id)?.name ?? id,
  );
  const pricingLabel = resource.pricing
    ? priceLabels[resource.pricing]
    : undefined;
  const commercialUseLabel = resource.commercialUse
    ? licenseLabels[resource.commercialUse]
    : undefined;

  const iconCandidates = useMemo(() => {
    const candidates: string[] = [];

    try {
      const url = new URL(resource.url);

      if (url.hostname === "github.com" || url.hostname === "www.github.com") {
        const owner = url.pathname.split("/").filter(Boolean)[0];
        if (owner) {
          candidates.push(`https://github.com/${encodeURIComponent(owner)}.png?size=128`);
        }
      }

      if (url.hostname === "reddit.com" || url.hostname === "www.reddit.com") {
        if (accountIcon) {
          candidates.push(accountIcon);
        }
      }

      candidates.push(`${url.origin}/favicon.ico`);
      candidates.push(
        `https://www.google.com/s2/favicons?domain=${encodeURIComponent(url.hostname)}&sz=128`,
      );
    } catch {
      candidates.push("/src/assets/favicon.svg");
    }

    return [...new Set(candidates)];
  }, [accountIcon, resource.url]);

  useEffect(() => {
    try {
      const url = new URL(resource.url);
      if (url.hostname !== "reddit.com" && url.hostname !== "www.reddit.com") {
        return;
      }

      const subreddit = url.pathname.match(/^\/r\/([^/]+)/i)?.[1];
      if (!subreddit) {
        return;
      }

      const controller = new AbortController();
      void fetch(
        `https://www.reddit.com/r/${encodeURIComponent(subreddit)}/about.json?raw_json=1`,
        { signal: controller.signal },
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Reddit icon request failed: ${response.status}`);
          }
          return response.json();
        })
        .then((payload: { data?: { icon_img?: string; community_icon?: string } }) => {
          const icon = payload.data?.icon_img || payload.data?.community_icon;
          if (icon) {
            setAccountIcon(icon.replaceAll("&amp;", "&"));
          }
        })
        .catch(() => undefined);

      return () => controller.abort();
    } catch {
      return;
    }
  }, [resource.url]);

  const iconInitials = resource.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  const faviconUrl = iconCandidates[iconIndex];

  return (
    <article className="group flex w-full min-w-0 flex-col rounded-xl border border-border/70 bg-card p-4 transition-colors hover:border-primary/30">
      <div className="mb-4 flex items-center gap-3">
        <span className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border/70 bg-white text-sm font-bold text-primary shadow-sm">
          {!iconLoaded && (
            <span
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center"
            >
              {iconInitials || <Gamepad2 className="size-6" />}
            </span>
          )}
          {faviconUrl && (
            <img
              src={faviconUrl}
              alt=""
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className={`relative size-9 object-contain transition-opacity duration-150 ${
                iconLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setIconLoaded(true)}
              onError={() => {
                setIconLoaded(false);
                setIconIndex((current) =>
                  current + 1 < iconCandidates.length
                    ? current + 1
                    : iconCandidates.length,
                );
              }}
            />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold">{resource.name}</h3>
          <p className="truncate text-xs text-muted-foreground">
            {typeName ? `${categoryName} | ${typeName}` : categoryName}
          </p>
        </div>
        {resource.featured && (
          <span className="shrink-0 rounded-full bg-secondary px-2 py-1 text-[11px] text-primary">
            Featured
          </span>
        )}{" "}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm leading-6 text-muted-foreground">
          {resource.description ? (
            resource.description
          ) : (
            <i className="text-muted-foreground">No description</i>
          )}
        </p>

        {resourceTags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {resourceTags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-border/70 pt-3 text-xs">
        <div className="flex flex-wrap gap-2">
          {pricingLabel && (
            <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
              {pricingLabel}
            </span>
          )}
          {commercialUseLabel && (
            <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
              {commercialUseLabel}
            </span>
          )}
        </div>
      </div>
      <div className="mt-2">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-1 text-sm font-medium text-primary outline-none transition hover:text-foreground focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-primary"
        >
          Visit website
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </a>
      </div>
    </article>
  );
}

export default ResourceCard;
