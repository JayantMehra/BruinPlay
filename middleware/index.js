var Campground = require("../models/song");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkSongOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Song.findById(req.params.id, function(err, foundSong){
           if(err){
               req.flash("error", "Campground not found");
               res.redirect("back");
           }  else {
               // does user own the song?
            if(foundSong.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You do not have permission to do that.");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in")
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in");
    res.redirect("/login");
}

module.exports = middlewareObj;