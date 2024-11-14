const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure Express to use EJS and express-ejs-layouts
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Willkommen bei SleepWell™' });
});

app.get('/product', (req, res) => {
    res.render('product', { title: 'SleepWell™ Bett - Dein Schlüssel zu erholsamem Schlaf' });
});

// Route for SleepWell™ purchase page
app.get('/buy-sleepwell', (req, res) => {
    res.render('buy-sleepwell', { title: 'SleepWell™ kaufen' });
});

// Route for WakeWell™ purchase page
app.get('/buy-wakewell', (req, res) => {
    res.render('buy-wakewell', { title: 'WakeWell™ kaufen' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'Über Uns - SleepWell™' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Kontakt - SleepWell™' });
});

app.get('/returns', (req, res) => {
    res.render('returns', { title: 'Kontakt - SleepWell™' });
});

app.get('/terms', (req, res) => {
    res.render('terms', { title: 'Kontakt - SleepWell™' });
});

app.get('/shipping', (req, res) => {
    res.render('shipping', { title: 'Kontakt - SleepWell™' });
});

app.get('/privacy', (req, res) => {
    res.render('privacy', { title: 'Kontakt - SleepWell™' });
});

app.get('/imprint', (req, res) => {
    res.render('imprint', { title: 'Kontakt - SleepWell™' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});


app.get('/faq', (req, res) => {
    const faqs = [
        { question: "Wie kann ich mein Passwort ändern?", answer: "Gehen Sie zu den Einstellungen und klicken Sie auf Passwort ändern." },
        { question: "Was ist die Rückgaberichtlinie?", answer: "Sie können Produkte innerhalb von 30 Tagen zurückgeben." },
        { question: "Wie kann ich meinen Account löschen?", answer: "Kontaktieren Sie unseren Kundenservice für Unterstützung bei der Löschung." }
    ];
    
    // Übergibt `faqs` und `title` an die Template-Engine
    res.render('faq', { 
        faqs: faqs,
        title: 'FAQ - Häufige Fragen' // Titel für die Seite festlegen
    });
});

// Beispiel-Daten für Rezensionen
let reviews = [
    { title: "Fantastisches Produkt!", author: "Lisa M.", text: "Ich schlafe viel besser seit ich SleepWell nutze.", rating: 5 },
    { title: "Zufrieden", author: "Tom H.", text: "Guter Service und gute Produkte.", rating: 4 }
];

// Route zum Anzeigen der Rezensionen
app.get('/reviews', (req, res) => {
    res.render('reviews', { 
        title: 'Rezensionen - SleepWell™', 
        reviews: reviews 
    });
});

// Route zum Hinzufügen einer neuen Rezension
app.post('/reviews', (req, res) => {
    const newReview = {
        title: req.body.title,
        author: req.body.author,
        text: req.body.text,
        rating: req.body.rating
    };
    reviews.push(newReview);
    res.redirect('/reviews');
});
