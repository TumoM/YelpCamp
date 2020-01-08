var express = require("express");
var router = express.Router();
var Campground  = require("../models/campground"),
Comment     = require("../models/comment");
var middleware = require("../middleware"); // Auto refers to index.js in middleware folder


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
router.post("/",middleware.isLoggedIn, function (req, res) {
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
router.get("/new",middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
})

// SHOW Campground
router.get("/:id", function (req, res) {
    let id = req.params.id;
    Campground.findById(id).populate("comments").exec(function (err, camp) {
        if (!err && camp) {
            res.render("campgrounds/show", {camp});
        } else {
            req.flash("error", "Campground not found!");
            res.redirect("back");

        }
    });

})

// Edit Campground
router.get("/:id/edit",middleware.checkCampOwnership, function (req, res) {
            Campground.findById(req.params.id, function (err, camp) {
                if (err) {
                    req.flash("error","Campground not found/DB Error");
                    console.log(err);
                } else {
                    res.render("campgrounds/edit", {camp});
                }
            });
        });

// Update Campground
router.put("/:id",middleware.checkCampOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.camp, function(err, camp){
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})

// Destroy Campground
router.delete("/:id",middleware.checkCampOwnership,function(req,res){
    Campground.findByIdAndDelete(req.params.id,function(err, result){
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
})

module.exports = router;