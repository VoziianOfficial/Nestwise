"use strict";



document.addEventListener("DOMContentLoaded", () => {
    initAos();
    initServicesHeroSlider();
    initServiceInfoSlider();
    initServicesSoftHover();
    refreshServicesIcons();
});



function initAos() {
    if (typeof AOS === "undefined") return;

    AOS.init({
        duration: 850,
        easing: "ease-out-cubic",
        once: true,
        offset: 70
    });
}



function initServicesHeroSlider() {
    const section = document.querySelector(".services-hero-v2");
    const track = document.querySelector("[data-service-slider-track]");
    const bgSlides = Array.from(document.querySelectorAll(".services-hero-bg-slide"));

    if (!section || (!track && !bgSlides.length)) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let intervalId = null;
    let isAnimating = false;
    let activeIndex = 0;

    const delay = prefersReducedMotion ? 5000 : 2200;
    const animationSpeed = prefersReducedMotion ? 0 : 520;

    function getGap() {
        if (!track) return 0;

        const styles = window.getComputedStyle(track);
        return parseFloat(styles.gap) || 0;
    }

    function setActiveBackground(index) {
        if (!bgSlides.length) return;

        bgSlides.forEach((slide, slideIndex) => {
            slide.classList.toggle("is-active", slideIndex === index);
        });
    }

    function slideCardsNext() {
        if (!track || isAnimating || !track.children.length) return;

        const firstCard = track.children[0];
        const gap = getGap();
        const stepWidth = firstCard.getBoundingClientRect().width + gap;

        isAnimating = true;

        track.style.transition = `transform ${animationSpeed}ms cubic-bezier(0.22, 1, 0.36, 1)`;
        track.style.transform = `translateX(-${stepWidth}px)`;

        window.setTimeout(() => {
            track.style.transition = "none";
            track.appendChild(firstCard);
            track.style.transform = "translateX(0)";

            void track.offsetWidth;

            isAnimating = false;
        }, animationSpeed + 20);
    }

    function goNext() {
        activeIndex = (activeIndex + 1) % Math.max(bgSlides.length, 1);

        setActiveBackground(activeIndex);
        slideCardsNext();
    }

    function startSlider() {
        stopSlider();

        intervalId = window.setInterval(goNext, delay);
    }

    function stopSlider() {
        if (!intervalId) return;

        window.clearInterval(intervalId);
        intervalId = null;
    }

    setActiveBackground(0);
    startSlider();

    section.addEventListener("mouseenter", stopSlider);
    section.addEventListener("mouseleave", startSlider);

    section.addEventListener("focusin", stopSlider);
    section.addEventListener("focusout", startSlider);

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopSlider();
        } else {
            startSlider();
        }
    });
}



function initServiceInfoSlider() {
    if (typeof Swiper === "undefined") return;

    const slider = document.querySelector(".service-info-swiper");

    if (!slider) return;

    new Swiper(".service-info-swiper", {
        slidesPerView: "auto",
        spaceBetween: 16,
        speed: 650,
        loop: true,
        grabCursor: true,
        watchOverflow: true,

        pagination: {
            el: ".service-info-pagination",
            clickable: true
        },

        navigation: {
            nextEl: ".service-info-next",
            prevEl: ".service-info-prev"
        },

        breakpoints: {
            760: {
                spaceBetween: 18
            },

            1120: {
                spaceBetween: 22
            }
        }
    });
}



function initServicesSoftHover() {
    const items = document.querySelectorAll(
        ".service-slide-card, .detail-rail-slide, .services-index-row, .services-process-row, .evaluation-v2-row"
    );

    if (!items.length) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    items.forEach((item) => {
        item.addEventListener("mousemove", (event) => {
            const rect = item.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const moveX = ((x - centerX) / centerX) * 3;
            const moveY = ((y - centerY) / centerY) * 3;

            item.style.setProperty("--hover-x", `${moveX}px`);
            item.style.setProperty("--hover-y", `${moveY}px`);
        });

        item.addEventListener("mouseleave", () => {
            item.style.removeProperty("--hover-x");
            item.style.removeProperty("--hover-y");
        });
    });
}



function refreshServicesIcons() {
    if (window.NESTWISE && typeof window.NESTWISE.refreshIcons === "function") {
        window.NESTWISE.refreshIcons();
        return;
    }

    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }
}