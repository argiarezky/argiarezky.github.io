
/*
 * PORTFOLIO CONFIGURATION
 * Edit bagian ini untuk menyesuaikan portfolio.
 */

const CONFIG = {
    name: "Argia Rezky Pratama",

    // Kosongkan jika belum memiliki foto.
    // Contoh: "assets/profile.jpg"
    profilePhoto: "",

    social: {
        // Nomor WhatsApp hanya angka, tanpa + atau spasi.
        whatsapp: "",

        // Masukkan URL profil pribadi masing-masing.
        facebook: "",
        github: "https://github.com/ArgiaX",
        instagram: ""
    },

    projects: {
        helpdesk: {
            demo: "",
            source: ""
        },

        warehouse: {
            demo: "",
            source: ""
        },

        students: {
            demo: "",
            source: ""
        },

        design: {
            demo: "",
            source: ""
        }
    }
};


/* HELPERS */

function normalizeUrl(value) {
    if (typeof value !== "string") return "";

    const url = value.trim();
    if (!url) return "";

    try {
        const parsed = new URL(url);

        if (parsed.protocol !== "https:" &&
            parsed.protocol !== "http:") {
            return "";
        }

        return parsed.href;
    } catch {
        return "";
    }
}

function setExternalLink(element, url) {
    const safeUrl = normalizeUrl(url);

    if (safeUrl) {
        element.href = safeUrl;
        element.target = "_blank";
        element.rel = "noopener noreferrer";
        element.classList.remove("is-disabled");
        element.removeAttribute("aria-disabled");
        element.removeAttribute("tabindex");
        return true;
    }

    // Tidak membuat link palsu jika URL belum tersedia.
    element.removeAttribute("href");
    element.removeAttribute("target");
    element.removeAttribute("rel");
    element.classList.add("is-disabled");
    element.setAttribute("aria-disabled", "true");
    element.setAttribute("tabindex", "-1");

    return false;
}


/* PROFILE PHOTO */

const profilePhoto = document.getElementById("profile-photo");
const profileFallback = document.getElementById("profile-fallback");

if (profilePhoto && profileFallback && CONFIG.profilePhoto.trim()) {
    profilePhoto.addEventListener("load", () => {
        profilePhoto.hidden = false;
        profileFallback.hidden = true;
    });

    profilePhoto.addEventListener("error", () => {
        profilePhoto.hidden = true;
        profileFallback.hidden = false;
    });

    profilePhoto.src = CONFIG.profilePhoto.trim();
}


/* SOCIAL LINKS */

const socialLinks = document.querySelectorAll("[data-social]");
let configuredSocialCount = 0;

socialLinks.forEach((link) => {
    const platform = link.dataset.social;
    let url = CONFIG.social[platform] || "";

    if (platform === "whatsapp" && url.trim()) {
        // Terima nomor berupa angka saja.
        const phone = url.replace(/\D/g, "");

        // Pastikan nomor sudah menggunakan kode negara.
        url = /^62\d{8,15}$/.test(phone)
            ? `https://wa.me/${phone}`
            : "";
    }

    const configured = setExternalLink(link, url);

    if (configured) {
        configuredSocialCount++;
    }

    // Tooltip dan label platform.
    const label = document.createElement("span");
    label.className = "social-name";
    label.textContent =
        link.getAttribute("aria-label") || platform;

    label.setAttribute("aria-hidden", "true");
    link.appendChild(label);

    link.addEventListener("click", (event) => {
        if (link.classList.contains("is-disabled")) {
            event.preventDefault();

            const note = document.getElementById("contact-note");
            if (note) {
                note.textContent =
                    `Link ${label.textContent} belum diatur. ` +
                    "Tambahkan URL akun di konfigurasi script.js.";
            }
        }
    });
});


/* PROJECT LINKS */

const projectLinks = document.querySelectorAll("[data-project]");
let configuredProjectCount = 0;

projectLinks.forEach((link) => {
    const projectId = link.dataset.project;
    const kind = link.dataset.kind;

    const project = CONFIG.projects[projectId];
    const url = project ? project[kind] : "";

    const configured = setExternalLink(link, url);

    if (configured) {
        configuredProjectCount++;
    }

    link.addEventListener("click", (event) => {
        if (link.classList.contains("is-disabled")) {
            event.preventDefault();

            const note = document.querySelector(".project-note");
            if (note) {
                note.textContent =
                    `Link ${link.textContent.trim()} untuk proyek ` +
                    `${projectId} belum diatur di script.js.`;
            }
        }
    });
});


/* MOBILE NAVIGATION */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");

function closeMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu navigasi");
    document.body.classList.remove("menu-open");
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        if (isOpen) {
            closeMenu();
        } else {
            navLinks.classList.add("is-open");
            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute("aria-label", "Tutup menu navigasi");
            document.body.classList.add("menu-open");
        }
    });

    navItems.forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
            menuToggle.focus();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 520) {
            closeMenu();
        }
    });
}


/* ACTIVE NAVIGATION */

if ("IntersectionObserver" in window) {
    const sections = document.querySelectorAll(
        "#home, #about, #projects, #contact"
    );

    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort(
                    (a, b) =>
                        b.intersectionRatio - a.intersectionRatio
                );

            if (!visible.length) return;

            const currentId = visible[0].target.id;

            navItems.forEach((link) => {
                const isActive =
                    link.getAttribute("href") === `#${currentId}`;

                link.classList.toggle("active", isActive);

                if (isActive) {
                    link.setAttribute("aria-current", "location");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        },
        {
            rootMargin: "-15% 0px -65% 0px",
            threshold: [0, 0.1, 0.25, 0.5]
        }
    );

    sections.forEach((section) => observer.observe(section));
}


/* FOOTER YEAR */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}
