require('../../config/database');
const Message = require("../models/messageModel");
const User = require('../models/User');
const Chat = require("../models/chatModel")

exports.sendMessage = async (req, res) => {
    const { content, id } = req.body;
    const { chatId } = req.params;

    if (!content || !chatId) return res.json("Invalid data passed into request")

    if (chatId == 'null' || id == 'null') {
        res.clearCookie('refreshToken')
        return res.redirect(process.env.URL)
    }

    const newMessage = {
        sender: id,
        content: content,
        chat: chatId
    }

    try {
        let message = await Message.create(newMessage);

        message = await message.populate("sender", "username firstname lastname image");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "username firstname lastname image email"
        });

        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: message,
        });

        return res.json(message);

    } catch (error) {
        throw new Error(error.message);
    }
}

exports.allMessage = async (req, res) => {
    const { chatId } = req.params;
    try {
        const messages = await Message.find({ chat: chatId })
            .populate("sender", "username firstname lastname email image")
            .populate("chat");

        return res.json(messages);
    } catch (error) {

    }
}
