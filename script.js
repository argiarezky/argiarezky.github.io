const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
    nav.classList.toggle("show");

    menuToggle.textContent = nav.classList.contains("show")
        ? "✕"
        : "☰";
});

document.querySelectorAll("#nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("show");
        menuToggle.textContent = "☰";
    });
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("#nav a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});
