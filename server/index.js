const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const catchAllErrorHandler = require("./middlewares/catchAllErrorHandler");

const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to Blog API");
});

app.use(userRouter);
app.use(postRouter);

app.use(catchAllErrorHandler);

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Working on ${process.env.PORT} PORT...`);
    });
  })
  .catch((err) => console.log(err));
