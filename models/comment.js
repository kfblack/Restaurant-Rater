const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    description : {
        type: String,
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


module.exports = mongoose.model("Comment", commentSchema);