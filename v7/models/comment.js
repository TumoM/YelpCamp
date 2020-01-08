const mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    author: String,
    text: String
})

var Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;