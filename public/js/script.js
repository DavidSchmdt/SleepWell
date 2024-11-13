// Unveränderte Position des Buttons speichern
let originalPosition = { x: 0, y: 0 };

document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector('.buy-button');
    if (button) {
        originalPosition.x = button.offsetLeft;
        originalPosition.y = button.offsetTop;
    }
});

// Funktion zum Bewegen des Buttons
function moveButton(event) {
    const button = event.target; // Zugriff auf den spezifischen Button, der geklickt wurde
    button.innerText = "Drück mich nicht!";
    const randomOffsetX = Math.floor(Math.random() * 300) - 150;
    const randomOffsetY = Math.floor(Math.random() * 300) - 150;
    button.style.transform = `translate(${randomOffsetX}px, ${randomOffsetY}px)`;
    setTimeout(() => {
        button.style.transform = "translate(0, 0)";
        
        // Button-Text je nach Button ID setzen
        button.innerText = button.id === "buyButton" ? "Jetzt SleepWell™ kaufen" : "Jetzt WakeWell™ vorbestellen";
    }, 3000);
}



// Bilder für beide Seiten definieren
const wakewellImages = [
    "../images/WakeWell/WakewellClean1.png",
    "../images/WakeWell/WakewellClean2.png",
    "../images/WakeWell/WakewellClean3.png",
    "../images/WakeWell/WakewellClean4.png"
];

const sleepwellImages = [
    "../images/SleepWell/SleepwellClean1.png",
    "../images/SleepWell/SleepwellClean2.png",
    "../images/SleepWell/SleepwellClean3.png",
    "../images/SleepWell/SleepwellClean4.png",
    "../images/SleepWell/SleepwellClean5.png"
];

// Funktion zur Initialisierung des Karussells
function initializeCarousel(carouselElement, images) {
    let currentIndex = 0;
    const imageElement = carouselElement.querySelector('img');
    const buttons = carouselElement.querySelectorAll('.carousel-controls button');
    const indicatorsContainer = carouselElement.querySelector('.carousel-indicators');

    // Bilder setzen und nur einmal Dots hinzufügen
    imageElement.src = images[currentIndex];
    indicatorsContainer.innerHTML = '';  // Alle bisherigen Dots entfernen

    images.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel(imageElement, images, indicatorsContainer, currentIndex);
        });
        indicatorsContainer.appendChild(dot);
    });

    // Buttons für Bildnavigation
    buttons[0].addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel(imageElement, images, indicatorsContainer, currentIndex);
    });

    buttons[1].addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel(imageElement, images, indicatorsContainer, currentIndex);
    });
}

// Funktion zur Aktualisierung des Karussells und der Dots
function updateCarousel(imageElement, images, indicatorsContainer, currentIndex) {
    imageElement.src = images[currentIndex];
    const dots = indicatorsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

// Karussell für die richtige Produktseite initialisieren
document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.product-overview-img .carousel');
    if (carousel) {
        const isWakeWell = document.querySelector('.product-title').textContent.includes('WakeWell');
        const images = isWakeWell ? wakewellImages : sleepwellImages;
        initializeCarousel(carousel, images);
    }
});

// Funktion zur Berechnung und Anzeige des Gesamtpreises
function updateTotalPrice() {
    const basePrice = parseFloat(document.getElementById("base-price").textContent.replace(/\s/g, '').replace(',', '.'));
    const totalPriceElement = document.getElementById("total-price");
    const monthlyInstallmentElement = document.getElementById("monthly-installment");
    const months = 24;

    let totalPrice = basePrice;

    document.querySelectorAll('input[name="add-ons"]:checked').forEach(checkbox => {
        totalPrice += parseFloat(checkbox.value);
    });

    totalPriceElement.textContent = totalPrice.toFixed(2).replace('.', ',') + ' €';

    const monthlyInstallment = (totalPrice / months) * 1.2;
    monthlyInstallmentElement.textContent = monthlyInstallment.toFixed(2).replace('.', ',');
}

// Event Listener für Preisaktualisierung bei Änderungen der Zusatzoptionen
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('input[name="add-ons"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateTotalPrice);
    });
});
