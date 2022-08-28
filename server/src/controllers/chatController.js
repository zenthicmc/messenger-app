require('../../config/database');
const Chat = require('../models/chatModel');
const User = require('../models/User');

const accessChat = async (req, res) => {
    const { userId, id } = req.body;

    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    }).populate("users", "-password").populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email"
    });

    if (isChat.length > 0) {
        res.json(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [id, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);

            const FullChat = await Chat.findOne({ _id: createdChat.id }).populate("users", "-password")

            res.json(FullChat)
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

const fetchChat = async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.params.id } } })
            .populate("users", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (result) => {
                result = await User.populate(result, {
                    path: "latestMessage.sender",
                    select: "firstname lastname image"
                });

                res.json({
                    contacts: result,
                    message: "fetching contact successfully"
                })
            });
    } catch (error) {
        res.json(error)
    }
}

// const createGroupchat= async (req, res) => {

// }

module.exports = { accessChat, fetchChat }