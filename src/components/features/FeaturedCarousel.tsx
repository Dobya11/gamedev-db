import { useEffect, useMemo, useRef, useState } from "react";

import resourcesData from "@/data/resources.json";
import type { Resource } from "../types/resource";
import ResourceCard from "../layout/Catalog/ResourceCard";

const resources: Resource[] = resourcesData as Resource[];

function FeaturedCarousel() {
  const featured = useMemo(
    () => resources.filter((resource) => resource.featured),
    [],
  );

  const carouselRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef(0);
  const lastTimeRef = useRef(0);

  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);

  const isPaused = paused || dragging;

  const dragRef = useRef({
    startX: 0,
    startScroll: 0,
  });

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || featured.length < 2) return;

    const speed = 100;

    const animate = (time: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = time;
      }

      const delta = Math.min(time - lastTimeRef.current, 50);
      lastTimeRef.current = time;

      const halfWidth = carousel.scrollWidth / 2;

      if (!isPaused && halfWidth > 0) {
        positionRef.current += (speed * delta) / 1000;

        if (positionRef.current >= halfWidth) {
          positionRef.current -= halfWidth;
        }

        carousel.scrollLeft = positionRef.current;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }

      lastTimeRef.current = 0;
    };
  }, [featured.length, isPaused]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    if (e.pointerType === "mouse" && e.button !== 0) return;

    setDragging(true);

    dragRef.current = {
      startX: e.clientX,
      startScroll: carousel.scrollLeft,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;

    const carousel = carouselRef.current;
    if (!carousel) return;

    const distance = e.clientX - dragRef.current.startX;

    const halfWidth = carousel.scrollWidth / 2;

    positionRef.current = dragRef.current.startScroll - distance;

    positionRef.current =
      ((positionRef.current % halfWidth) + halfWidth) % halfWidth;

    carousel.scrollLeft = positionRef.current;
  };

  const handlePointerUp = () => {
    setDragging(false);
  };

  if (featured.length === 0) return null;

  const renderCards = (suffix: string) =>
    featured.map((resource) => (
      <div
        key={`${resource.id}-${suffix}`}
        className="w-75sm:w-[380px] lg:w-110 shrink-0"
      >
        <ResourceCard resource={resource} />
      </div>
    ));

  return (
    <div className="relative w-full overflow-x-clip mask-[linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)]">
      <div
        className="overflow-hidden -mx-96"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          ref={carouselRef}
          className={`flex w-full gap-6 overflow-x-hidden select-none ${
            dragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ touchAction: "pan-y" }}
        >
          <div className="flex shrink-0 gap-6">{renderCards("first")}</div>

          <div className="flex shrink-0 gap-6" aria-hidden="true">
            {renderCards("second")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedCarousel;
