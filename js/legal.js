"use strict";

/* ==========================================================
   NESTWISE — LEGAL PAGES SCRIPT
   File: /js/legal.js
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initAos();
    initLegalActiveNav();
    initLegalSmoothAnchors();
    initLegalCardMotion();
    refreshLegalIcons();
});

/* =========================
   AOS
   ========================= */

function initAos() {
    if (typeof AOS === "undefined") return;

    AOS.init({
        duration: 850,
        easing: "ease-out-cubic",
        once: true,
        offset: 70
    });
}

/* =========================
   ACTIVE LEGAL NAV
   ========================= */

function initLegalActiveNav() {
    const pageName = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll(".legal-policy-nav a");

    links.forEach((link) => {
        const href = link.getAttribute("href");

        if (href === pageName) {
            link.classList.add("is-active");
        } else {
            link.classList.remove("is-active");
        }
    });
}

/* =========================
   SMOOTH INTERNAL ANCHORS
   ========================= */

function initLegalSmoothAnchors() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
}

/* =========================
   SOFT CARD MOTION
   ========================= */

function initLegalCardMotion() {
    const cards = document.querySelectorAll(
        ".legal-hero-card, .legal-sidebar-card, .legal-sidebar-note, .legal-content section"
    );

    if (!cards.length) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    cards.forEach((card) => {
        card.addEventListener("mousemove", (event) => {
            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -1.4;
            const rotateY = ((x - centerX) / centerX) * 1.4;

            card.style.transform = `translateY(-2px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });
}

/* =========================
   ICON REFRESH
   ========================= */

function refreshLegalIcons() {
    if (window.NESTWISE && typeof window.NESTWISE.refreshIcons === "function") {
        window.NESTWISE.refreshIcons();
        return;
    }

    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }
}