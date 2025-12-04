const mongoose = require('mongoose');

const serieSchema = new mongoose.Schema({
    name: String,
    year: Number,
    seen: Boolean
});

const Serie = mongoose.model('Serie', serieSchema);

module.exports = Serie;