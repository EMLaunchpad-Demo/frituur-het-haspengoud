/* ============================================================
   FRITUUR HET HASPENGOUD — Gedeelde JavaScript
   Vanilla JS, geen externe libraries. Werkt op alle pagina's.
   ============================================================ */
(function () {
  "use strict";

  /* -----------------------------------------------------------
     1. Mobiele hamburger-menu
     ----------------------------------------------------------- */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      const open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    // Sluit menu bij klik op een link
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* -----------------------------------------------------------
     2. Sticky header schaduw bij scrollen
     ----------------------------------------------------------- */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* -----------------------------------------------------------
     3. Smooth scroll voor anker-links (#...)
     ----------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      const id = a.getAttribute("href");
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
  });

  /* -----------------------------------------------------------
     4. Scroll-reveal animaties (IntersectionObserver)
     ----------------------------------------------------------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  /* -----------------------------------------------------------
     5. Menukaart tabs (alleen op menu-pagina)
     ----------------------------------------------------------- */
  const tabs = document.querySelectorAll(".menu-tab");
  const panels = document.querySelectorAll(".menu-panel");
  if (tabs.length && panels.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        const key = tab.dataset.tab;
        tabs.forEach(function (t) { t.classList.toggle("active", t === tab); });
        panels.forEach(function (p) {
          p.classList.toggle("active", p.dataset.panel === key);
        });
      });
    });
  }

  /* -----------------------------------------------------------
     6. FAQ accordeon
     ----------------------------------------------------------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    if (!q || !a) return;
    q.addEventListener("click", function () {
      const isOpen = item.classList.toggle("open");
      q.setAttribute("aria-expanded", isOpen ? "true" : "false");
      a.style.maxHeight = isOpen ? a.scrollHeight + "px" : null;
    });
  });

  /* -----------------------------------------------------------
     7. Contactformulier — validatie + succesbericht
     (Client-side demo. Koppel in GoHighLevel aan je eigen form.)
     ----------------------------------------------------------- */
  const form = document.querySelector("#contact-form");
  if (form) {
    const success = form.querySelector(".form-success");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll("[required]").forEach(function (input) {
        const field = input.closest(".field");
        let ok = input.value.trim() !== "";
        if (ok && input.type === "email") {
          ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
        }
        if (field) field.classList.toggle("error", !ok);
        if (!ok) valid = false;
      });

      if (!valid) {
        const firstError = form.querySelector(".field.error input, .field.error textarea");
        if (firstError) firstError.focus();
        return;
      }

      if (success) {
        success.classList.add("show");
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.reset();
    });

    // Verwijder foutstatus zodra de gebruiker typt
    form.querySelectorAll("input, textarea").forEach(function (input) {
      input.addEventListener("input", function () {
        const field = input.closest(".field");
        if (field) field.classList.remove("error");
      });
    });
  }

  /* -----------------------------------------------------------
     8. Actief menu-item markeren op basis van pagina
     ----------------------------------------------------------- */
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path || (path === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });

  /* -----------------------------------------------------------
     9. Jaartal in footer automatisch
     ----------------------------------------------------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
