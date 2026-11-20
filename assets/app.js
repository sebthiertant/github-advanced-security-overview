document.querySelectorAll("[data-print]").forEach((b) => b.addEventListener("click", () => window.print()));

const links = [...document.querySelectorAll(".nav a")];
const targets = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);

if ("IntersectionObserver" in window && targets.length) {
  const visible = new Map();
  const update = () => {
    let best = null;
    for (const t of targets) if (visible.get(t) && !best) best = t;
    links.forEach((a) => {
      if (best && a.getAttribute("href") === "#" + best.id) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  };
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => visible.set(e.target, e.isIntersecting));
      update();
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  targets.forEach((t) => io.observe(t));
}
