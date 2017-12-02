var mongoose = require('mongoose');

var songSchema = new mongoose.Schema ({
	name: String,
	image: String,
   song: String,
   album: String,
	createdAt: {type: Date, default: Date.now()},
   
	uploader: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
   
});

module.exports = mongoose.model("Song", songSchema);