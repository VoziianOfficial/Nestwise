"use strict";

/* ==========================================================
   NESTWISE — HOME PAGE SCRIPT
   File: /js/home.js
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initAos();
    initReviewsSlider();
    initHeroParallax();
    initHomeCardTilt();
    refreshHomeIcons();
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
   REVIEWS SWIPER
   ========================= */

function initReviewsSlider() {
    if (typeof Swiper === "undefined") return;

    const slider = document.querySelector(".reviews-swiper");

    if (!slider) return;

    new Swiper(".reviews-swiper", {
        slidesPerView: 1,
        spaceBetween: 16,
        speed: 760,
        loop: true,
        grabCursor: true,

        pagination: {
            el: ".reviews-pagination",
            clickable: true
        },

        navigation: {
            nextEl: ".reviews-next",
            prevEl: ".reviews-prev"
        },

        breakpoints: {
            720: {
                slidesPerView: 2,
                spaceBetween: 18
            },

            1100: {
                slidesPerView: 3,
                spaceBetween: 18
            }
        }
    });
}

/* =========================
   HERO SOFT PARALLAX
   ========================= */

function initHeroParallax() {
    const hero = document.querySelector(".home-hero");
    const visual = document.querySelector(".hero-image-frame");
    const cards = document.querySelectorAll(".hero-floating-card");

    if (!hero || !visual || !cards.length) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    let rafId = null;

    const updateParallax = () => {
        const rect = hero.getBoundingClientRect();
        const progress = Math.min(Math.max((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0), 1);

        const imageMove = (progress - 0.5) * 18;
        const cardMove = (progress - 0.5) * -22;

        visual.style.transform = `translateY(${imageMove}px)`;

        cards.forEach((card, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            card.style.transform = `translateY(${cardMove * direction}px)`;
        });

        rafId = null;
    };

    const requestUpdate = () => {
        if (rafId) return;
        rafId = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();

    window.addEventListener("scroll", requestUpdate, {
        passive: true
    });

    window.addEventListener("resize", requestUpdate);
}

/* =========================
   SOFT 3D CARD TILT
   ========================= */

function initHomeCardTilt() {
    const cards = document.querySelectorAll(".editorial-service-card, .review-card, .comparison-card");

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

            const rotateX = ((y - centerY) / centerY) * -3;
            const rotateY = ((x - centerX) / centerX) * 3;

            card.style.transform = `translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });
}

/* =========================
   ICON REFRESH
   ========================= */

function refreshHomeIcons() {
    if (window.NESTWISE && typeof window.NESTWISE.refreshIcons === "function") {
        window.NESTWISE.refreshIcons();
        return;
    }

    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }
}