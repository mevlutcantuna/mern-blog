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
route.post("/detail-post", getDetailPost);
route.patch("/update-post", updatePost);

module.exports = route;
