var express = require("express");
var router = express.Router({mergeParams: true});
var Index = require("../routes/index");
var Campground  = require("../models/campground"),
Comment     = require("../models/comment");

// New Comments
router.get("/new",isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, camp) {
        if (err) {
            console.log(err);

        } else {
            res.render("comments/new", {
                camp
            });
        }
    })
})

// Create Comment
router.post("/",isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, camp) {
        if (err) {
            console.log(err);
            res.redirect(`/campgrounds`);
        } else {
            Comment.create(
                req.body.comments,
                function (err, comment) {
                    if (err) {
                        console.log(err);

                    } else {
                        camp.comments.push(comment);
                        camp.save();
                        res.redirect(`/campgrounds/${camp._id}`);
                    }
                });
        }
    })
});

// Middleware
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
