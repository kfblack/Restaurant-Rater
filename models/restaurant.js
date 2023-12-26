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
    likedBy: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
    },
    dislikedBy: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true 
    },
    userName: String,
    userAvatar: String,
}, {
    timestamps: true
});

restaurantSchema.index({name: "text"});
module.exports = mongoose.model("Restaurant", restaurantSchema);