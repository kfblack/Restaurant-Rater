const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    hours: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Restaurant", restaurantSchema);