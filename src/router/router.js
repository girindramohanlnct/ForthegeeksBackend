const express = require("express");
const router = express.Router();
const api = require("../api/post");
const userApi = require("../api/userApi");

router.post("/createPost", api.createPost);
router.get("/getPost", api.getPost);
router.get("/getType", api.getType);
router.get("/getContent/:topic", api.getContent);
router.get("/getPostForUpdate/:topicId", api.getPostForUpdate);
router.get("/getContentByTitle/:title", api.getContentByTitle);
router.put("/updatePost/:topicId", api.updatePost);
router.post("/sendMessage", api.sendMessage);
router.post("/signup", userApi.signup);
router.post("/login", userApi.login);

module.exports = router;
