const express = require("express");
const {
  getAllPosts,
  getMyPosts,
  addPost,
  getDetailPost,
  updatePost,
} = require("../controllers/post");

const route = express.Router();

route.get("/all-posts", getAllPosts);
route.post("/my-posts", getMyPosts);
route.post("/add-post", addPost);
route.post("/:id", getDetailPost);
route.patch("/:id", updatePost);

module.exports = route;
