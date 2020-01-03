var express = require("express");
var app = express();

var port = 3000;

app.set("view engine", "ejs")

app.get("/", function(req, res){
    // res.send("Landing page!!")
    res.render("landing")
})

app.get("/campgrounds", function(req, res){
    var campgrounds = [
        {name: "Willow Creek", image: "https://pixabay.com/get/57e8d3444855a914f6da8c7dda793f7f1636dfe2564c704c72277bd4924cc35b_340.jpg"},
        {name: "Granite Fall Hills", image: "https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c72277bd4924cc35b_340.jpg"},
        {name: "Grizley Bears Gorge", image: "https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c72277bd4924cc35b_340.jpg"}
    ]
res.render("campgrounds", {campgrounds});
})

app.listen(port,function(){
    console.log(`YelpCamp Server running on ${port}`);
    
})