var express = require("express");
var router = express.Router(),
passport    = require("passport"),
User        = require("../models/user");


router.get("/", function (req, res) {

    res.redirect("/campgrounds");
})

router.get("/register", function (req, res) {

    res.render("register");
})

router.post("/register", function (req, res) {
    console.log("making new user");
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register")
        }
        console.log("Attempting to authenticate");
        passport.authenticate("local")(req, res, function() {

            res.redirect("/campgrounds");
        })
    });
})

router.get("/login", function (req, res) {

    res.render("login");
})


router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function (req, res) {

});

router.get("/logout", function(req,res){
    req.logout();
    res.redirect("/campgrounds")
})

 function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
