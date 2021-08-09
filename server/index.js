const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./routes/user");
const catchAllErrorHandler = require("./middlewares/catchAllErrorHandler");

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Blog API");
});

app.use(userRouter);

app.use(catchAllErrorHandler);

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Working on ${process.env.PORT} PORT...`);
    });
  })
  .catch((err) => console.log(err));
