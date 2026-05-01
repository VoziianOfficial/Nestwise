"use strict";

/* ==========================================================
   NESTWISE — ABOUT PAGE SCRIPT
   File: /js/about.js
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initAos();
    initAboutTilt();
    initAboutParallax();
    refreshAboutIcons();
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
   SOFT CARD TILT
   ========================= */

function initAboutTilt() {
    const cards = document.querySelectorAll(
        ".about-mini-stack article, .about-model-card, .value-card, .about-help-list article"
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

            const rotateX = ((y - centerY) / centerY) * -2.4;
            const rotateY = ((x - centerX) / centerX) * 2.4;

            card.style.transform = `translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });
}

/* =========================
   SOFT IMAGE PARALLAX
   ========================= */

function initAboutParallax() {
    const visualItems = document.querySelectorAll(".about-portrait-card img, .about-help-media img");

    if (!visualItems.length) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    let rafId = null;

    const update = () => {
        visualItems.forEach((image) => {
            const parent = image.parentElement;

            if (!parent) return;

            const rect = parent.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            if (rect.bottom < 0 || rect.top > viewportHeight) return;

            const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
            const move = (progress - 0.5) * 22;

            image.style.transform = `scale(1.04) translateY(${move}px)`;
        });

        rafId = null;
    };

    const requestUpdate = () => {
        if (rafId) return;

        rafId = window.requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", requestUpdate, {
        passive: true
    });

    window.addEventListener("resize", requestUpdate);
}

/* =========================
   ICON REFRESH
   ========================= */

function refreshAboutIcons() {
    if (window.NESTWISE && typeof window.NESTWISE.refreshIcons === "function") {
        window.NESTWISE.refreshIcons();
        return;
    }

    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }
}