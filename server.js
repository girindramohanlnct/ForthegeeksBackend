const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const router = express.Router();
const multer = require("multer");
var cors = require("cors");

const way = require("./src/router/router");

mongoose
  .connect(
    "mongodb+srv://mohan:xQESqiXlYQnYNbMG@cluster0-iv487.mongodb.net/auction",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
    console.log("connection failed");
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    console.log("under File");
    let error = new Error("Invalid Mime Type");
    if (isValid) {
      error = null;
    }
    cb(error, "images");
  },
  filename: (req, file, cb) => {
    const a = file.originalname.split(".");
    let n = a.slice(0, a.length - 1);
    n = n.join(".");
    const name = n.toLowerCase().split(" ").join("-");
    console.log(n);
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

app.use(multer({ storage: fileStorage }).single("imageURL"));

app.use(express.static(path.join(__dirname, "views")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, text/html"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
app.use("/api", way);
let PORT = process.env.PORT || 8000;
app.listen(PORT);
module.exports = router;
module.exports = app;
