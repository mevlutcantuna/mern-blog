const Post = require("../models/post");

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}, {}, { sort: { updatedAt: -1 } });
    return res.status(201).json(posts);
  } catch (err) {
    return next({ statusCode: 404, errorMessage: "Not Found Posts..." });
  }
};

const getMyPosts = async (req, res, next) => {
  const { token } = req.body;
  try {
    const post = await Post.find(
      { user: token },
      {},
      { sort: { updatedAt: -1 } }
    );
    return res.status(201).json(post);
  } catch (err) {
    return next({ statusCode: 404, errorMessage: "Not Found Posts..." });
  }
};

const addPost = async (req, res, next) => {
  const { user, author, title, picture, summary, details } = req.body;
  try {
    const newPost = new Post({
      user,
      author,
      title,
      picture,
      summary,
      details,
    });

    await newPost
      .save()
      .then(() => {
        res.status(201).json(newPost);
      })
      .catch((err) => console.log(err));
  } catch (err) {
    return next({ statusCode: 404, errorMessage: "Something is Wrong..." });
  }
};

const getDetailPost = async (req, res, next) => {
  const { id } = req.body;
  try {
    if (id) {
      const post = await Post.findOne({ _id: id });
      return res.status(201).json(post);
    } else {
      return next({
        statusCode: 404,
        errorMessage: "Not Found Post which has this ID...",
      });
    }
  } catch (err) {
    return next({
      statusCode: 404,
      errorMessage: "Not Found Detail of Post....",
    });
  }
};

const updatePost = async (req, res, next) => {};

module.exports = {
  getAllPosts,
  getMyPosts,
  addPost,
  getDetailPost,
  updatePost,
};
