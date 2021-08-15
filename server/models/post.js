const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    required: true,
    type: String,
    trim: true,
  },
  picture: {
    type: String,
    trim: true,
    default: "https://picsum.photos/seed/picsum/200/300",
  },
  summary: {
    required: true,
    type: String,
    trim: true,
  },
  details: {
    required: true,
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
