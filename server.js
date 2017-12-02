var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	methodOverride = require("method-override"),
	expressSanitizer = require("express-sanitizer"),
	howler = require("howler"),
	flash = require("connect-flash"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
	Song = require("./models/song.js"),
	User = require("./models/user.js"),
	middleware = require("./middleware/index.js");

var songRoutes = require("./routes/songs.js"),
	userRoutes = require("./routes/users.js"),
	indexRoutes = require("./routes/index.js");

mongoose.connect("mongodb://localhost/bruin_play");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.use(expressSanitizer());
app.locals.moment = require("moment");

//  PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "How you doin?",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use(songRoutes);
app.use(userRoutes);
app.use(indexRoutes);


//	SERVER SETUP
app.listen(3000, function(req, res) {
	console.log("Server is listening on port 3000. Go to http://localhost:3000/");
});

