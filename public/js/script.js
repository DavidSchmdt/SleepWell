
 // Navbar background change on scroll
 window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll animations
const scrollElements = document.querySelectorAll('.content-section');
const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};
const displayScrollElement = (element) => {
    element.classList.add('visible');
    element.style.transform = "translateY(0)";
    element.style.opacity = "1";
};
const hideScrollElement = (element) => {
    element.style.transform = "translateY(100px)";
    element.style.opacity = "0";
};
const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        } else {
            hideScrollElement(el);
        }
    });
};
window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Initial hide for scroll elements
scrollElements.forEach((el) => {
    hideScrollElement(el);
});

let originalPosition = { x: 0, y: 0 };

document.addEventListener("DOMContentLoaded", function() {
    // Speichere die ursprüngliche Position des Buttons, wenn das Dokument geladen wurde
    const button = document.getElementById('buyButton');
    originalPosition.x = button.offsetLeft;
    originalPosition.y = button.offsetTop;
});

function moveButton() {
    // Button bewegt sich und ändert den Text für eine gewisse Zeit
    const button = document.getElementById('buyButton');
    button.innerText = "Drück mich nicht!";
    const randomOffsetX = Math.floor(Math.random() * 300) - 150;
    const randomOffsetY = Math.floor(Math.random() * 300) - 150;
    button.style.transform = `translate(${randomOffsetX}px, ${randomOffsetY}px)`;
    setTimeout(() => {
        // Button kehrt nach 3 Sekunden zurück zur Originalposition und ändert den Text zurück
        button.style.transform = "translate(0, 0)";
        button.innerText = "Jetzt SleepWell™ kaufen";
    }, 3000);
}