const animatedSections = document.querySelectorAll(".section-fade");
const staggeredItems = document.querySelectorAll(".feature-card, .spec");
const specHotspots = document.querySelectorAll(".spec-hotspot");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

animatedSections.forEach((section) => revealObserver.observe(section));

staggeredItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
});

specHotspots.forEach((hotspot) => {
  hotspot.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = hotspot.getAttribute("aria-expanded") === "true";

    specHotspots.forEach((item) => item.setAttribute("aria-expanded", "false"));
    hotspot.setAttribute("aria-expanded", String(!isOpen));
  });
});

document.addEventListener("click", () => {
  specHotspots.forEach((hotspot) => hotspot.setAttribute("aria-expanded", "false"));
});

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  navLinks?.classList.toggle("is-open", !isOpen);
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
  });
});
