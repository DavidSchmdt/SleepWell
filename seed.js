const mongoose = require('mongoose');
const Review = require('./models/Review');

const MONGODB_URI = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority';

async function seedDatabase() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB erfolgreich verbunden');

        const existingReviews = await Review.countDocuments();
        if (existingReviews > 0) {
            console.log("Die Datenbank enthält bereits Rezensionen. Keine Dummy-Daten hinzugefügt.");
            return;
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
        console.log("Dummy-Daten erfolgreich hinzugefügt");
    } catch (err) {
        console.error("Fehler beim Hinzufügen von Dummy-Daten:", err.message);
    } finally {
        mongoose.connection.close();
    }
}

seedDatabase();
