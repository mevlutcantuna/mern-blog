const User = require("../models/user");
const generateToken = require("../utils/generateToken");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // check email and password
    if (!email || !password) {
      next({
        statusCode: 404,
        errorMessage: "Please Provide Email and Password...",
      });
    }

    const user = await User.findOne({ email });

    // User Exists
    if (!user) {
      next({ statusCode: 404, errorMessage: "Not Found Account..." });
    }

    // check password
    const IsPasswordCorrect = await user.checkPassword(password);
    if (!IsPasswordCorrect) {
      return next({ statusCode: 404, errorMessage: "Your Password is Wrong" });
    }

    //create token
    const token = generateToken(user._id);
    return res.status(201).json({
      user: user,
    });
  } catch (err) {
    return next({ statusCode: 404, errorMessage: "Not Found..." });
  }
};

const signup = async (req, res, next) => {
  const { fullName, email, password, picture } = req.body;

  try {
    // condition for account or not
    const userExists = await User.findOne({ email });

    if (userExists) {
      next({ statusCode: 404, errorMessage: "There is such an account..." });
    } else {
      //create user
      const user = new User({ fullName, email, password, picture });
      await user
        .save()
        .then(() => {
          res.status(201).json(user);
        })
        .catch((err) => console.log(err));
    }
  } catch (err) {
    return next({ statusCode: 404, errorMessage: err.message });
  }
};

module.exports = {
  login,
  signup,
};
