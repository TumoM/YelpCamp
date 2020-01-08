var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    localStrategy = require("passport-local"),
    User        = require("./models/user"),
    seedDB      = require("./seeds")
var path = require('path');

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

var options = {
    'useCreateIndex': true,
    'useFindAndModify': false,
    'useNewUrlParser': true,
    'useUnifiedTopology': true
}
mongoose.connect("mongodb://localhost:27017/yelp_camp_v8", options);

var port = 3001; 

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/views'));
// seedDB();

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "swag",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// Required Routes
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/",indexRoutes);


app.listen(port, function () {
    console.log(`YelpCamp Server running on ${port}`);

})