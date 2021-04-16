const express = require("express");
const router = express.Router();
const api = require("../api/post");

router.post("/createPost", api.createPost);
router.get("/getPost", api.getPost);
router.get("/getType", api.getType);
router.get("/getContent/:topic", api.getContent);
router.get("/getPostForUpdate/:topicId", api.getPostForUpdate);
router.get("/getContentByTitle/:title", api.getContentByTitle);
router.put("/updatePost/:topicId", api.updatePost);
router.post("/sendMessage", api.sendMessage);

module.exports = router;
