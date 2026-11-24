export function initParallax() {
  const parallaxElements = document.querySelectorAll<HTMLElement>(".parallax");
  if (!parallaxElements.length) return;

  const handleScroll = () => {
    const scrollY = window.scrollY;

    requestAnimationFrame(() => {
      parallaxElements.forEach((el) => {
        const speed = parseFloat(el.dataset.speed ?? "0.15");
        el.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
      });
    });
  };

  handleScroll();

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}
