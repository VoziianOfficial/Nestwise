"use strict";



document.addEventListener("DOMContentLoaded", () => {
    initAos();
    initContactTilt();
    initContactMapMotion();
    refreshContactIcons();
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



function initContactTilt() {
    const cards = document.querySelectorAll(
        ".contact-hero-card, .contact-option-card, .request-card, .contact-map-note"
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

            const rotateX = ((y - centerY) / centerY) * -2.2;
            const rotateY = ((x - centerX) / centerX) * 2.2;

            card.style.transform = `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });
}



function initContactMapMotion() {
    const mapShells = document.querySelectorAll(".map-shell");

    if (!mapShells.length) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    mapShells.forEach((map) => {
        const pins = map.querySelectorAll(".map-pin");
        const lines = map.querySelector(".map-lines");

        map.addEventListener("mousemove", (event) => {
            const rect = map.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            pins.forEach((pin, index) => {
                const depth = (index + 1) * 4;

                pin.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
            });

            if (lines) {
                lines.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
            }
        });

        map.addEventListener("mouseleave", () => {
            pins.forEach((pin) => {
                pin.style.transform = "";
            });

            if (lines) {
                lines.style.transform = "";
            }
        });
    });
}



function refreshContactIcons() {
    if (window.NESTWISE && typeof window.NESTWISE.refreshIcons === "function") {
        window.NESTWISE.refreshIcons();
        return;
    }

    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }
}