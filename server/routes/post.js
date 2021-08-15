const express = require("express");
const {
  getAllPosts,
  getMyPosts,
  addPost,
  getDetailPost,
} = require("../controllers/post");

const route = express.Router();

route.get("/all-posts", getAllPosts);
route.post("/my-posts", getMyPosts);
route.post("/add-post", addPost);
route.post("/detail-post", getDetailPost);

module.exports = route;
