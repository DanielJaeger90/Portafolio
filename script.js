/* =====================================================
   MENÚ RESPONSIVE
===================================================== */
const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("nav-open");
    menuBtn.classList.toggle("open");
});

/* =====================================================
   SCROLL SUAVE UNIVERSAL
===================================================== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;

        e.preventDefault();

        window.scrollTo({
            top: target.offsetTop - 60,
            behavior: "smooth"
        });

        // Cierra el menú al hacer clic en móvil
        nav.classList.remove("nav-open");
        menuBtn.classList.remove("open");
    });
});

/* =====================================================
   ANIMACIONES FADE-IN
===================================================== */
const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            // efecto glitch para el H1 del hero
            if (entry.target.classList.contains("hero")) {
                const title = entry.target.querySelector("h1");
                if (title) {
                    title.classList.add("glitch-effect");
                    setTimeout(() => title.classList.remove("glitch-effect"), 1200);
                }
            }
        }
    });
}, { threshold: 0.2 });

fadeElements.forEach(el => observer.observe(el));

/* =====================================================
   PARTICLES BACKGROUND
===================================================== */
const particleCount = 60; // más partículas
const particleContainer = document.createElement('div');
particleContainer.id = 'particles-js';
document.body.appendChild(particleContainer);

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 8 + 4; // tamaño entre 4px y 12px
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.top = `${Math.random() * window.innerHeight}px`;
    particle.style.left = `${Math.random() * window.innerWidth}px`;
    particle.style.animationDuration = `${Math.random() * 10 + 5}s`; // duración 5-15s
    particle.style.opacity = Math.random() * 0.5 + 0.5; // opacidad aleatoria
    particleContainer.appendChild(particle);
}

/* =====================================================
   REDIMENSIONAMIENTO PARTICULAS
===================================================== */
window.addEventListener('resize', () => {
    document.querySelectorAll('.particle').forEach(p => {
        p.style.top = `${Math.random() * window.innerHeight}px`;
        p.style.left = `${Math.random() * window.innerWidth}px`;
    });
});

/* =====================================================
   Efecto Glitch CSS para Hero H1
===================================================== */
const style = document.createElement('style');
style.innerHTML = `
.glitch-effect {
    position: relative;
    color: var(--accent);
    animation: glitch 1s infinite;
}

@keyframes glitch {
    0% { text-shadow: 2px 0 var(--accent), -2px 0 var(--secondary); }
    20% { text-shadow: -2px 0 var(--accent), 2px 0 var(--secondary); }
    40% { text-shadow: 2px 0 var(--accent), -2px 0 var(--secondary); }
    60% { text-shadow: -2px 0 var(--accent), 2px 0 var(--secondary); }
    80% { text-shadow: 2px 0 var(--accent), -2px 0 var(--secondary); }
    100% { text-shadow: 0 0 var(--accent); }
}
`;
document.head.appendChild(style);
