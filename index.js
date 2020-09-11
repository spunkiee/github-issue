const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const issueRoutes = require("./server/routes/issueRoutes");

const app = express();

const { NODE_PORT, NODE_ENV, DATABASE_URL } = process.env;

const PORT = process.env.PORT || NODE_PORT || 8000;

const isDevelopment = NODE_ENV === "development";

if (isDevelopment) {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

if (isDevelopment) {
  app.use(cors());
}

app.use(express.static(path.join(__dirname, "/client/build")));

app.use("/api/", issueRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

mongoose
  .connect(DATABASE_URL, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `DB connected and the server is runnning at ${PORT}-${NODE_ENV}`
      );
    });
  })
  .catch((err) => {
    console.error("Db connection failed", err);
  });
