
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

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB erfolgreich verbunden'))
.catch(err => console.error('MongoDB-Verbindungsfehler:', err));


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Verbindung zu MongoDB herstellen
const MONGODB_URI = process.env.MONGODB_URI;

console.log("Verbindungs-URI:", MONGODB_URI);

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async () => {
    console.log('MongoDB erfolgreich verbunden');

    // Prüfen, ob bereits Daten vorhanden sind
    const existingReviews = await Review.countDocuments();
    if (existingReviews === 0) {
        await Review.create([
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
                rating: 4,
                product: "WakeWell™"
            }
        ]);
        console.log("Dummy-Daten erfolgreich hinzugefügt");
    }
})
.catch(err => {
    console.error('MongoDB-Verbindungsfehler:', err.message);
    process.exit(1);
});

app.get('/seed-reviews', async (req, res) => {
    try {
        const existingReviews = await Review.countDocuments();
        if (existingReviews > 0) {
            return res.status(400).send("Die Datenbank enthält bereits Rezensionen. Keine Dummy-Daten hinzugefügt.");
        }

        await Review.create([
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
                rating: 4,
                product: "WakeWell™"
            }
        ]);
        res.status(200).send("Dummy-Daten erfolgreich hinzugefügt");
    } catch (err) {
        console.error("Fehler beim Hinzufügen von Dummy-Daten:", err.message);
        res.status(500).send("Fehler beim Hinzufügen von Dummy-Daten");
    }
});


// Middleware zum Parsen von JSON und URL-kodierten Daten
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((err, req, res, next) => {
    console.error('Globaler Fehler:', err.stack);
    res.status(500).send("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
});


// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', async (req, res) => {
    try {
        // Filtere alle Bewertungen mit 4 oder mehr Sternen
        const allReviews = await Review.find({ rating: { $gte: 4 } });

        // Mischen Sie die Bewertungen und holen Sie drei zufällige
        const shuffledReviews = allReviews.sort(() => 0.5 - Math.random());
        const topReviews = shuffledReviews.slice(0, 3); // Wählt die ersten 3 nach dem Mischen

        res.render('index', {
            title: 'Willkommen bei SleepWell™',
            topReviews, // Übergibt die zufälligen Rezensionen an das Template
        });
    } catch (err) {
        console.error('Fehler beim Abrufen der Rezensionen:', err.message);
        res.status(500).send('Serverfehler');
    }
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
        if (mongoose.connection.readyState !== 1) {
            throw new Error("Datenbank nicht verbunden");
        }
        await mongoose.connection.db.admin().ping();
        res.status(200).send('OK');
    } catch (err) {
        console.error("Health-Check Fehler:", err.message);
        res.status(500).send("Health-Check fehlgeschlagen");
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


// Route zum Anzeigen der Rezensionen
/*app.get('/reviews', async (req, res) => {
    try {
        const { product, minRating, author, success } = req.query;

        console.log("Empfangene Query-Parameter:", req.query);

        // Query-Aufbau
        const query = {};
        if (product) query.product = product;
        if (minRating) query.rating = { $gte: parseInt(minRating) };
        if (author) query.author = { $regex: new RegExp(author, 'i') };

        console.log("MongoDB Query:", query);

        // Datenbankabfrage
        const reviews = await Review.find(query).sort({ createdAt: -1 });
        console.log("Gefundene Reviews:", reviews);

        // Rendering
        res.render('reviews', {
            title: `Rezensionen - ${product || 'Alle Produkte'}`,
            reviews,
            product,
            minRating,
            author,
            success: success === 'true'
        });
    } catch (err) {
        console.error("Fehler in der /reviews-Route:", err.stack);
        res.status(500).send("Serverfehler: " + err.message);
    }
});
*/

app.get('/reviews', async (req, res) => {
    try {
        const { product, minRating, author, success } = req.query;

        console.log("Empfangene Query-Parameter:", req.query);

        // Überprüfung der MongoDB-Verbindung
        if (mongoose.connection.readyState !== 1) {
            throw new Error("Datenbank nicht verbunden");
        }

        // Basisabfrage erstellen
        const query = {};

        // Produktfilter
        if (product) query.product = product;

        // Bewertung validieren und filtern
        if (minRating) {
            const minRatingValue = parseInt(minRating);
            if (isNaN(minRatingValue)) {
                throw new Error("Ungültiger Wert für minRating");
            }
            query.rating = { $gte: minRatingValue };
        }

        // Autor filtern
        if (author) query.author = { $regex: new RegExp(author, 'i') }; // Case-insensitive Suche

        console.log("Datenbankabfrage:", query);

        // Datenbankabfrage ausführen
        const reviews = await Review.find(query).sort({ createdAt: -1 });

        console.log("Gefundene Rezensionen:", reviews);

        // Template mit den gefundenen Rezensionen rendern
        res.render('reviews', {
            title: `Rezensionen - ${product || 'Alle Produkte'}`,
            reviews,
            product,
            minRating,
            author,
            success: success === 'true'
        });
    } catch (err) {
        console.error("Fehler in der /reviews-Route:", err.stack);
        res.status(500).send("Serverfehler: " + err.message);
    }
});

app.post('/reviews', async (req, res) => {
    try {
        const { title, author, text, rating, product } = req.body;

        // Validierung der Eingabedaten
        if (!title || !author || !text || !rating || !product) {
            console.error("Ungültige Eingabedaten:", req.body);
            return res.status(400).json({ error: "Alle Felder müssen ausgefüllt sein!" });
        }

        // Rezension speichern
        const newReview = new Review({ title, author, text, rating, product });
        await newReview.save();

        res.status(201).json(newReview);
    } catch (err) {
        console.error("Fehler beim Speichern der Rezension:", err.message);
        res.status(500).json({ error: "Fehler beim Speichern der Rezension" });
    }
});


app.use((err, req, res, next) => {
    console.error("Globaler Fehler:", err.stack);
    res.status(500).send("Ein interner Serverfehler ist aufgetreten.");
});

app.get('/api/sleepwell-rating', async (req, res) => {
    try {
        // Filtere alle Rezensionen für SleepWell™
        const reviews = await Review.find({ product: "SleepWell™" });

        // Berechnung der durchschnittlichen Bewertung
        const totalReviews = reviews.length;
        const averageRating = totalReviews > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
            : 0;

        // Rückgabe von Durchschnittsbewertung und Anzahl der Bewertungen
        res.json({ averageRating: averageRating.toFixed(1), totalReviews });
    } catch (err) {
        console.error('Fehler beim Abrufen der Bewertung:', err.message);
        res.status(500).json({ error: 'Fehler beim Abrufen der Bewertung' });
    }
});

app.get('/api/wakewell-rating', async (req, res) => {
    try {
        // Filtere alle Bewertungen für WakeWell™
        const reviews = await Review.find({ product: "WakeWell™" });

        // Berechnung der durchschnittlichen Bewertung
        const totalReviews = reviews.length;
        const averageRating = totalReviews > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
            : 0;

        // Rückgabe von Durchschnittsbewertung und Anzahl der Bewertungen
        res.json({ averageRating: averageRating.toFixed(1), totalReviews });
    } catch (err) {
        console.error('Fehler beim Abrufen der WakeWell-Bewertung:', err.message);
        res.status(500).json({ error: 'Fehler beim Abrufen der Bewertung' });
    }
});


