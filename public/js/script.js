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

document.addEventListener("DOMContentLoaded", () => {
    const questions = document.querySelectorAll(".faq-bubble.question");

    questions.forEach((question, index) => {
        question.addEventListener("click", () => {
            const answer = document.querySelectorAll(".faq-bubble.answer")[index];
            answer.classList.toggle("active");
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll(".star-rating .star");
    const ratingInput = document.getElementById("rating");

    stars.forEach((star, index) => {
        // Beim Klicken auf einen Stern
        star.addEventListener("click", () => {
            const value = index + 1; // Wert ist der Index + 1, da Index bei 0 beginnt
            ratingInput.value = value;

            // Entferne alle ausgewählten Klassen und füge sie dann bis zum geklickten Stern hinzu
            stars.forEach(s => s.classList.remove("selected"));
            for (let i = 0; i <= index; i++) {
                stars[i].classList.add("selected");
            }
        });

        // Beim Hover über einen Stern
        star.addEventListener("mouseover", () => {
            // Entferne alle Hover-Klassen und füge sie dann bis zum aktuellen Stern hinzu
            stars.forEach(s => s.classList.remove("hover"));
            for (let i = 0; i <= index; i++) {
                stars[i].classList.add("hover");
            }
        });

        // Beim Verlassen des Sternbereichs werden alle Hover-Klassen entfernt
        star.addEventListener("mouseout", () => {
            stars.forEach(s => s.classList.remove("hover"));
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const reviewForm = document.querySelector(".review-form");
    const submitButton = reviewForm.querySelector("button[type='submit']");
    const reviewsSection = document.querySelector(".reviews-section");
    const stars = document.querySelectorAll(".star-rating .star");
    const ratingInput = document.getElementById("rating");

    // Sterne-Bewertung interaktiv machen
    stars.forEach(star => {
        star.addEventListener("click", () => {
            const rating = star.getAttribute("data-value");
            ratingInput.value = rating;

            // Sterne visuell hervorheben
            stars.forEach(s => {
                if (s.getAttribute("data-value") <= rating) {
                    s.classList.add("filled-star");
                    s.classList.remove("empty-star");
                } else {
                    s.classList.remove("filled-star");
                    s.classList.add("empty-star");
                }
            });
        });
    });

    // AJAX-Formular absenden
    reviewForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Standardverhalten verhindern

        // Button deaktivieren, um mehrfaches Klicken zu verhindern
        submitButton.disabled = true;
        submitButton.textContent = "Senden...";

        const formData = new FormData(reviewForm);

        fetch("/reviews", {
            method: "POST",
            body: new URLSearchParams(formData),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Fehler beim Speichern der Rezension");
            }
            return response.json();
        })
        .then(newReview => {
            // Neue Rezension im DOM hinzufügen
            const reviewHTML = `
                <div class="review">
                    <h3 class="review-title">${newReview.title}</h3>
                    <label for="product">Produkt: ${newReview.product}</label>
                    <p class="review-author">Verfasst von: ${newReview.author}</p>
                    <p class="review-text">${newReview.text}</p>
                    <p class="review-rating">
                        Bewertung:
                        <span class="stars">
                            ${Array(5).fill().map((_, i) => `
                                <span class="${i < newReview.rating ? 'filled-star' : 'empty-star'}">★</span>
                            `).join('')}
                        </span>
                        (${newReview.rating} / 5)
                    </p>
                </div>
                <hr class="review-divider">
            `;
            reviewsSection.insertAdjacentHTML("beforeend", reviewHTML);

            // Erfolgsfeedback anzeigen
            alert("Rezension erfolgreich gespeichert!");

            // Formular zurücksetzen und Button wieder aktivieren
            reviewForm.reset();
            stars.forEach(s => s.classList.remove("filled-star", "empty-star"));
            submitButton.disabled = false;
            submitButton.textContent = "Rezension absenden";
        })
        .catch(error => {
            console.error("Fehler beim Hinzufügen der Rezension:", error);
            alert("Fehler beim Speichern der Rezension. Bitte versuchen Sie es erneut.");
            submitButton.disabled = false;
            submitButton.textContent = "Rezension absenden";
        });
    });
});


// public/js/script.js
document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star-rating .star');
    const ratingInput = document.getElementById('rating');

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = star.getAttribute('data-value');
            ratingInput.value = rating;

            // Aktualisieren der Sternanzeige
            stars.forEach(s => {
                if (s.getAttribute('data-value') <= rating) {
                    s.classList.add('filled-star');
                    s.classList.remove('empty-star');
                } else {
                    s.classList.remove('filled-star');
                    s.classList.add('empty-star');
                }
            });
        });
    });

    // Optional: Initiales Laden der Sterne basierend auf dem versteckten Input (für Bearbeitungsformular)
    const initialRating = ratingInput.value;
    if (initialRating) {
        stars.forEach(s => {
            if (s.getAttribute('data-value') <= initialRating) {
                s.classList.add('filled-star');
                s.classList.remove('empty-star');
            } else {
                s.classList.remove('filled-star');
                s.classList.add('empty-star');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const filterMenu = document.getElementById('filter-menu');
    const filterTab = document.getElementById('filter-tab');
    const closeFilterButton = document.getElementById('close-filter');

    // Öffnen des Filtermenüs durch Klicken auf den Tab
    filterTab.addEventListener('click', () => {
        filterMenu.classList.add('open');
    });

    // Schließen des Filtermenüs
    closeFilterButton.addEventListener('click', () => {
        filterMenu.classList.remove('open');
    });

    // Schließen des Filtermenüs bei Klick außerhalb
    document.addEventListener('click', (event) => {
        if (!filterMenu.contains(event.target) && !filterTab.contains(event.target)) {
            filterMenu.classList.remove('open');
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const averageStarsElement = document.getElementById("average-stars");
    const averageRatingTextElement = document.getElementById("average-rating-text");

    fetch('/api/sleepwell-rating')
        .then(response => response.json())
        .then(data => {
            const { averageRating, totalReviews } = data;

            // Sterne-Visualisierung
            const stars = Array(5).fill("★").map((star, index) => 
                index < Math.round(averageRating) ? `<span style="color: #FFD700;">★</span>` : `<span style="color: #ddd;">★</span>`
            ).join('');
            averageStarsElement.innerHTML = stars;

            // Bewertungstext anzeigen
            averageRatingTextElement.textContent = `Durchschnitt: ${averageRating}/5 (${totalReviews} Bewertungen)`;
        })
        .catch(err => {
            console.error("Fehler beim Abrufen der Bewertung:", err);
            averageRatingTextElement.textContent = "Fehler beim Laden der Bewertung.";
        });
});

document.addEventListener("DOMContentLoaded", () => {
    const wakewellStarsElement = document.getElementById("wakewell-stars");
    const wakewellRatingTextElement = document.getElementById("wakewell-rating-text");

    fetch('/api/wakewell-rating')
        .then(response => response.json())
        .then(data => {
            const { averageRating, totalReviews } = data;

            // Sterne-Visualisierung
            const stars = Array(5).fill("★").map((star, index) => 
                index < Math.round(averageRating) ? `<span style="color: #FFD700;">★</span>` : `<span style="color: #ddd;">★</span>`
            ).join('');
            wakewellStarsElement.innerHTML = stars;

            // Bewertungstext anzeigen
            wakewellRatingTextElement.textContent = `Durchschnitt: ${averageRating}/5 (${totalReviews} Bewertungen)`;
        })
        .catch(err => {
            console.error("Fehler beim Abrufen der Bewertung:", err);
            wakewellRatingTextElement.textContent = "Fehler beim Laden der Bewertung.";
        });
});
/*

document.addEventListener("DOMContentLoaded", () => {
    const toggleDarkMode = document.getElementById("dark-mode-toggle");

    // Funktion zum Anwenden des Modus
    const applyMode = (mode) => {
        document.documentElement.classList.toggle("dark-mode", mode === "dark");
    };

    // Browser-Präferenz erkennen
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    // Benutzerpräferenz aus localStorage
    const userPreference = localStorage.getItem("theme");

    // Wenn der Benutzer eine Präferenz gespeichert hat, verwenden wir diese
    if (userPreference) {
        applyMode(userPreference);
    } else {
        // Andernfalls verwenden wir die Browser-Präferenz
        applyMode(prefersDarkScheme.matches ? "dark" : "light");
    }

    // Event-Listener für Umschalt-Button
    toggleDarkMode.addEventListener("click", () => {
        const currentMode = document.documentElement.classList.contains("dark-mode") ? "dark" : "light";
        const newMode = currentMode === "dark" ? "light" : "dark";

        applyMode(newMode);
        localStorage.setItem("theme", newMode); // Speichern der Benutzerpräferenz
    });

    // Event-Listener für Änderungen der Browser-Präferenz
    prefersDarkScheme.addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
            applyMode(e.matches ? "dark" : "light");
        }
    });
});
*/

document.addEventListener("DOMContentLoaded", () => {
    const newsletterForm = document.getElementById("newsletter-form");
    const messageElement = document.getElementById("newsletter-message");

    newsletterForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(newsletterForm);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch("/newsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                messageElement.textContent = "Vielen Dank für Ihre Anmeldung!";
                messageElement.style.color = "green";
                newsletterForm.reset();
            } else {
                const error = await response.json();
                messageElement.textContent = error.error || "Fehler bei der Anmeldung.";
                messageElement.style.color = "red";
            }
        } catch (err) {
            console.error("Fehler beim Senden des Formulars:", err);
            messageElement.textContent = "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.";
            messageElement.style.color = "red";
        }
    });
});
