require('dotenv').config(); // Laden der Umgebungsvariablen
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
// Verwende die Middleware für URL-kodierte und JSON-Daten
const bodyParser = require('body-parser');
const Review = require('./models/Review');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure Express to use EJS and express-ejs-layouts
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Verbindung zu MongoDB herstellen
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB verbunden'))
.catch(err => console.error('MongoDB-Verbindungsfehler:', err));


// Middleware zum Parsen von JSON und URL-kodierten Daten
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((err, req, res, next) => {
    console.error('Globaler Fehler:', err.message);
    res.status(500).send('Serverfehler');
});

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

app.get('/health', async (req, res) => {
    try {
        // Testen Sie die Verbindung zu MongoDB
        await mongoose.connection.db.admin().ping();
        res.status(200).send('OK');
    } catch (err) {
        console.error('Health-Check Fehler:', err.message);
        res.status(500).send('Health-Check fehlgeschlagen');
    }
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
app.get('/reviews', async (req, res) => {
    try {
        const { product, minRating, author, success } = req.query;
        // Basisabfrage
        const query = {};
        // Filter nach Produkt
        if (product) {
            query.product = product;
        }
        // Filter nach minimaler Bewertung
        if (minRating) {
            query.rating = { $gte: parseInt(minRating) };
        }
        // Filter nach Autor
        if (author) {
            query.author = { $regex: new RegExp(author, 'i') }; // Unscharfe Suche (case-insensitive)
        }
        // Datenbankabfrage mit den Filtern
        const reviews = await Review.find(query).sort({ createdAt: -1 });
        // Erfolgsmeldung weiterleiten
        res.render('reviews', { 
            title: `Rezensionen - ${product || 'Alle Produkte'}`, 
            reviews,
            product,
            minRating,
            author,
            success: success === 'true' // Erfolgsmeldung nur, wenn `success=true` in Query-Params
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Serverfehler");
    }
});


app.post('/reviews', async (req, res) => {
    try {
        const { title, author, text, rating, product } = req.body;

        if (!title || !author || !text || !rating || !product) {
            return res.status(400).json({ error: "Alle Felder müssen ausgefüllt sein!" });
        }

        // Überprüfung auf Duplikate
        const existingReview = await Review.findOne({ title, author, product });
        if (existingReview) {
            return res.status(409).json({ error: "Eine ähnliche Rezension existiert bereits." });
        }

        // Neue Rezension speichern
        const newReview = new Review({ title, author, text, rating, product });
        await newReview.save();

        res.status(201).json(newReview);
    } catch (err) {
        console.error("Fehler beim Speichern der Rezension:", err.message);
        res.status(500).json({ error: "Fehler beim Speichern der Rezension" });
    }
});



// Route zum Bearbeiten einer Rezension
app.get('/reviews/edit/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).send("Rezension nicht gefunden");
        }
        res.render('editReview', { review });
    } catch (err) {
        console.error(err);
        res.status(500).send("Serverfehler");
    }
});

app.post('/reviews/edit/:id', async (req, res) => {
    try {
        const { title, author, text, rating, product } = req.body;
        await Review.findByIdAndUpdate(req.params.id, { title, author, text, rating, product });
        res.redirect('/reviews?product=' + encodeURIComponent(product));
    } catch (err) {
        console.error(err);
        res.status(500).send("Serverfehler");
    }
});

// Route zum Löschen einer Rezension
app.post('/reviews/delete/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).send("Rezension nicht gefunden");
        }
        await Review.findByIdAndDelete(req.params.id);
        res.redirect('/reviews?product=' + encodeURIComponent(review.product));
    } catch (err) {
        console.error(err);
        res.status(500).send("Serverfehler");
    }
});

