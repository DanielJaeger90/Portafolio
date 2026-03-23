/* =====================================================
   UTILIDADES
===================================================== */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


/* =====================================================
   MENÚ RESPONSIVE
===================================================== */

const menuBtn = $("#menu-btn");
const nav = $("#nav");

if (menuBtn && nav) {

menuBtn.addEventListener("click", () => {

nav.classList.toggle("nav-open");
menuBtn.classList.toggle("open");

});

}


/* =====================================================
   SCROLL SUAVE
===================================================== */

$$('a[href^="#"]').forEach(link => {

link.addEventListener("click", (e) => {

const target = $(link.getAttribute("href"));

if (!target) return;

e.preventDefault();

window.scrollTo({
top: target.offsetTop - 70,
behavior: "smooth"
});

if (nav) nav.classList.remove("nav-open");
if (menuBtn) menuBtn.classList.remove("open");

});

});


/* =====================================================
   ANIMACIÓN FADE IN
===================================================== */

const fadeElements = $$(".fade-in");

if (fadeElements.length > 0) {

const observer = new IntersectionObserver((entries) => {

entries.forEach(entry => {

if (!entry.isIntersecting) return;

entry.target.classList.add("visible");

observer.unobserve(entry.target);

/* GLITCH HERO */

if (entry.target.classList.contains("hero")) {

const title = entry.target.querySelector("h1");

if (title) {

title.classList.add("glitch-effect");

setTimeout(() => {

title.classList.remove("glitch-effect");

}, 1200);

}

}

});

}, { threshold: 0.2 });

fadeElements.forEach(el => observer.observe(el));

}


/* =====================================================
   EFECTO 3D EN TARJETAS DE PROYECTOS
===================================================== */

const cards = $$(".project");

cards.forEach(card => {

card.addEventListener("mousemove", (e) => {

const rect = card.getBoundingClientRect();

const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

const centerX = rect.width / 2;
const centerY = rect.height / 2;

const rotateX = (y - centerY) / 20;
const rotateY = (centerX - x) / 20;

card.style.transform =
`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;

});

card.addEventListener("mouseleave", () => {

card.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";

});

});


/* =====================================================
   PARTICULAS DE FONDO
===================================================== */

const createParticles = () => {

const particleContainer = document.createElement("div");

particleContainer.id = "particles-js";

document.body.appendChild(particleContainer);

const particleCount = window.innerWidth < 700 ? 30 : 60;

for (let i = 0; i < particleCount; i++) {

const particle = document.createElement("div");

particle.classList.add("particle");

const size = Math.random() * 6 + 2;

particle.style.width = `${size}px`;
particle.style.height = `${size}px`;

particle.style.top = `${Math.random() * window.innerHeight}px`;
particle.style.left = `${Math.random() * window.innerWidth}px`;

particle.style.animationDuration = `${Math.random() * 12 + 6}s`;

particleContainer.appendChild(particle);

}

};

createParticles();


/* =====================================================
   REPOSICIONAR PARTICULAS EN RESIZE
===================================================== */

let resizeTimeout;

window.addEventListener("resize", () => {

clearTimeout(resizeTimeout);

resizeTimeout = setTimeout(() => {

const particles = $$(".particle");

particles.forEach(p => {

p.style.top = `${Math.random() * window.innerHeight}px`;
p.style.left = `${Math.random() * window.innerWidth}px`;

});

}, 200);

});


/* =====================================================
   BARRA DE PROGRESO DE SCROLL
===================================================== */

const progressBar = document.createElement("div");

progressBar.id = "scroll-progress";

document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {

const scrollTop = document.documentElement.scrollTop;

const height =
document.documentElement.scrollHeight -
document.documentElement.clientHeight;

const progress = (scrollTop / height) * 100;

progressBar.style.width = progress + "%";

});


/* =====================================================
   GLITCH EFFECT CSS
===================================================== */

const glitchStyle = document.createElement("style");

glitchStyle.innerHTML = `

.glitch-effect {
position: relative;
animation: glitch 1s linear infinite;
}

@keyframes glitch {

0% {
text-shadow:
2px 0 var(--accent),
-2px 0 var(--secondary);
}

20% {
text-shadow:
-2px 0 var(--accent),
2px 0 var(--secondary);
}

40% {
text-shadow:
2px 0 var(--accent),
-2px 0 var(--secondary);
}

60% {
text-shadow:
-2px 0 var(--accent),
2px 0 var(--secondary);
}

80% {
text-shadow:
2px 0 var(--accent),
-2px 0 var(--secondary);
}

100% {
text-shadow: 0 0 var(--accent);
}

}

#scroll-progress {

position: fixed;
top: 0;
left: 0;

height: 4px;
width: 0%;

background: var(--accent);

z-index: 999;

}

`;

document.head.appendChild(glitchStyle);