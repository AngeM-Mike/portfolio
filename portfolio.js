/* =========================================================
   Nebie Ange Michel — Portfolio
   JS simple, sans dépendances.
   ========================================================= */

/* -----------------------------------------------------------
   1. VOS RÉALISATIONS
   -----------------------------------------------------------
   Ajoutez / modifiez vos projets ici. C'est la SEULE liste à
   éditer pour mettre à jour la galerie : pas besoin de toucher
   au HTML. Déposez vos images dans assets/images/ puis indiquez
   le nom du fichier dans "image".
   category : "logo"  -> pour vos créations de logos
              "web"   -> pour vos captures de sites web réalisés
------------------------------------------------------------ */
const projects = [
  {
    title: "AEI-STIC",
    category: "logo",
    images: [
      "AEI-STIC/logo explicite principal.png",
      "AEI-STIC/logo corporate principal.png",
      "AEI-STIC/Bracelet 1.png",
      "AEI-STIC/Bracelet 2.png",
      "AEI-STIC/Bracelet interrieur.png",
      "AEI-STIC/pull bleu.png",
      "AEI-STIC/Pull full.png",
      "AEI-STIC/Pull noir.png",
      "AEI-STIC/iPhone X on Desk Mockup.png"
    ],
    tag: "Logo & identité"
  },
  {
    title: "NAYA",
    category: "logo",
    images: [
      "NAYA/Principal Naya.png",
      "NAYA/Panneau NAYA.png",
      "NAYA/Orange Naya.png",
      "NAYA/Mug Naya.png",
      "NAYA/Mini Charte NAYA.png",
      "NAYA/Livreur Naya.png",
      "NAYA/ios-app-icon-iphone-17-pro-mockup-on-gradient-background-v6-front-view.png",
      "NAYA/icone principale.png",
      "NAYA/Bleu NAYA.png"
    ],
    imageTitles: [
      "Identité principale",
      "Panneau de marque",
      "Déclinaison orange",
      "Mug personnalisé",
      "Mini charte graphique",
      "Tenue de livreur",
      "Icône d'application",
      "Icône principale",
      "Déclinaison bleue"
    ],
    tag: "Projet complet · 9 visuels"
  },
  {
    title: "Affiches",
    category: "affiche",
    images: [
      "Affiche/Octobre Rose pour portfolio.jpg.jpeg",
      "Affiche/nouvelle AFFICHE LUC.jpg",
      "Affiche/DOP Cover principale.jpg",
      "Affiche/Affiche nouvel an 2.jpg",
      "Affiche/Affiche midnight.jpg",
      "Affiche/AFFICHE JUS AND VIBE.jpg"
    ],
    imageTitles: [
      "Octobre Rose",
      "Affiche LUC",
      "DOP · Cover principale",
      "Affiche du Nouvel An",
      "Midnight",
      "Jus and Vibe"
    ],
    tag: "6 créations · Communication visuelle"
  },
  {
    title: "Water 5",
    category: "logo",
    images: ["Water 5/logo Water 5 copie.png"],
    tag: "Logo & identité"
  },
  {
    title: "Surfera",
    category: "web",
    images: [
      "Site Web/Surfera 1.png",
      "Site Web/Surfera 2.png",
      "Site Web/Surfera 3.png"
    ],
    tag: "Site web"
  },
  {
    title: "Nyra",
    category: "web",
    images: [
      "Site Web/Nyra 1.png",
      "Site Web/Naya 2.png"
    ],
    tag: "Site web"
  },
  {
    title: "Agrolrri CI App web",
    category: "web",
    images: ["maquette App web/maquetteapp.png"],
    tag: "App web"
  }
];

/* ----------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  renderGallery("all");
  initFilters();
  initNav();
  initHeaderScroll();
  initRevealAnimations();
  initLightbox();
  initBackToTop();
  initProgressBar();
  initActiveNav();
  initContactForm();
  document.getElementById("year").textContent = new Date().getFullYear();
});

/* ---------- Gallery rendering ---------- */
function renderGallery(filter) {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  const items = filter === "all" ? projects : projects.filter(p => p.category === filter);
  grid.innerHTML = "";

  if (items.length === 0) {
    grid.innerHTML = `<p class="gallery-empty">Aucune réalisation dans cette catégorie pour le moment.</p>`;
    return;
  }

  items.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "gallery-card";
    card.setAttribute("data-reveal", "");
    const firstImage = project.images && project.images.length ? project.images[0] : "";
    const actionLabel = project.category === "affiche" ? "Voir les affiches" : "Voir le projet";
    card.innerHTML = `
      <div class="gallery-media${project.category === "affiche" ? " gallery-media--poster" : ""}">
        <img src="${encodeURI(firstImage)}" alt="${project.title}" loading="lazy">
      </div>
      <div class="gallery-body">
        <span class="gallery-tag">${project.tag}</span>
        <h3 class="gallery-title">${project.title}</h3>
        <button class="gallery-open" type="button">${actionLabel}<span aria-hidden="true">&rarr;</span></button>
      </div>
    `;
    card.querySelector(".gallery-open").addEventListener("click", () => openLightbox(project, 0));
    grid.appendChild(card);
  });

  // Re-run reveal observer on newly injected cards
  observeReveal(grid.querySelectorAll("[data-reveal]"));
}

/* ---------- Filter tabs ---------- */
function initFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => { b.classList.remove("is-active"); b.setAttribute("aria-selected", "false"); });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");
      renderGallery(btn.dataset.filter);
    });
  });
}

/* ---------- Mobile nav ---------- */
function initNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Header background on scroll ---------- */
function initHeaderScroll() {
  const header = document.getElementById("siteHeader");
  if (!header) return;
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- Active nav link by section ---------- */
function initActiveNav() {
  const links = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");
  if (!links.length || !sections.length) return;

  const setActiveLink = () => {
    let currentId = "services";
    const scrollPos = window.scrollY + 180;

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    links.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${currentId}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  setActiveLink();
  window.addEventListener("scroll", setActiveLink, { passive: true });
}

/* ---------- Scroll progress bar ---------- */
function initProgressBar() {
  const bar = document.getElementById("progressBar");
  if (!bar) return;
  const onScroll = () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = height > 0 ? (window.scrollY / height) * 100 : 0;
    bar.style.width = progress + "%";
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- Reveal-on-scroll ---------- */
let revealObserver;
function initRevealAnimations() {
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  observeReveal(document.querySelectorAll("[data-reveal]"));
}

function observeReveal(nodeList) {
  if (!revealObserver) return;
  nodeList.forEach(el => revealObserver.observe(el));
}

/* ---------- Lightbox ---------- */
let activeLightboxProject = null;
let activeLightboxIndex = 0;

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");
  if (!lightbox || !closeBtn || !prevBtn || !nextBtn) return;

  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", () => navigateLightbox(-1));
  nextBtn.addEventListener("click", () => navigateLightbox(1));
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") navigateLightbox(-1);
    if (e.key === "ArrowRight") navigateLightbox(1);
  });
}

function openLightbox(project, index = 0) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImg");
  const caption = document.getElementById("lightboxCaption");
  if (!lightbox || !img || !caption) return;

  activeLightboxProject = project;
  activeLightboxIndex = Math.max(0, Math.min(index, project.images.length - 1));
  renderLightboxImage();
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function renderLightboxImage() {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImg");
  const caption = document.getElementById("lightboxCaption");
  if (!lightbox || !img || !caption || !activeLightboxProject) return;

  const imagePath = activeLightboxProject.images[activeLightboxIndex];
  const imageTitle = activeLightboxProject.imageTitles?.[activeLightboxIndex] || activeLightboxProject.title;
  img.src = encodeURI(imagePath);
  img.alt = imageTitle;
  caption.textContent = `${imageTitle} — ${activeLightboxProject.title} (${activeLightboxIndex + 1}/${activeLightboxProject.images.length})`;
}

function navigateLightbox(direction) {
  if (!activeLightboxProject || !activeLightboxProject.images || activeLightboxProject.images.length <= 1) return;
  activeLightboxIndex = (activeLightboxIndex + direction + activeLightboxProject.images.length) % activeLightboxProject.images.length;
  renderLightboxImage();
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  activeLightboxProject = null;
  activeLightboxIndex = 0;
}

/* ---------- Back to top ---------- */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("is-visible", window.scrollY > 600);
  }, { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ---------- Contact form validation ----------
   Ce formulaire est validé côté client uniquement.
   GitHub Pages n'héberge pas de backend : pour recevoir réellement
   les messages, connectez ce <form> à un service comme Formspree
   (https://formspree.io) ou EmailJS, ou remplacez le comportement
   ci-dessous par une redirection vers un lien "mailto:".
------------------------------------------------------------ */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const fields = {
    name: { input: document.getElementById("name"), error: document.getElementById("nameError") },
    email: { input: document.getElementById("email"), error: document.getElementById("emailError") },
    message: { input: document.getElementById("message"), error: document.getElementById("messageError") },
  };
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    if (fields.name.input.value.trim().length < 2) {
      setError(fields.name, "Merci d'indiquer votre nom.");
      isValid = false;
    } else {
      clearError(fields.name);
    }

    const emailValue = fields.email.input.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailValue)) {
      setError(fields.email, "Merci d'indiquer un email valide.");
      isValid = false;
    } else {
      clearError(fields.email);
    }

    if (fields.message.input.value.trim().length < 10) {
      setError(fields.message, "Votre message est un peu court (10 caractères min).");
      isValid = false;
    } else {
      clearError(fields.message);
    }

    if (!isValid) {
      status.textContent = "";
      return;
    }

    status.textContent = "Message prêt à être envoyé — connectez ce formulaire à Formspree ou un lien mailto pour le recevoir.";
    form.reset();
  });
}

function setError(field, msg) {
  field.error.textContent = msg;
  field.input.closest(".form-row").classList.add("has-error");
}
function clearError(field) {
  field.error.textContent = "";
  field.input.closest(".form-row").classList.remove("has-error");
}