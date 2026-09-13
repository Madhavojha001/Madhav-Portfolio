document.documentElement.classList.add("js");

const header = document.getElementById("site-header");
const progressBar = document.getElementById("scroll-progress-bar");
const menuToggle = document.getElementById("menu-toggle");
const siteMenu = document.getElementById("site-menu");
const navLinks = Array.from(document.querySelectorAll(".site-nav a[href^='#']"));
const revealItems = document.querySelectorAll(".reveal");

const setMenu = (isOpen) => {
  if (!menuToggle || !siteMenu) return;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  siteMenu.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
};

menuToggle?.addEventListener("click", () => {
  setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
});

navLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuToggle.focus();
  }
});

const updateScrollUI = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(100, (scrollTop / scrollable) * 100) : 0;
  header?.classList.toggle("is-scrolled", scrollTop > 18);
  if (progressBar) progressBar.style.width = `${progress}%`;
};

updateScrollUI();
window.addEventListener("scroll", updateScrollUI, { passive: true });

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

  revealItems.forEach((item) => revealObserver.observe(item));

  const sections = document.querySelectorAll("main section[id]");
  const sectionObserver = new IntersectionObserver((entries) => {
    const active = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!active) return;
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${active.target.id}`);
    });
  }, { rootMargin: "-28% 0px -58%", threshold: [0.05, 0.2, 0.5] });

  sections.forEach((section) => sectionObserver.observe(section));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const currentYear = document.getElementById("current-year");
if (currentYear) currentYear.textContent = String(new Date().getFullYear());

const contactForm = document.getElementById("contact-form");
const messageField = document.getElementById("message");
const messageCount = document.getElementById("message-count");
const formStatus = document.getElementById("form-status");

messageField?.addEventListener("input", () => {
  if (messageCount) messageCount.textContent = String(messageField.value.length);
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const data = new FormData(contactForm);
  const name = String(data.get("name") || "").trim();
  const topic = String(data.get("topic") || "").trim();
  const message = String(data.get("message") || "").trim();
  const text = [
    "Hi Madhav, I came across your portfolio.",
    "",
    `Name: ${name}`,
    `Topic: ${topic}`,
    `Message: ${message}`
  ].join("\n");

  const url = `https://wa.me/919341934955?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");

  if (formStatus) {
    formStatus.textContent = "WhatsApp is opening with your message. Review it before sending.";
  }
});

const achievementGrid = document.getElementById("achievement-grid");
const achievementCards = Array.from(document.querySelectorAll(".achievement-card"));
const filterButtons = Array.from(document.querySelectorAll(".filter-button"));
const galleryToggle = document.getElementById("gallery-toggle");
const galleryStatus = document.getElementById("gallery-status");
let galleryExpanded = false;
let currentFilter = "all";

const visibleAchievementCards = () => achievementCards.filter((card, index) => {
  const categoryMatch = currentFilter === "all" || card.dataset.category === currentFilter;
  const expansionMatch = currentFilter !== "all" || galleryExpanded || index < 12;
  return categoryMatch && expansionMatch;
});

const updateGallery = () => {
  achievementCards.forEach((card) => {
    card.hidden = currentFilter !== "all" && card.dataset.category !== currentFilter;
  });

  achievementGrid?.classList.toggle("is-expanded", galleryExpanded || currentFilter !== "all");

  if (galleryToggle) {
    galleryToggle.hidden = currentFilter !== "all";
    galleryToggle.setAttribute("aria-expanded", String(galleryExpanded));
    galleryToggle.innerHTML = galleryExpanded
      ? 'Show highlights only <span aria-hidden="true">↑</span>'
      : 'View all 34 milestones <span aria-hidden="true">↓</span>';
  }

  const visibleCount = visibleAchievementCards().length;
  if (galleryStatus) {
    galleryStatus.textContent = currentFilter === "all"
      ? (galleryExpanded ? `Showing all ${visibleCount} documented milestones.` : "Showing 12 highlighted milestones.")
      : `Showing ${visibleCount} ${currentFilter} milestone${visibleCount === 1 ? "" : "s"}.`;
  }
};

galleryToggle?.addEventListener("click", () => {
  galleryExpanded = !galleryExpanded;
  updateGallery();
  if (!galleryExpanded) document.getElementById("proof")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter || "all";
    filterButtons.forEach((candidate) => {
      const selected = candidate === button;
      candidate.classList.toggle("is-active", selected);
      candidate.setAttribute("aria-pressed", String(selected));
    });
    updateGallery();
  });
});

const lightbox = document.getElementById("achievement-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxCounter = document.getElementById("lightbox-counter");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
let activeAchievementIndex = 0;

const renderLightbox = () => {
  const visibleCards = visibleAchievementCards();
  if (!visibleCards.length || !lightboxImage || !lightboxTitle || !lightboxCounter) return;
  activeAchievementIndex = (activeAchievementIndex + visibleCards.length) % visibleCards.length;
  const card = visibleCards[activeAchievementIndex];
  const sourceImage = card.querySelector("img");
  lightboxImage.src = card.dataset.image || sourceImage?.src || "";
  lightboxImage.alt = sourceImage?.alt || card.dataset.title || "Achievement certificate";
  lightboxTitle.textContent = card.dataset.title || "Achievement";
  lightboxCounter.textContent = `${activeAchievementIndex + 1} / ${visibleCards.length}`;
};

const openLightbox = (card) => {
  const visibleCards = visibleAchievementCards();
  activeAchievementIndex = Math.max(0, visibleCards.indexOf(card));
  renderLightbox();
  document.body.classList.add("lightbox-open");
  if (typeof lightbox?.showModal === "function") lightbox.showModal();
};

const closeLightbox = () => {
  if (lightbox?.open) lightbox.close();
  document.body.classList.remove("lightbox-open");
};

achievementCards.forEach((card) => card.addEventListener("click", () => openLightbox(card)));
lightboxClose?.addEventListener("click", closeLightbox);
lightboxPrev?.addEventListener("click", () => { activeAchievementIndex -= 1; renderLightbox(); });
lightboxNext?.addEventListener("click", () => { activeAchievementIndex += 1; renderLightbox(); });

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

lightbox?.addEventListener("close", () => document.body.classList.remove("lightbox-open"));

document.addEventListener("keydown", (event) => {
  if (!lightbox?.open) return;
  if (event.key === "ArrowLeft") { activeAchievementIndex -= 1; renderLightbox(); }
  if (event.key === "ArrowRight") { activeAchievementIndex += 1; renderLightbox(); }
});

updateGallery();
