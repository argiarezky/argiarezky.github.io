
const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav a");

menuButton.addEventListener("click", () => {
    const opened = nav.classList.toggle("show");

    menuButton.setAttribute("aria-expanded", opened);
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("show");
        menuButton.setAttribute("aria-expanded", "false");
    });
});

// Active navigation
const sections = document.querySelectorAll("main section[id]");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        navLinks.forEach(link => {
            const active =
                link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", active);
        });
    });
}, {
    threshold: 0,
    rootMargin: "-25% 0px -65% 0px"
});

sections.forEach(section => observer.observe(section));
