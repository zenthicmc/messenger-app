require('../../config/database');
const Chat = require('../models/chatModel');
const User = require('../models/User');

const accessChat = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    }).populate("users", "-password").populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email"
    });

    if (isChat.length > 0) {
        res.json(isChat[0]);
    }else{
        let chatData = {
            chatName: "sender",
            isGroupChat: false,
            users:[req.user._id],
        };
        
        try {
            const createdChat = await Chat.create(chatData);

            const FullChat = await Chat.findOne({_id: createdChat._id}).populate("users", "-password")

            res.json(FullChat)
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

const fetchChat = async (req, res) => {
try {
    Chat.find({users :{$elemMatch : {$eq: req.user._id}}}).then((result) => res.json(result)
    );
} catch (error) {
    res.json(error)
}
}

// const createGroupchat= async (req, res) => {

// }

module.exports = {accessChat, fetchChat}