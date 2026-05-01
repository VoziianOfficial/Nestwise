"use strict";

/* ==========================================================
   NESTWISE — SERVICES PAGE SCRIPT
   File: /js/services.js
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initAos();
    initServiceInfoSlider();
    initServicesTilt();
    refreshServicesIcons();
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
   SERVICE INFO SWIPER
   ========================= */

function initServiceInfoSlider() {
    if (typeof Swiper === "undefined") return;

    const slider = document.querySelector(".service-info-swiper");

    if (!slider) return;

    new Swiper(".service-info-swiper", {
        slidesPerView: 1,
        spaceBetween: 16,
        speed: 760,
        loop: true,
        grabCursor: true,

        pagination: {
            el: ".service-info-pagination",
            clickable: true
        },

        navigation: {
            nextEl: ".service-info-next",
            prevEl: ".service-info-prev"
        },

        breakpoints: {
            720: {
                slidesPerView: 2,
                spaceBetween: 18
            },

            1120: {
                slidesPerView: 3,
                spaceBetween: 18
            }
        }
    });
}

/* =========================
   SOFT TILT EFFECT
   ========================= */

function initServicesTilt() {
    const cards = document.querySelectorAll(
        ".service-feature-card, .process-steps article, .info-slide, .evaluation-list article"
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

            const rotateX = ((y - centerY) / centerY) * -2.6;
            const rotateY = ((x - centerX) / centerX) * 2.6;

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

function refreshServicesIcons() {
    if (window.NESTWISE && typeof window.NESTWISE.refreshIcons === "function") {
        window.NESTWISE.refreshIcons();
        return;
    }

    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }
}