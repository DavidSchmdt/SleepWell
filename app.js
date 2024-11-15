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

// Verwende die Middleware für URL-kodierte und JSON-Daten
const bodyParser = require('body-parser');

// Middleware zum Parsen von JSON und URL-kodierten Daten
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


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

// Route zum Empfangen der Formulardaten
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Prüfen, ob die Felder vorhanden sind
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Alle Felder sind erforderlich' });
    }

    const data = `Name: ${name}, E-Mail: ${email}, Nachricht: ${message}\n`;
    fs.appendFileSync('messages.txt', data, (err) => {
        if (err) {
            console.error('Fehler beim Speichern der Nachricht:', err);
            return res.status(500).json({ message: 'Fehler beim Speichern' });
        }
    });

    res.json({ message: 'Nachricht erfolgreich gespeichert' });
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
        { question: "Wie schafft es der WakeWell, dass mein Kaffee jeden Morgen die perfekte Temperatur hat?", 
            answer: "In deinem SleepWell™ werden über 200 Körperparameter, wie die Körpertemperatur gemessen. Diese Parameter werden mit DreamSync™ an deine WakeWell™ geschickt, welcher die richtige Temperatur für dich einschätzt." },
        
        { question: "Warum ist SleepWell™ so gut?", 
            answer: "Wir haben mit viel Arbeit SleepWell™ mit seinen genzen Features entwickelt. SleepWell™ schafft es mit seinen Smart-Features, dass das Bett sich dir anpasst, nicht andersrum." },
        
        { question: "Warum empfehlen 9/10 Zahnärzte SleepWell?", 
            answer: "Zahnärzte brauchen guten Schlaf, um Tag täglich ihre Arbeit zu verrichten. In unseren Studien, durchgeführt von Prof. Dr. Noah Lober, hat sich herausgestellt, dass ganze 9/10 Ärzten lieber in SleepWell™ schlafen, als auf dem Boden." }
    ];
    
    // Übergibt `faqs` und `title` an die Template-Engine
    res.render('faq', { 
        faqs: faqs,
        title: 'FAQ - Häufige Fragen' // Titel für die Seite festlegen
    });
});

// Beispiel-Daten für Rezensionen mit Produktbezug
let reviews = [
    { 
        title: "Fantastisches Produkt!", 
        author: "Lisa M.", 
        text: "Ich schlafe viel besser seit ich SleepWell™ nutze.", 
        rating: 5,
        product: "SleepWell™"
    },
    { 
        title: "Zufrieden", 
        author: "Tom H.", 
        text: "Guter Service und gute Produkte.", 
        rating: 5,
        product: "WakeWell™"
    }
];

// Route zum Anzeigen der Rezensionen
app.get('/reviews', (req, res) => {
    const product = req.query.product || "SleepWell™"; // Standardprodukt setzen, falls keins ausgewählt wurde

    // Filtert Rezensionen nach dem ausgewählten Produkt
    const filteredReviews = reviews.filter(review => review.product === product);

    res.render('reviews', { 
        title: `Rezensionen - ${product}`, 
        reviews: filteredReviews,
        product: {
            name: product,
        }
    });
});

// Route zum Hinzufügen einer neuen Rezension
app.post('/reviews', (req, res) => {
    const newReview = {
        title: req.body.title,
        author: req.body.author,
        text: req.body.text,
        rating: req.body.rating,
        product: req.body.product
    };
    reviews.push(newReview);
    res.json(newReview); // Senden der neuen Rezension als JSON-Antwort
});

