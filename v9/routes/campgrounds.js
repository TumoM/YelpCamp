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
router.post("/", function (req, res) {

    var camp = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    }
    Campground.create(camp, function (err, camps) {
        if (!err) {
            res.redirect("/campgrounds");
        } else {
            console.log(err);
        }
    })
})

// NEW Campground
router.get("/new", function (req, res) {
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

module.exports = router;