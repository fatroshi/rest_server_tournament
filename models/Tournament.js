const mongoose = require('mongoose');

const TournamentSchema = mongoose.Schema({
    title: {
        type: String,
        default: "Champions " + Date.now()
    },
    matches: {
        type: Number,
        required: true
    },
    date: { type: Date, default: Date.now()}
});

module.exports = mongoose.model('Tournament', TournamentSchema);