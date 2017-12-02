var express = require("express");
var router = express.Router({mergeParams: true});
var Song = require("../models/song.js");
var User = require("../models/user.js")
var middleware = require("../middleware/index.js");

// INDEX
router.get("/songs/", function(req, res) {
	Song.find({}, function(err, allSongs) {
		if (err) {
			console.log(err);
		}
		else {
			var sound = "sound.mp3"
			res.render("songs/index", {songs: allSongs, sound: sound});
		}
	})
});

//	NEW
router.get("/songs/new", middleware.isLoggedIn, function(req, res) {
   res.render("songs/new"); 
});


//	CREATE
router.post("/songs",  middleware.isLoggedIn, function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var song = req.body.song;
	var album = req.body.album;

	var uploader = {
        id: req.user._id,
        username: req.user.username
    };

	var newSong = {name: name, uploader: uploader, image: image, song: song, album: album};

	Song.create(newSong, function(err, newlyCreated) {
		if (err) {
			console.log(err)
		}
		else {
			res.redirect("/songs");
		}
	})
});

//	SHOW

router.get("/songs/:id", middleware.isLoggedIn, function(req, res) {
	Song.findById(req.params.id, function(err, foundSong) {
		if (err) {
			console.log(err);
		}
		else {
			if (req.xhr) {
				var songObject = {name: foundSong.name, song: foundSong.song, image: foundSong.image, album: foundSong.album, uploader: foundSong.uploader.username};
				User.findByIdAndUpdate(req.user._id, {$push: {recents: songObject}}, function(err, user) {
					if (err) {
						console.log(err);
					}
				});

				res.json(foundSong);
			}
		}
	})
});

module.exports = router;