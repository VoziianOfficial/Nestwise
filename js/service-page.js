"use strict";



document.addEventListener("DOMContentLoaded", () => {
    const service = getCurrentService();

    if (!service) {
        console.warn("No service data found for this page.");
        return;
    }

    renderServicePage(service);
    initAos();
    initServicePageTilt();
    initServiceGallerySlider();
    injectServiceFaqSchema(service);
    refreshServiceIcons();
});



function getCurrentService() {
    if (window.NESTWISE && typeof window.NESTWISE.getCurrentService === "function") {
        return window.NESTWISE.getCurrentService();
    }

    const config = window.SITE_CONFIG;

    if (!config) return null;

    const pageName = window.location.pathname.split("/").pop() || "index.html";

    return config.services.find((service) => service.href === pageName) || null;
}



function renderServicePage(service) {
    setText("[data-service-kicker]", service.kicker);
    setText("[data-service-title]", service.title);
    setText("[data-service-description]", service.description);
    setText("[data-service-short-description]", service.shortDescription);

    setImage("[data-service-hero-image]", service.pageImage, `${service.title} provider matching`);
    setImage("[data-service-card-image]", service.image, `${service.title} category image`);

    renderEvaluationPoints(service);
    renderFactors(service);
    renderServiceFaq(service);
    renderRelatedServices(service);
    renderServiceSelect(service);
    renderServiceVisualLabels(service);
}

function setText(selector, value) {
    document.querySelectorAll(selector).forEach((element) => {
        element.textContent = value;
    });
}

function setImage(selector, src, alt) {
    document.querySelectorAll(selector).forEach((image) => {
        image.setAttribute("src", src);
        image.setAttribute("alt", alt);
    });
}



function renderEvaluationPoints(service) {
    const list = document.querySelector("[data-service-evaluation-list]");

    if (!list) return;

    list.innerHTML = service.evaluationPoints
        .map((point, index) => {
            return `
                <article class="service-evaluation-item" data-aos="fade-up" data-aos-delay="${index * 70}">
                    <span>${String(index + 1).padStart(2, "0")}</span>
                    <p>${point}</p>
                </article>
            `;
        })
        .join("");
}




function renderFactors(service) {
    const list = document.querySelector("[data-service-factors]");

    if (!list) return;

    const icons = [
        "map-pin",
        "search-check",
        "home",
        "scan-search",
        "clock",
        "file-check"
    ];

    const labels = [
        "Location",
        "Activity",
        "Access",
        "Entry areas",
        "Timing",
        "Scope"
    ];

    const fallbackFactors = [
        "Provider availability by ZIP code",
        "Visible signs or reported wildlife activity",
        "Attic, crawl area, roofline, or exterior access",
        "Possible gaps, vents, soffits, or openings",
        "Seasonal activity and scheduling needs",
        "Inspection, cleanup, prevention, or estimate details"
    ];

    const factors = [...(service.factors || [])];

    while (factors.length < 6) {
        factors.push(fallbackFactors[factors.length]);
    }

    const visibleFactors = factors.slice(0, 6);

    if (list.classList.contains("factors-table-list")) {
        list.innerHTML = visibleFactors
            .map((factor, index) => {
                const icon = icons[index];
                const label = labels[index];

                return `
                    <article data-aos="fade-up" data-aos-delay="${index * 70}">
                        <i data-lucide="${icon}"></i>

                        <div>
                            <span>${label}</span>
                            <h3>${factor}</h3>
                        </div>
                    </article>
                `;
            })
            .join("");

        return;
    }

    list.innerHTML = visibleFactors
        .map((factor, index) => {
            const icon = icons[index];
            const label = labels[index];

            return `
                <article class="factor-card" data-aos="fade-up" data-aos-delay="${index * 70}">
                    <span class="factor-icon">
                        <i data-lucide="${icon}"></i>
                    </span>

                    <div>
                        <span class="factor-number">${label}</span>
                        <h3>${factor}</h3>
                    </div>
                </article>
            `;
        })
        .join("");
}


function renderServiceFaq(service) {
    const list = document.querySelector("[data-service-faq-list]");

    if (!list) return;

    list.innerHTML = service.faq
        .map((item, index) => {
            return `
                <div class="faq-item${index === 0 ? " is-open" : ""}">
                    <button class="faq-question" type="button">
                        <span>${item.question}</span>
                        <span class="faq-icon" aria-hidden="true"></span>
                    </button>

                    <div class="faq-answer">
                        <div class="faq-answer-inner">
                            <p>${item.answer}</p>
                        </div>
                    </div>
                </div>
            `;
        })
        .join("");
}



function renderRelatedServices(currentService) {
    const list = document.querySelector("[data-related-services]");
    const config = window.SITE_CONFIG;

    if (!list || !config) return;

    const relatedServices = config.services.filter((service) => service.id !== currentService.id);

    list.innerHTML = relatedServices
        .map((service, index) => {
            return `
                <a class="related-service-card" href="${service.href}" data-aos="fade-up" data-aos-delay="${index * 70}">
                    <img src="${service.image}" alt="${service.title}">

                    <span class="related-service-icon">
                        <i data-lucide="${service.icon}"></i>
                    </span>

                    <div>
                        <span>${service.kicker}</span>
                        <h3>${service.title}</h3>
                        <p>${service.shortDescription}</p>
                    </div>
                </a>
            `;
        })
        .join("");
}



function renderServiceSelect(currentService) {
    const selects = document.querySelectorAll("[data-service-select]");
    const config = window.SITE_CONFIG;

    if (!selects.length || !config) return;

    selects.forEach((select) => {
        select.innerHTML = `
            <option value="">Choose a concern</option>
            ${config.services
                .map((service) => {
                    const selected = service.id === currentService.id ? "selected" : "";

                    return `
                        <option value="${service.title}" ${selected}>
                            ${service.title}
                        </option>
                    `;
                })
                .join("")}
        `;
    });
}



function renderServiceVisualLabels(service) {
    const labels = document.querySelectorAll("[data-service-menu-title]");

    labels.forEach((label) => {
        label.textContent = service.menuTitle;
    });
}



function initAos() {
    if (typeof AOS === "undefined") return;

    AOS.init({
        duration: 850,
        easing: "ease-out-cubic",
        once: true,
        offset: 70
    });
}



function initServiceGallerySlider() {
    if (typeof Swiper === "undefined") return;

    const slider = document.querySelector(".service-gallery-swiper");

    if (!slider) return;

    new Swiper(".service-gallery-swiper", {
        slidesPerView: 1,
        spaceBetween: 14,
        speed: 760,
        grabCursor: true,
        loop: true,

        pagination: {
            el: ".service-gallery-pagination",
            clickable: true
        },

        navigation: {
            nextEl: ".service-gallery-next",
            prevEl: ".service-gallery-prev"
        },

        breakpoints: {
            760: {
                slidesPerView: 2,
                spaceBetween: 16
            },

            1120: {
                slidesPerView: 3,
                spaceBetween: 18
            }
        }
    });
}



function initServicePageTilt() {
    const cards = document.querySelectorAll(
        ".service-evaluation-item, .factor-card, .related-service-card, .service-insight-card, .service-request-mini"
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

            card.style.transform = `translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });
}



function injectServiceFaqSchema(service) {
    if (!service.faq || !service.faq.length) return;

    const existingSchema = document.querySelector('script[data-service-faq-schema="true"]');

    if (existingSchema) {
        existingSchema.remove();
    }

    const schema = document.createElement("script");

    schema.type = "application/ld+json";
    schema.setAttribute("data-service-faq-schema", "true");

    schema.textContent = JSON.stringify(
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: service.faq.map((item) => {
                return {
                    "@type": "Question",
                    name: item.question,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: item.answer
                    }
                };
            })
        },
        null,
        2
    );

    document.head.appendChild(schema);
}



function refreshServiceIcons() {
    if (window.NESTWISE && typeof window.NESTWISE.refreshIcons === "function") {
        window.NESTWISE.refreshIcons();
        return;
    }

    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }
}
