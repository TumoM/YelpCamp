var Campground = require("../models/campground"),
Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, comment) {
            if (err || !comment) {
                req.flash("error","Comment not found/DB Error");
                res.redirect("back");
            } else {
                if (comment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error","You are not authorized for such action.");
                    res.redirect("back");
                }
            }
        })
    } else {
        console.log("not logged in");
        req.flash("error","You must be logged in for such action.");
        res.redirect("back");
    }
}

middlewareObj.checkCampOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, camp) {
            if (err || !camp) {
                req.flash("error","Campground not found/DB Error");
                res.redirect("back");
            } else {
                if (camp.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error","You are not authorized for such action.");
                    res.redirect("back");
                }
            }
        })
    } else {
        console.log("not logged in");
        req.flash("error","You must be logged in for such action.");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error","You must be logged in for such action.");
    res.redirect("/login");
}

module.exports = middlewareObj;