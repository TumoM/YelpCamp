const express = require("express");
const bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var options = {'useCreateIndex': true,
'useFindAndModify': false,
'useNewUrlParser': true,
'useUnifiedTopology': true
}
mongoose.connect("mongodb://localhost:27017/yelp_camp", options);

var port = 3000;

// var campgrounds = [
//     {name: "Willow Creek", image: "https://pixabay.com/get/57e8d3444855a914f6da8c7dda793f7f1636dfe2564c704c72277adc9744c25e_340.jpg"},
//     {name: "Granite Fall Hills", image: "https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c72277adc9744c25e_340.jpg"},
//     {name: "Grizley Bears Gorge", image: "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72277adc9744c25e_340.png"},
//     {name: "Willow Creek", image: "https://pixabay.com/get/57e8d3444855a914f6da8c7dda793f7f1636dfe2564c704c72277adc9744c25e_340.jpg"},
//     {name: "Granite Fall Hills", image: "https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c72277adc9744c25e_340.jpg"},
//     {name: "Grizley Bears Gorge", image: "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72277adc9744c25e_340.png"},
//     {name: "Willow Creek", image: "https://pixabay.com/get/57e8d3444855a914f6da8c7dda793f7f1636dfe2564c704c72277adc9744c25e_340.jpg"},
//     {name: "Granite Fall Hills", image: "https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c72277adc9744c25e_340.jpg"},
//     {name: "Grizley Bears Gorge", image: "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72277adc9744c25e_340.png"}
// ]

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'))

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
})

var Campground = mongoose.model("Campground", campgroundSchema);
// Campground.create(campgrounds[1], function(err, campgrounds){
//     if (!err) {
//         console.log("Newly created campground");
//         console.log(campgrounds);
//     } else {
//         console.log(err);
        
//     }
// })

app.get("/", function(req, res){
    // res.send("Landing page!!")
    res.render("landing")
})

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if (!err) {
            res.render("campgrounds", {campgrounds:allCampgrounds});
        } else {
            console.log(err);
        }
    })
})

app.post("/campgrounds", function(req, res){
    
    var camp = {
        name: req.body.name,
        image: req.body.image
    }
    Campground.create(camp, function(err, camps){
        if (!err) {
            res.redirect("/campgrounds"); 
        } else {
            console.log(err);
        }
    })
})

app.get("/campgrounds/new", function(req, res){ 
    res.render("new");
})

app.listen(port,function(){
    console.log(`YelpCamp Server running on ${port}`);
    
})