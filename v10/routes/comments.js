var express = require("express");
var router = express.Router({mergeParams: true});
var Index = require("./index");
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
                        comment.author.id = req.user._id;
                        comment.author.username = req.user.username;
                        comment.save();
                        camp.comments.push(comment);
                        camp.save();
                        res.redirect(`/campgrounds/${camp._id}`);
                    }
                });
        }
    })
});

//EDIT Comment
router.get("/:comment_id/edit", checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id,function(err, comment){
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit",{camp_id:req.params.id,comment});
        }
    })
})

//UPDATE Comment
router.put("/:comment_id", checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comments,function(err,comment){
        if (err) {
            res.redirect("back");
        } else {
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    })
})

//DELETE Comment
router.delete("/:comment_id", checkCommentOwnership,function(req,res){
    Comment.findByIdAndDelete(req.params.comment_id,function(err, deletedComment){
        if (err) {
            res.redirect("back");
        } else {
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    })
})
// Middleware
function checkCommentOwnership(req,res,next){
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err,comment){
            if (err) {
                res.redirect("back");
            } else {
                if (comment.author.id.equals(req.user._id )) {
                    next();   
                }else{
                    res.send("Not authorized to be here")
                }
            }
        })
    }else{
        console.log("not logged in");
        res.redirect("back");
    }
}

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
