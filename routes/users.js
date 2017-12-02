var express = require("express");
var router = express.Router({mergeParams: true});
var Song = require("../models/song.js");
var User = require("../models/user.js");
var middleware = require("../middleware/index.js");

router.get("/users/:id", middleware.isLoggedIn, function(req, res) {
	User.findById(req.params.id, function(err, foundUser) {
		if (err) {
			console.log(err);
		}
		else {
			Song.find({}, function(err, allSongs) {
				if (err) {
					console.log(err);
				}
				else {
					res.render("users/show", {user: foundUser, songs: allSongs});
				}
			});
		}
	});
});

router.get("/users/songs/:id", function(req, res) {
	Song.findById(req.params.id, function(err, foundSong) {
		if (err) {
			console.log(err);
		}
		else {
			if (req.xhr) {
				res.json(foundSong);
			}
		}
	})
});

router.delete("/users/songs/:id", function(req, res){
	Song.findByIdAndRemove(req.params.id, function(err, sog){
	    if(err){
	    	console.log(err);
	   	} else {
	        res.redirect('back');
	    }
	 }); 
});

module.exports = router;