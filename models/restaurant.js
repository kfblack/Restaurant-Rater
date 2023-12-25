const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: String,
    location: {
        type: String,
        required: true,
    },
    hours: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true
});

restaurantSchema.index({name: "text"});
module.exports = mongoose.model("Restaurant", restaurantSchema);