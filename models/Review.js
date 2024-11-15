// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    text: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    product: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);

