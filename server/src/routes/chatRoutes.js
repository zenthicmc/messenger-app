const express = require('express')
const router = express.Router();
require('express-router-group')
const {verifyToken} = require("../middlewares/validators/loginValidator");
const {accessChat, fetchChat} = require("../controllers/chatController")

router.post('/', accessChat);
router.get("/:id", fetchChat);
// router.post('/group', verifyToken, createGroupchat);
// router.put('/rename', verifyToken, renameGroup);
// router.put('/groupRemove', verifyToken, removeFromGroup);
// router.put('/groupAdd', verifyToken, addToGroup);

module.exports = router;