const express = require("express");
const router = express.Router();
const {sendMessage, allMessage} = require("../controllers/messageController");

router.post("/:chatId", sendMessage);
router.get("/:chatId", allMessage);

module.exports = router;