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

    const slideCount = slider.querySelectorAll(".swiper-slide").length;

    new Swiper(".reviews-swiper", {
        slidesPerView: 1,
        spaceBetween: 16,
        speed: 760,
        loop: slideCount > 2,
        grabCursor: true,
        watchOverflow: true,

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
                slidesPerView: 2,
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


/* =========================
   PATHWAYS AUTO SLIDESHOW
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
    initPathwaysSlideshow();
});

function initPathwaysSlideshow() {
    const slider = document.querySelector("[data-pathways-slider]");

    if (!slider) return;

    const images = Array.from(slider.querySelectorAll("[data-pathway-image]"));
    const routeCards = Array.from(document.querySelectorAll("[data-pathway-route]"));
    const progressItems = Array.from(slider.querySelectorAll(".pathways-slider-progress span"));

    const numberElement = slider.querySelector("[data-pathway-current-number]");
    const kickerElement = slider.querySelector("[data-pathway-kicker]");
    const titleElement = slider.querySelector("[data-pathway-title]");
    const textElement = slider.querySelector("[data-pathway-text]");
    const linkElement = slider.querySelector("[data-pathway-link]");

    if (!images.length || !numberElement || !kickerElement || !titleElement || !textElement || !linkElement) return;

    const slides = [
        {
            number: "01",
            kicker: "Most common starting point",
            title: "Attic Wildlife Activity",
            text: "For scratching sounds, droppings, insulation disturbance, odor, or suspected entry from roofline, soffit, or vent areas.",
            href: "attic-wildlife.html",
            link: "View attic matching path"
        },
        {
            number: "02",
            kicker: "Exterior activity signs",
            title: "Raccoon Activity Requests",
            text: "For roofline activity, vent access, deck openings, exterior damage signs, or attic-related movement concerns.",
            href: "raccoon-activity.html",
            link: "View raccoon matching path"
        },
        {
            number: "03",
            kicker: "Entry-point concerns",
            title: "Squirrel Entry Concerns",
            text: "For small gaps, chewing signs, fast attic sounds, roof access, soffit concerns, or tree-to-home movement paths.",
            href: "squirrel-entry.html",
            link: "View squirrel matching path"
        },
        {
            number: "04",
            kicker: "Specialized matching",
            title: "Bird & Bat Concerns",
            text: "For vents, chimneys, eaves, droppings, odor, seasonal activity, or provider questions around local requirements.",
            href: "bird-bat-concerns.html",
            link: "View bird & bat path"
        }
    ];

    let currentIndex = 0;
    let timerId = null;
    const delay = 4200;

    function setActiveSlide(index) {
        currentIndex = index;

        slider.classList.add("is-changing");

        setTimeout(() => {
            images.forEach((image, imageIndex) => {
                image.classList.toggle("is-active", imageIndex === index);
            });

            routeCards.forEach((card) => {
                const cardIndex = Number(card.getAttribute("data-pathway-route"));
                card.classList.toggle("is-featured", cardIndex === index);
            });

            progressItems.forEach((item, itemIndex) => {
                item.classList.remove("is-active");

                if (itemIndex === index) {
                    void item.offsetWidth;
                    item.classList.add("is-active");
                }
            });

            const slide = slides[index];

            numberElement.textContent = slide.number;
            kickerElement.textContent = slide.kicker;
            titleElement.textContent = slide.title;
            textElement.textContent = slide.text;
            linkElement.setAttribute("href", slide.href);
            linkElement.childNodes[0].nodeValue = `${slide.link} `;

            slider.classList.remove("is-changing");
        }, 180);
    }

    function nextSlide() {
        const nextIndex = (currentIndex + 1) % slides.length;
        setActiveSlide(nextIndex);
    }

    function startSlider() {
        stopSlider();
        timerId = window.setInterval(nextSlide, delay);
    }

    function stopSlider() {
        if (timerId) {
            window.clearInterval(timerId);
            timerId = null;
        }
    }

    routeCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            const index = Number(card.getAttribute("data-pathway-route"));

            if (Number.isNaN(index)) return;

            stopSlider();
            setActiveSlide(index);
        });

        card.addEventListener("mouseleave", startSlider);

        card.addEventListener("focus", () => {
            const index = Number(card.getAttribute("data-pathway-route"));

            if (Number.isNaN(index)) return;

            stopSlider();
            setActiveSlide(index);
        });

        card.addEventListener("blur", startSlider);
    });

    slider.addEventListener("mouseenter", stopSlider);
    slider.addEventListener("mouseleave", startSlider);

    setActiveSlide(0);
    startSlider();
}
