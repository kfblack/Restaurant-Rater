const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    description: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Review", reviewSchema);