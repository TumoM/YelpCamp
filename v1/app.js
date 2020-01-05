var express = require("express");
const bodyParser = require("body-parser");
var app = express();

var port = 3000;

var campgrounds = [
    {name: "Willow Creek", image: "https://pixabay.com/get/57e8d3444855a914f6da8c7dda793f7f1636dfe2564c704c72277adc9744c25e_340.jpg"},
    {name: "Granite Fall Hills", image: "https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c72277adc9744c25e_340.jpg"},
    {name: "Grizley Bears Gorge", image: "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72277adc9744c25e_340.png"}
]

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    // res.send("Landing page!!")
    res.render("landing")
})

app.get("/campgrounds", function(req, res){
    
res.render("campgrounds", {campgrounds});
})

app.post("/campgrounds", function(req, res){
    var camp = {
        name: req.body.name,
        image: req.body.image
    }
    campgrounds.push(camp);
    res.redirect("/campgrounds");
})

app.get("/campgrounds/new", function(req, res){ 
    res.render("new");
})

app.listen(port,function(){
    console.log(`YelpCamp Server running on ${port}`);
    
})