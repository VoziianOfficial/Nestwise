"use strict";

/* ==========================================================
   NESTWISE — GLOBAL SITE CONFIG
   This file controls shared brand, contact, footer, legal,
   navigation, services, page meta, FAQ, and consent content.
   ========================================================== */

const companyName = "Nestwise";

window.SITE_CONFIG = {
    companyName,

    companyId: "NST-WLD-4827",

    brand: {
        shortName: companyName,
        tagline: "Compare local wildlife provider options with a calmer request flow.",
        shortTagline: "Wildlife provider matching",
        logoLabel: `${companyName} wildlife provider matching platform`,
        logoIcon: "nest"
    },

    phone: "+1 888 614 2039",
    phoneHref: "+18886142039",
    phoneLabel: "Compare Options",

    email: "hello@nestwisematch.com",

    address: {
        line1: "Independent provider matching platform",
        city: "United States",
        state: "",
        zip: "",
        country: "USA",
        full: "Independent provider matching platform, United States"
    },

    serviceArea: "Independent wildlife provider matching across the United States",

    footerText:
        `${companyName} is an independent wildlife provider matching platform that helps homeowners compare local provider options for wildlife activity, attic concerns, entry-point issues, and related home wildlife requests.`,

    disclaimer:
        "Disclaimer: This site is a free service to assist homeowners in connecting with local service providers. All contractors/providers are independent and this site does not warrant or guarantee any work performed. It is the responsibility of the homeowner to verify that the hired contractor furnishes the necessary license and insurance required for the work being performed. All persons depicted in a photo or video are actors or models and not contractors listed on this site.",

    aggregatorNotice:
        `${companyName} does not perform wildlife removal services directly. Provider availability, response times, pricing, qualifications, and service options may vary by location. Homeowners should verify licenses, insurance, experience, and any legal requirements before hiring a provider.`,

    navigation: [
        {
            label: "Home",
            href: "index.html"
        },
        {
            label: "Services",
            href: "services.html"
        },
        {
            label: "About",
            href: "about.html"
        },
        {
            label: "Contact",
            href: "contact.html"
        }
    ],

    legalLinks: [
        {
            label: "Privacy Policy",
            href: "privacy-policy.html"
        },
        {
            label: "Cookie Policy",
            href: "cookie-policy.html"
        },
        {
            label: "Terms of Service",
            href: "terms-of-service.html"
        }
    ],

    services: [
        {
            id: "attic-wildlife",
            title: "Attic Wildlife Activity",
            menuTitle: "Attic Activity",
            href: "attic-wildlife.html",
            icon: "home",
            image: "./assets/images/services/attic-wildlife.jpg",
            pageImage: "./assets/images/service-pages/attic-wildlife-hero.jpg",
            kicker: "Attic concerns",
            shortDescription:
                "Compare local provider options for scratching sounds, insulation disturbance, droppings, or possible animal activity in attic spaces.",
            description:
                "Attic wildlife activity can involve noises, visible signs, odor, insulation disruption, or suspected entry points. Nestwise helps homeowners start a structured request so independent local providers can review the situation and explain available options.",
            evaluationPoints: [
                "Ask how the provider evaluates attic access and visible signs.",
                "Confirm whether inspection, exclusion, cleanup, or repairs are separate services.",
                "Verify licensing, insurance, and wildlife handling requirements in your area.",
                "Compare provider availability, communication, and written estimates."
            ],
            factors: [
                "Location and provider availability",
                "Type of visible wildlife activity",
                "Access to attic or crawl areas",
                "Possible entry points",
                "Cleanup or prevention needs"
            ],
            faq: [
                {
                    question: "Does Nestwise inspect attics directly?",
                    answer:
                        "No. Nestwise is a matching platform and does not perform inspections or wildlife services directly. Homeowners can request matching with independent local providers."
                },
                {
                    question: "What should I describe in my request?",
                    answer:
                        "Mention noises, visible damage, droppings, odor, entry points, timing, and whether the activity appears to be inside the attic or near the exterior."
                },
                {
                    question: "Should I compare more than one provider?",
                    answer:
                        "Yes. Comparing multiple provider options can help homeowners understand availability, pricing, service scope, and qualification differences."
                }
            ]
        },

        {
            id: "raccoon-activity",
            title: "Raccoon Activity Requests",
            menuTitle: "Raccoon Activity",
            href: "raccoon-activity.html",
            icon: "paw-print",
            image: "./assets/images/services/raccoon-activity.jpg",
            pageImage: "./assets/images/service-pages/raccoon-activity-hero.jpg",
            kicker: "Exterior and attic signs",
            shortDescription:
                "Request matching with local providers for raccoon-related signs around roofs, attics, vents, decks, or exterior entry areas.",
            description:
                "Raccoon activity can be connected to roofline access, vents, soffits, decks, or attic spaces. Nestwise helps homeowners describe the concern clearly and compare independent providers who may serve their area.",
            evaluationPoints: [
                "Ask how the provider identifies entry points and activity patterns.",
                "Confirm whether service options follow local wildlife regulations.",
                "Request clarity on inspection fees, follow-up visits, and prevention work.",
                "Review whether estimates include repair or exclusion recommendations."
            ],
            factors: [
                "Roofline or vent access",
                "Visible entry damage",
                "Time of activity",
                "Local wildlife regulations",
                "Follow-up prevention options"
            ],
            faq: [
                {
                    question: "Can Nestwise guarantee a raccoon provider near me?",
                    answer:
                        "No. Provider availability may vary by location. Nestwise helps submit a matching request so available independent providers can be compared."
                },
                {
                    question: "What should I ask providers before choosing one?",
                    answer:
                        "Ask about licensing, insurance, local wildlife rules, inspection process, written estimates, and whether prevention or repairs are included."
                },
                {
                    question: "Are provider quotes usually free?",
                    answer:
                        "Some providers may offer free estimates, while others may charge for inspections or site visits. Homeowners should confirm this before booking."
                }
            ]
        },

        {
            id: "squirrel-entry",
            title: "Squirrel Entry Point Concerns",
            menuTitle: "Squirrel Entry",
            href: "squirrel-entry.html",
            icon: "trees",
            image: "./assets/images/services/squirrel-entry.jpg",
            pageImage: "./assets/images/service-pages/squirrel-entry-hero.jpg",
            kicker: "Entry-point matching",
            shortDescription:
                "Compare local provider options for suspected squirrel entry points, chewing signs, attic sounds, or roofline access concerns.",
            description:
                "Squirrel activity is often noticed through fast movement sounds, chewing marks, roofline access, or small openings near vents and soffits. Nestwise helps homeowners create a clearer request for independent providers to review.",
            evaluationPoints: [
                "Ask whether the provider checks roofline, vents, soffits, and nearby tree access.",
                "Confirm whether prevention and entry-point sealing are part of the estimate.",
                "Compare inspection approach, service timeline, and communication style.",
                "Verify that any wildlife-related work follows local rules."
            ],
            factors: [
                "Small exterior gaps",
                "Roof and tree access",
                "Chewing or nesting signs",
                "Attic accessibility",
                "Exclusion or prevention needs"
            ],
            faq: [
                {
                    question: "Does Nestwise seal entry points?",
                    answer:
                        "No. Nestwise does not perform direct services. Independent providers may offer inspection, exclusion, repair, or prevention services depending on location and qualifications."
                },
                {
                    question: "What details help providers understand the request?",
                    answer:
                        "Share where sounds are heard, when activity happens, visible gaps, roofline concerns, and any photos of exterior openings if safe to take."
                },
                {
                    question: "Why compare providers?",
                    answer:
                        "Different providers may offer different inspection methods, prevention options, pricing structures, and scheduling availability."
                }
            ]
        },

        {
            id: "bird-bat-concerns",
            title: "Bird & Bat Concern Matching",
            menuTitle: "Bird & Bat Concerns",
            href: "bird-bat-concerns.html",
            icon: "feather",
            image: "./assets/images/services/bird-bat-concerns.jpg",
            pageImage: "./assets/images/service-pages/bird-bat-concerns-hero.jpg",
            kicker: "Specialized requests",
            shortDescription:
                "Request matching for bird or bat concerns involving vents, rooflines, exterior openings, droppings, or seasonal activity.",
            description:
                "Bird and bat concerns may involve vents, eaves, chimneys, rooflines, droppings, odor, or seasonal restrictions. Nestwise helps homeowners connect with independent providers and compare options while keeping legal and safety considerations clear.",
            evaluationPoints: [
                "Ask whether the provider follows federal, state, and local wildlife requirements.",
                "Confirm whether timing restrictions may apply for birds or bats.",
                "Request a written explanation of inspection, exclusion, and cleanup options.",
                "Compare provider qualifications before choosing a service company."
            ],
            factors: [
                "Species-related restrictions",
                "Seasonal timing",
                "Vent or chimney access",
                "Droppings or odor concerns",
                "Cleanup and prevention scope"
            ],
            faq: [
                {
                    question: "Are bird and bat services regulated?",
                    answer:
                        "They can be. Rules may vary by species, season, and location. Homeowners should verify that any provider follows applicable requirements."
                },
                {
                    question: "Does Nestwise recommend one specific provider?",
                    answer:
                        "Nestwise helps homeowners request matching and compare independent provider options. The final hiring decision belongs to the homeowner."
                },
                {
                    question: "What should I verify before hiring?",
                    answer:
                        "Verify licenses, insurance, qualifications, written estimates, service scope, and whether the provider understands local wildlife regulations."
                }
            ]
        }
    ],

    homeFaq: [
        {
            question: "Is Nestwise a wildlife removal company?",
            answer:
                "No. Nestwise is an independent matching platform. It does not perform wildlife removal services directly and does not employ wildlife technicians."
        },
        {
            question: "How does the matching process work?",
            answer:
                "Homeowners submit a request with basic details about the wildlife concern. Nestwise helps connect the request with independent local providers when available."
        },
        {
            question: "Do I have to hire a provider after submitting a request?",
            answer:
                "No. Submitting a request does not require homeowners to hire a provider. You can review available options and decide what is right for your home."
        },
        {
            question: "Are quotes or inspections always free?",
            answer:
                "Not always. Some providers may offer free estimates, while others may charge for inspections, site visits, or detailed evaluations. Homeowners should confirm fees directly with providers."
        },
        {
            question: "What should I check before hiring a provider?",
            answer:
                "Homeowners should verify licenses, insurance, qualifications, service scope, written estimates, and any wildlife-related legal requirements in their area."
        }
    ],

    reviews: [
        {
            name: "Melissa R.",
            location: "North Carolina",
            text:
                "Nestwise made the request process feel organized. I could describe the attic noises clearly and compare provider options without calling around all afternoon."
        },
        {
            name: "Daniel K.",
            location: "Ohio",
            text:
                "The platform was useful because it explained what information providers usually need. I liked that it was clear Nestwise was not the service company itself."
        },
        {
            name: "Priya S.",
            location: "Georgia",
            text:
                "I wanted a calmer way to compare options for a wildlife concern near the roofline. The process felt simple, direct, and easy to understand."
        }
    ],

    requestForm: {
        title: "Request provider matching",
        subtitle:
            "Share a few details about the wildlife concern so local provider options can be reviewed when available.",
        privacyNote:
            "Your information is used to process your matching request. Provider availability may vary by location.",
        fields: {
            name: "Full name",
            email: "Email address",
            phone: "Phone number",
            zip: "ZIP code",
            service: "Type of concern",
            message: "Briefly describe the wildlife activity"
        },
        consentLabel:
            "I understand Nestwise is a matching platform and does not perform wildlife services directly."
    },

    mapCard: {
        title: "USA-wide matching perspective",
        text:
            "Nestwise is built for homeowners comparing independent wildlife provider options across U.S. service areas. Availability may vary by ZIP code, provider coverage, and request type.",
        pins: [
            "ZIP-based matching",
            "Independent providers",
            "Service-area availability",
            "Homeowner verification"
        ]
    },

    pageMeta: {
        "index.html": {
            title: `${companyName} | Wildlife Provider Matching Platform`,
            description:
                "Compare local wildlife provider options with Nestwise. Request matching for attic activity, raccoon concerns, squirrel entry points, bird and bat concerns, and related home wildlife requests."
        },
        "services.html": {
            title: `Services | ${companyName}`,
            description:
                "Explore wildlife provider matching categories from Nestwise, including attic wildlife activity, raccoon concerns, squirrel entry points, and bird or bat-related requests."
        },
        "about.html": {
            title: `About | ${companyName}`,
            description:
                "Learn how Nestwise helps homeowners compare independent local wildlife provider options without acting as a direct wildlife service company."
        },
        "contact.html": {
            title: `Contact | ${companyName}`,
            description:
                "Contact Nestwise to start a wildlife provider matching request and compare local provider options when available."
        },
        "attic-wildlife.html": {
            title: `Attic Wildlife Activity | ${companyName}`,
            description:
                "Request matching with independent providers for attic wildlife activity, scratching sounds, droppings, odor, insulation disturbance, and possible entry points."
        },
        "raccoon-activity.html": {
            title: `Raccoon Activity Requests | ${companyName}`,
            description:
                "Compare local provider options for raccoon-related signs near attics, rooflines, vents, decks, and exterior entry areas."
        },
        "squirrel-entry.html": {
            title: `Squirrel Entry Point Concerns | ${companyName}`,
            description:
                "Request provider matching for suspected squirrel entry points, attic sounds, roofline access, chewing signs, and prevention-related concerns."
        },
        "bird-bat-concerns.html": {
            title: `Bird & Bat Concern Matching | ${companyName}`,
            description:
                "Compare independent provider options for bird or bat concerns involving vents, rooflines, chimneys, droppings, odor, or seasonal wildlife activity."
        },
        "privacy-policy.html": {
            title: `Privacy Policy | ${companyName}`,
            description:
                "Read the Nestwise Privacy Policy for information about how matching request details and website data may be handled."
        },
        "cookie-policy.html": {
            title: `Cookie Policy | ${companyName}`,
            description:
                "Read the Nestwise Cookie Policy to understand how cookies and similar technologies may be used on this website."
        },
        "terms-of-service.html": {
            title: `Terms of Service | ${companyName}`,
            description:
                "Review the Nestwise Terms of Service for use of the wildlife provider matching platform."
        }
    },

    policyConsent: {
        storageKey: "nestwise_policy_consent_v1",
        title: "Privacy & matching notice",
        text:
            "Nestwise uses basic website technologies to support the browsing experience and request flow. Please review our policies before continuing.",
        acceptLabel: "Accept",
        declineLabel: "Decline",
        links: [
            {
                label: "Privacy",
                href: "privacy-policy.html"
            },
            {
                label: "Cookies",
                href: "cookie-policy.html"
            },
            {
                label: "Terms",
                href: "terms-of-service.html"
            }
        ]
    },

    socialProof: {
        eyebrow: "Matching-first platform",
        title: "Designed for homeowners who want clarity before choosing a provider.",
        items: [
            "Aggregator-safe request flow",
            "No direct-service claims",
            "Independent provider comparison",
            "Homeowner verification reminders"
        ]
    },

    safeContentRules: {
        avoid: [
            "we remove animals",
            "our technicians",
            "licensed and insured team",
            "emergency removal by us",
            "guaranteed removal",
            "years of experience",
            "projects completed"
        ],
        use: [
            "compare local provider options",
            "connect with independent providers",
            "request matching",
            "provider availability may vary",
            "homeowners should verify licenses, insurance, and qualifications",
            "Nestwise does not perform wildlife removal services directly"
        ]
    }
};