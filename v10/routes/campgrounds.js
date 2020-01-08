var express = require("express");
var router = express.Router();
var Campground  = require("../models/campground"),
Comment     = require("../models/comment");




// INDEX Campground 
router.get("/", function (req, res) {
    var user = req.user
    Campground.find({}, function (err, allCampgrounds) {
        if (!err) {
            res.render("campgrounds/index", {
                campgrounds: allCampgrounds
            });
        } else {
            console.log(err);
        }
    })
})

// CREATE Campground
router.post("/",isLoggedIn, function (req, res) {
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var camp = {
        name: req.body.name,
        image: req.body.image,
        description: (req.body.description).trim(),
        author
    }
    
    // camp.author = author;
    Campground.create(camp, function (err, camp) {
        if (!err) {
            camp.author.id = req.user._id;
            console.log(camp);
            
            res.redirect("/campgrounds");
        } else {
            console.log(err);
        }
    })
})

// NEW Campground
router.get("/new",isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
})

// SHOW Campground
router.get("/:id", function (req, res) {
    let id = req.params.id;
    Campground.findById(id).populate("comments").exec(function (err, camp) {
        if (!err) {
            res.render("campgrounds/show", {
                camp
            });
        } else {
            console.log(err);

        }
    });

})

// Middleware
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
module.exports = router;