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