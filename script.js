const menuBtn = document.getElementById("menuBtn");
const navigation = document.getElementById("navigation");
const navLinks = document.querySelectorAll(".nav-link");

// Mobile menu
menuBtn.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("show");

    menuBtn.setAttribute("aria-expanded", isOpen);
});

// Close menu after navigation
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navigation.classList.remove("show");
        menuBtn.setAttribute("aria-expanded", "false");
    });
});

// Active navigation
const sections = document.querySelectorAll("main section[id]");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${entry.target.id}`
                );
            });
        }
    });
}, {
    rootMargin: "-30% 0px -60% 0px"
});

sections.forEach(section => observer.observe(section));
