var express = require("express");
var router = express.Router({mergeParams: true});
var Index = require("./index");
var Campground  = require("../models/campground"),
Comment     = require("../models/comment");
var middleware = require("../middleware/index");


// New Comments
router.get("/new",middleware.isLoggedIn, function (req, res) {
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
router.post("/",middleware.isLoggedIn, function (req, res) {
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
                        req.flash("error","Something went wrong creating comment.");
                    } else {
                        comment.author.id = req.user._id;
                        comment.author.username = req.user.username;
                        comment.save();
                        camp.comments.push(comment);
                        camp.save();
                        req.flash("success","Successfully created comment.");
                        res.redirect(`/campgrounds/${camp._id}`);
                    }
                });
        }
    })
});

//EDIT Comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Campground.findById(req.params.id,function(err,camp){
        if (err || !camp) {
            req.flash("error", "Campground not found.");
            return res.redirect("back");
        } else {
            Comment.findById(req.params.comment_id,function(err, comment){
                if (err) {
                    res.redirect("back");
                } else {
                    res.render("comments/edit",{camp_id:req.params.id,comment});
                }
            })
        }
    })
    
})

//UPDATE Comment
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comments,function(err,comment){
        if (err) {
            res.redirect("back");
        } else {
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    })
})

//DELETE Comment
router.delete("/:comment_id", middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndDelete(req.params.comment_id,function(err, deletedComment){
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success"," Comment removed.");
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    })
})


module.exports = router;
