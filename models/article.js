var mongoose = require("mongoose");

// reference to Schema constructor
var Schema = mongoose.Schema;

// Using Schema constructor, create new UserSchema object
var ArticleSchema = new Schema({
  // `title` and string type is required
  title: {
    type: String,
    required: true
  },
  // `link` and string type is required
  link: {
    type: String,
    required: true
  },
  // `note` is an object that stores a Note id
  // ref links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// This creates our model from the above schema
// this uses mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;