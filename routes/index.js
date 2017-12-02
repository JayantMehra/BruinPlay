var express = require("express");
var router = express.Router();
var User = require("../models/user.js");
var passport = require("passport");
var middleware = require("../middleware/index");


//  LANDING
router.get("/", function(req, res) {
  res.render("landing");
});

//	REGISTER
router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register", function(req, res) {
   User.register(new User({username: req.body.username, image_url: req.body.image_url}), req.body.password, function(err, user) {
       if (err) {
           return res.render("register", {"error": err.message});
       }
       passport.authenticate("local")(req, res, function() {
           req.flash("success", "Welcome to Song, " + user.username);
           res.redirect("/songs"); 
       });
   });
});

//  Show Login Form
router.get("/login", function(req, res) {
    res.render("login");
});

//  handle login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/songs",
    failureRedirect: "/login"
    }), function(req, res) {
});

//  Logout logic
router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "You've been logged out successfully.");
   res.redirect("/songs");
});


module.exports = router;
