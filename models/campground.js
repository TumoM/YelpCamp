const mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    author:{
        id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    username: String
    }   ,comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
})

const Comment = require('./comment');
campgroundSchema.pre('remove', async function() {
    await Comment.remove({
        _id: {
            $in: this.comments
        }
    });
});

var Campground = mongoose.model("Campground", campgroundSchema);
module.exports = Campground