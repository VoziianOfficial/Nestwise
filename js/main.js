"use strict";

/* ==========================================================
   NESTWISE — MAIN GLOBAL SCRIPT
   Shared behavior:
   - config injection
   - page meta
   - sticky header
   - active navigation
   - mobile full-screen menu
   - footer generation
   - policy consent banner
   - FAQ accordion
   - reveal animations
   - request form UI behavior
   ========================================================== */

(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.warn("SITE_CONFIG is missing. Make sure js/config.js is loaded before js/main.js.");
        return;
    }

    const selectors = {
        siteHeader: "[data-site-header]",
        mobileMenu: "[data-mobile-menu]",
        siteFooter: "[data-site-footer]",
        companyName: "[data-company-name]",
        companyId: "[data-company-id]",
        phoneText: "[data-phone-text]",
        phoneLink: "[data-phone-link]",
        emailText: "[data-email-text]",
        emailLink: "[data-email-link]",
        addressText: "[data-address-text]",
        serviceArea: "[data-service-area]",
        footerText: "[data-footer-text]",
        disclaimer: "[data-disclaimer]",
        aggregatorNotice: "[data-aggregator-notice]",
        legalNotice: "[data-legal-notice]",
        requestForm: "[data-request-form]",
        faqItem: ".faq-item",
        reveal: "[data-reveal]",
        lineReveal: ".line-reveal"
    };

    document.addEventListener("DOMContentLoaded", () => {
        applyPageMeta();
        ensureBaseLayout();
        injectConfigValues();
        initHeaderScroll();
        initActiveNav();
        initMobileMenu();
        initFaqAccordions();
        initRevealAnimations();
        initTimelineLines();
        initRequestForms();
        initPolicyConsent();
        injectFaqSchemaFromDom();
        refreshIcons();
    });

    /* =========================
       PAGE HELPERS
       ========================= */

    function getCurrentPageName() {
        const path = window.location.pathname;
        const fileName = path.substring(path.lastIndexOf("/") + 1);

        if (!fileName || fileName === "") {
            return "index.html";
        }

        return fileName;
    }

    function getCurrentService() {
        const pageName = getCurrentPageName();

        return config.services.find((service) => service.href === pageName) || null;
    }

    function isCurrentPage(href) {
        const pageName = getCurrentPageName();

        if (pageName === "index.html" && (href === "./" || href === "/" || href === "index.html")) {
            return true;
        }

        return pageName === href;
    }

    function applyPageMeta() {
        const pageName = getCurrentPageName();
        const meta = config.pageMeta?.[pageName];

        if (!meta) {
            console.warn(`No pageMeta found for ${pageName}`);
            return;
        }

        document.title = meta.title;

        let metaDescription = document.querySelector('meta[name="description"]');

        if (!metaDescription) {
            metaDescription = document.createElement("meta");
            metaDescription.setAttribute("name", "description");
            document.head.appendChild(metaDescription);
        }

        metaDescription.setAttribute("content", meta.description);
    }

    /* =========================
       BASE LAYOUT
       ========================= */

    function ensureBaseLayout() {
        ensureSkipLink();
        ensureHeader();
        ensureMobileMenu();
        ensureFooter();
    }

    function ensureSkipLink() {
        if (document.querySelector(".skip-link")) return;

        const skipLink = document.createElement("a");
        skipLink.className = "skip-link";
        skipLink.href = "#main";
        skipLink.textContent = "Skip to main content";

        document.body.prepend(skipLink);
    }

    function ensureHeader() {
        let header = document.querySelector(selectors.siteHeader);

        if (!header) {
            header = document.createElement("header");
            header.className = "site-header";
            header.setAttribute("data-site-header", "");
            header.setAttribute("aria-label", "Site header");
            document.body.prepend(header);
        }

        header.innerHTML = createHeaderMarkup();
    }

    function ensureMobileMenu() {
        let mobileMenu = document.querySelector(selectors.mobileMenu);

        if (!mobileMenu) {
            mobileMenu = document.createElement("div");
            mobileMenu.className = "mobile-menu";
            mobileMenu.setAttribute("data-mobile-menu", "");
            mobileMenu.setAttribute("aria-hidden", "true");

            const header = document.querySelector(selectors.siteHeader);

            if (header) {
                header.insertAdjacentElement("afterend", mobileMenu);
            } else {
                document.body.prepend(mobileMenu);
            }
        }

        mobileMenu.innerHTML = createMobileMenuMarkup();
    }

    function ensureFooter() {
        let footer = document.querySelector(selectors.siteFooter);

        if (!footer) {
            footer = document.createElement("footer");
            footer.className = "site-footer";
            footer.setAttribute("data-site-footer", "");

            document.body.appendChild(footer);
        }

        footer.innerHTML = createFooterMarkup();
    }

    /* =========================
       HEADER MARKUP
       ========================= */

    function createHeaderMarkup() {
        const navigationMarkup = config.navigation
            .map((item) => {
                const activeClass = isCurrentPage(item.href) ? " is-active" : "";

                return `
                    <a class="nav-link${activeClass}" href="${item.href}">
                        ${item.label}
                    </a>
                `;
            })
            .join("");

        return `
            <div class="container-wide header-inner">
                ${createLogoMarkup("header")}

                <nav class="desktop-nav" aria-label="Main navigation">
                    ${navigationMarkup}
                </nav>

                <div class="header-actions">
                    <a class="btn btn-primary header-phone" href="tel:${config.phoneHref}" data-phone-link>
                        <span data-phone-text>${config.phoneLabel}</span>
                    </a>

                    <a class="mobile-call" href="tel:${config.phoneHref}" data-phone-link aria-label="Call ${config.companyName}">
                        <i data-lucide="phone"></i>
                    </a>

                    <button class="menu-toggle" type="button" data-menu-toggle aria-label="Open menu" aria-expanded="false">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        `;
    }

    function createLogoMarkup(context = "default") {
        const href = context === "footer" ? "index.html" : "index.html";

        return `
            <a class="brand-logo" href="${href}" aria-label="${config.brand.logoLabel}">
                <span class="logo-mark" aria-hidden="true">
                    <span class="logo-bird"></span>
                    <span class="logo-bird"></span>
                </span>

                <span class="logo-text">
                    <span class="logo-name" data-company-name>${config.companyName}</span>
                    <span class="logo-tagline">${config.brand.shortTagline}</span>
                </span>
            </a>
        `;
    }

    /* =========================
       MOBILE MENU MARKUP
       ========================= */

    function createMobileMenuMarkup() {
        const navMarkup = config.navigation
            .map((item) => {
                return `
                    <a href="${item.href}">
                        <span>${item.label}</span>
                    </a>
                `;
            })
            .join("");

        const servicesMarkup = config.services
            .map((service) => {
                return `
                    <a href="${service.href}">
                        <span>${service.menuTitle}</span>
                    </a>
                `;
            })
            .join("");

        return `
            <div class="mobile-menu-panel" role="dialog" aria-modal="true" aria-label="Mobile navigation">
                <div class="mobile-menu-head">
                    <span class="section-kicker">Menu</span>
                    <p>
                        Compare independent wildlife provider options with a calm, structured request flow.
                    </p>
                </div>

                <div class="mobile-menu-scroll">
                    <nav class="mobile-nav" aria-label="Mobile main navigation">
                        ${navMarkup}
                    </nav>

                    <div class="mobile-menu-block">
                        <h3>Service categories</h3>
                        <div class="mobile-service-links">
                            ${servicesMarkup}
                        </div>
                    </div>
                </div>

                <div class="mobile-menu-contact">
                    <a class="mobile-contact-card" href="tel:${config.phoneHref}" data-phone-link>
                        <i data-lucide="phone"></i>
                        <span data-phone-text>${config.phoneLabel}</span>
                    </a>

                    <a class="mobile-contact-card" href="mailto:${config.email}" data-email-link>
                        <i data-lucide="mail"></i>
                        <span data-email-text>${config.email}</span>
                    </a>
                </div>
            </div>
        `;
    }

    /* =========================
       FOOTER MARKUP
       ========================= */

    function createFooterMarkup() {
        const year = new Date().getFullYear();

        const navigationLinks = config.navigation
            .map((item) => `<a href="${item.href}">${item.label}</a>`)
            .join("");

        const serviceLinks = config.services
            .map((service) => `<a href="${service.href}">${service.menuTitle}</a>`)
            .join("");

        const legalLinks = config.legalLinks
            .map((item) => `<a href="${item.href}">${item.label}</a>`)
            .join("");

        return `
            <div class="container-wide footer-inner">
                <div class="footer-top">
                    <div class="footer-brand">
                        ${createLogoMarkup("footer")}

                        <p data-footer-text>${config.footerText}</p>

                        <div class="footer-contact">
                            <a href="tel:${config.phoneHref}" data-phone-link>
                                <span data-phone-text>${config.phoneLabel}</span>
                            </a>

                            <a href="mailto:${config.email}" data-email-link>
                                <span data-email-text>${config.email}</span>
                            </a>

                            <span data-service-area>${config.serviceArea}</span>
                        </div>
                    </div>

                    <div class="footer-column">
                        <h3>Navigation</h3>
                        <nav class="footer-links" aria-label="Footer navigation">
                            ${navigationLinks}
                        </nav>
                    </div>

                    <div class="footer-column">
                        <h3>Services</h3>
                        <nav class="footer-links" aria-label="Footer services">
                            ${serviceLinks}
                        </nav>
                    </div>

                    <div class="footer-column">
                        <h3>Legal</h3>
                        <nav class="footer-links" aria-label="Legal navigation">
                            ${legalLinks}
                        </nav>
                    </div>
                </div>

                <div class="footer-disclaimer">
                    <p data-disclaimer>${config.disclaimer}</p>
                    <p data-aggregator-notice>${config.aggregatorNotice}</p>
                </div>

                <div class="footer-bottom">
                    <span>
                        © ${year} <span data-company-name>${config.companyName}</span>. All rights reserved.
                    </span>

                    <span>
                        <span data-company-name>${config.companyName}</span>
                        · ID: <span data-company-id>${config.companyId}</span>
                        · <span data-address-text>${config.address.full}</span>
                    </span>
                </div>
            </div>
        `;
    }

    /* =========================
       CONFIG VALUE INJECTION
       ========================= */

    function injectConfigValues() {
        setText(selectors.companyName, config.companyName);
        setText(selectors.companyId, config.companyId);
        setText(selectors.phoneText, config.phoneLabel || config.phone);
        setText(selectors.emailText, config.email);
        setText(selectors.addressText, config.address.full);
        setText(selectors.serviceArea, config.serviceArea);
        setText(selectors.footerText, config.footerText);
        setText(selectors.disclaimer, config.disclaimer);
        setText(selectors.aggregatorNotice, config.aggregatorNotice);
        setText(selectors.legalNotice, config.disclaimer);

        document.querySelectorAll(selectors.phoneLink).forEach((link) => {
            link.setAttribute("href", `tel:${config.phoneHref}`);
        });

        document.querySelectorAll(selectors.emailLink).forEach((link) => {
            link.setAttribute("href", `mailto:${config.email}`);
        });
    }

    function setText(selector, value) {
        document.querySelectorAll(selector).forEach((element) => {
            element.textContent = value;
        });
    }

    /* =========================
       HEADER SCROLL
       ========================= */

    function initHeaderScroll() {
        const header = document.querySelector(selectors.siteHeader);

        if (!header) return;

        const updateHeader = () => {
            header.classList.toggle("is-scrolled", window.scrollY > 12);
        };

        updateHeader();

        window.addEventListener("scroll", updateHeader, {
            passive: true
        });
    }

    /* =========================
       ACTIVE NAV
       ========================= */

    function initActiveNav() {
        const links = document.querySelectorAll(".nav-link");

        links.forEach((link) => {
            const href = link.getAttribute("href");

            if (href && isCurrentPage(href)) {
                link.classList.add("is-active");
            }
        });
    }

    /* =========================
       MOBILE MENU
       ========================= */

    function initMobileMenu() {
        const toggle = document.querySelector("[data-menu-toggle]");
        const menu = document.querySelector(selectors.mobileMenu);
        const menuLinks = menu ? menu.querySelectorAll("a") : [];

        if (!toggle || !menu) return;

        const openMenu = () => {
            toggle.classList.add("is-active");
            menu.classList.add("is-open");
            document.body.classList.add("menu-open");
            toggle.setAttribute("aria-expanded", "true");
            toggle.setAttribute("aria-label", "Close menu");
            menu.setAttribute("aria-hidden", "false");
        };

        const closeMenu = () => {
            toggle.classList.remove("is-active");
            menu.classList.remove("is-open");
            document.body.classList.remove("menu-open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", "Open menu");
            menu.setAttribute("aria-hidden", "true");
        };

        toggle.addEventListener("click", () => {
            const isOpen = menu.classList.contains("is-open");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        menuLinks.forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && menu.classList.contains("is-open")) {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 920 && menu.classList.contains("is-open")) {
                closeMenu();
            }
        });
    }

    /* =========================
       FAQ ACCORDION
       ========================= */

    function initFaqAccordions() {
        const faqItems = document.querySelectorAll(selectors.faqItem);

        faqItems.forEach((item, index) => {
            const button = item.querySelector(".faq-question");
            const answer = item.querySelector(".faq-answer");

            if (!button || !answer) return;

            const answerId = answer.id || `faq-answer-${index + 1}`;

            answer.id = answerId;
            button.setAttribute("aria-controls", answerId);
            button.setAttribute("aria-expanded", item.classList.contains("is-open") ? "true" : "false");

            if (item.classList.contains("is-open")) {
                answer.style.maxHeight = `${answer.scrollHeight}px`;
            }

            button.addEventListener("click", () => {
                const isOpen = item.classList.contains("is-open");

                faqItems.forEach((otherItem) => {
                    const otherButton = otherItem.querySelector(".faq-question");
                    const otherAnswer = otherItem.querySelector(".faq-answer");

                    otherItem.classList.remove("is-open");

                    if (otherButton) {
                        otherButton.setAttribute("aria-expanded", "false");
                    }

                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = "0px";
                    }
                });

                if (!isOpen) {
                    item.classList.add("is-open");
                    button.setAttribute("aria-expanded", "true");
                    answer.style.maxHeight = `${answer.scrollHeight}px`;
                }
            });
        });
    }

    /* =========================
       REVEAL ANIMATIONS
       ========================= */

    function initRevealAnimations() {
        const revealItems = document.querySelectorAll(`${selectors.reveal}, ${selectors.lineReveal}`);

        if (!revealItems.length) return;

        if (!("IntersectionObserver" in window)) {
            revealItems.forEach((item) => item.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.14,
                rootMargin: "0px 0px -60px 0px"
            }
        );

        revealItems.forEach((item, index) => {
            item.style.transitionDelay = `${Math.min(index * 55, 280)}ms`;
            observer.observe(item);
        });
    }

    function initTimelineLines() {
        const timelineItems = document.querySelectorAll(".timeline-item");

        if (!timelineItems.length) return;

        if (!("IntersectionObserver" in window)) {
            timelineItems.forEach((item) => item.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.24
            }
        );

        timelineItems.forEach((item) => observer.observe(item));
    }

    /* =========================
       REQUEST FORMS
       ========================= */

    function initRequestForms() {
        const forms = document.querySelectorAll(selectors.requestForm);

        forms.forEach((form) => {
            const status = form.querySelector("[data-form-status]");
            const submitButton = form.querySelector("[type='submit']");

            form.addEventListener("submit", (event) => {
                event.preventDefault();

                const requiredFields = form.querySelectorAll("[required]");
                let isValid = true;

                requiredFields.forEach((field) => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add("is-invalid");
                    } else {
                        field.classList.remove("is-invalid");
                    }

                    if (field.type === "checkbox" && !field.checked) {
                        isValid = false;
                        field.closest(".custom-check")?.classList.add("is-invalid");
                    } else if (field.type === "checkbox") {
                        field.closest(".custom-check")?.classList.remove("is-invalid");
                    }
                });

                if (!isValid) {
                    if (status) {
                        status.textContent = "Please complete the required fields before submitting your matching request.";
                        status.classList.add("is-error");
                    }

                    return;
                }

                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.textContent = "Request noted";
                }

                if (status) {
                    status.textContent = "Your request details are ready. Connect this form to your backend or lead provider endpoint.";
                    status.classList.remove("is-error");
                    status.classList.add("is-success");
                }

                setTimeout(() => {
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.textContent = "Request matching";
                    }
                }, 1800);
            });

            form.querySelectorAll(".form-control").forEach((field) => {
                field.addEventListener("input", () => {
                    field.classList.remove("is-invalid");

                    if (status) {
                        status.textContent = "";
                        status.classList.remove("is-error", "is-success");
                    }
                });
            });
        });
    }

    /* =========================
       POLICY CONSENT
       ========================= */

    function initPolicyConsent() {
        const consent = config.policyConsent;

        if (!consent) return;

        const savedConsent = localStorage.getItem(consent.storageKey);

        if (savedConsent === "accepted" || savedConsent === "declined") {
            return;
        }

        const banner = document.createElement("div");
        banner.className = "policy-consent is-visible";
        banner.setAttribute("data-policy-consent", "");
        banner.setAttribute("role", "region");
        banner.setAttribute("aria-label", "Privacy and policy notice");

        const linksMarkup = consent.links
            .map((link) => `<a href="${link.href}">${link.label}</a>`)
            .join("");

        banner.innerHTML = `
            <div class="policy-consent-card">
                <div class="policy-consent-text">
                    <h2>${consent.title}</h2>
                    <p>${consent.text}</p>

                    <div class="policy-consent-links">
                        ${linksMarkup}
                    </div>
                </div>

                <div class="policy-consent-actions">
                    <button class="btn btn-secondary" type="button" data-consent-decline>
                        ${consent.declineLabel}
                    </button>

                    <button class="btn btn-primary" type="button" data-consent-accept>
                        ${consent.acceptLabel}
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        const acceptButton = banner.querySelector("[data-consent-accept]");
        const declineButton = banner.querySelector("[data-consent-decline]");

        acceptButton?.addEventListener("click", () => {
            localStorage.setItem(consent.storageKey, "accepted");
            banner.classList.remove("is-visible");
        });

        declineButton?.addEventListener("click", () => {
            localStorage.setItem(consent.storageKey, "declined");
            banner.classList.remove("is-visible");
        });
    }

    /* =========================
       FAQ JSON-LD FROM DOM
       ========================= */

    function injectFaqSchemaFromDom() {
        const faqItems = document.querySelectorAll(selectors.faqItem);

        if (!faqItems.length) return;

        const faqEntities = [];

        faqItems.forEach((item) => {
            const question = item.querySelector(".faq-question span")?.textContent?.trim();
            const answer = item.querySelector(".faq-answer-inner")?.textContent?.trim();

            if (!question || !answer) return;

            faqEntities.push({
                "@type": "Question",
                name: question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: answer
                }
            });
        });

        if (!faqEntities.length) return;

        const existingSchema = document.querySelector('script[data-faq-schema="true"]');

        if (existingSchema) {
            existingSchema.remove();
        }

        const schema = document.createElement("script");
        schema.type = "application/ld+json";
        schema.setAttribute("data-faq-schema", "true");

        schema.textContent = JSON.stringify(
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqEntities
            },
            null,
            2
        );

        document.head.appendChild(schema);
    }

    /* =========================
       ICONS
       ========================= */

    function refreshIcons() {
        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    }

    /* =========================
       SHARED PUBLIC HELPERS
       ========================= */

    window.NESTWISE = {
        getConfig() {
            return config;
        },

        getCurrentPageName,
        getCurrentService,
        refreshIcons,

        createFaqItem(question, answer, isOpen = false) {
            return `
                <div class="faq-item${isOpen ? " is-open" : ""}">
                    <button class="faq-question" type="button">
                        <span>${question}</span>
                        <span class="faq-icon" aria-hidden="true"></span>
                    </button>

                    <div class="faq-answer">
                        <div class="faq-answer-inner">
                            <p>${answer}</p>
                        </div>
                    </div>
                </div>
            `;
        },

        createRequestFormMarkup(title = config.requestForm.title, subtitle = config.requestForm.subtitle) {
            const servicesOptions = config.services
                .map((service) => `<option value="${service.title}">${service.title}</option>`)
                .join("");

            return `
                <div class="request-card">
                    <div class="request-card-head">
                        <span class="section-kicker">Request matching</span>
                        <h2>${title}</h2>
                        <p>${subtitle}</p>
                    </div>

                    <form class="request-form" data-request-form>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label" for="request-name">${config.requestForm.fields.name}</label>
                                <input class="form-control" id="request-name" name="name" type="text" placeholder="Jane Smith" required>
                            </div>

                            <div class="form-group">
                                <label class="form-label" for="request-email">${config.requestForm.fields.email}</label>
                                <input class="form-control" id="request-email" name="email" type="email" placeholder="name@email.com" required>
                            </div>

                            <div class="form-group">
                                <label class="form-label" for="request-phone">${config.requestForm.fields.phone}</label>
                                <input class="form-control" id="request-phone" name="phone" type="tel" placeholder="(555) 000-0000" required>
                            </div>

                            <div class="form-group">
                                <label class="form-label" for="request-zip">${config.requestForm.fields.zip}</label>
                                <input class="form-control" id="request-zip" name="zip" type="text" inputmode="numeric" placeholder="ZIP code" required>
                            </div>

                            <div class="form-group full">
                                <label class="form-label" for="request-service">${config.requestForm.fields.service}</label>
                                <select class="form-control" id="request-service" name="service" required>
                                    <option value="">Choose a concern</option>
                                    ${servicesOptions}
                                </select>
                            </div>

                            <div class="form-group full">
                                <label class="form-label" for="request-message">${config.requestForm.fields.message}</label>
                                <textarea class="form-control" id="request-message" name="message" placeholder="Describe noises, visible signs, entry points, or timing." required></textarea>
                            </div>

                            <div class="form-group full">
                                <label class="custom-check">
                                    <input type="checkbox" name="consent" required>
                                    <span class="check-mark" aria-hidden="true"></span>
                                    <span>${config.requestForm.consentLabel}</span>
                                </label>
                            </div>
                        </div>

                        <div class="request-form-bottom">
                            <button class="btn btn-primary" type="submit">Request matching</button>
                            <p class="form-note">${config.requestForm.privacyNote}</p>
                        </div>

                        <p class="form-status" data-form-status aria-live="polite"></p>
                    </form>
                </div>
            `;
        },

        createMapMarkup() {
            const pins = config.mapCard.pins
                .map((pin) => `<span>${pin}</span>`)
                .join("");

            return `
                <div class="map-shell">
                    <div class="map-lines" aria-hidden="true"></div>

                    <span class="map-pin" aria-hidden="true"></span>
                    <span class="map-pin" aria-hidden="true"></span>
                    <span class="map-pin" aria-hidden="true"></span>
                    <span class="map-pin" aria-hidden="true"></span>

                    <div class="map-content">
                        <h3>${config.mapCard.title}</h3>
                        <p>${config.mapCard.text}</p>

                        <div class="map-tags">
                            ${pins}
                        </div>
                    </div>
                </div>
            `;
        }
    };
})();