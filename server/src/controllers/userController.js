require('../../config/database');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const saltrounds = 10;

exports.index = async (req, res) => {

    const keyword = req.query.search 
    ? {
        $or: [
            { username: { $regex: req.query.search, $options: "i" } },
            { firstname: { $regex: req.query.search, $options: "i" } },
            { lastname: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } }
        ]
    } : {};

    const users = await User.find(keyword);

    return res.json({
        users: users,
        status: "success",
        messages: "Fetch data success",
    });
}

exports.details = async (req, res) => {
    try {
        const data = await User.findOne({ _id: req.params.id });

        if (!data) {
            throw error;
        }

        return res.json({
            data: {
                username: data.username,
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                password: data.password,
                image: data.image,
                online: data.online,
                status: data.status,
                token: data.token,
            },
            status: "success",
            messages: "Data found",
        });
    } catch (error) {
        return res.status(400).json({ status: 'fail', messages: "Not Found" });
    }
}

exports.store = async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, saltrounds);

        const data = {
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashPassword,
            image: req.body.image,
            online: false,
            status: "",
            token: "",
        };

        User.create(data, (err, result) => {
            return res.json({ data, status: 'success', message: 'User Created' });
        });
    } catch (error) {
        return res.status(400).json({ status: 'fail', message: 'Unable to create user' });
    }
}

exports.update = async (req, res) => {
    try {
        const oldData = await User.findOne({ _id: req.params.id });
        if (!oldData) return res.status(404).json({ status: 'fail', message: 'User not found' });

        //    let image = oldData.image;
        //     if (oldData.image == null || undefined) {
        //         image = 'default.png';
        //     }

        const data = {
            firstname: (req.body.firstname) ? req.body.firstname : oldData.firstname,
            lastname: (req.body.lastname) ? req.body.lastname : oldData.lastname,
            email: (req.body.email) ? req.body.email : oldData.email,
            password: await bcrypt.hash(req.body.password, saltrounds),
            image: req.body.image,
            online: false,
            status: (req.body.status) ? req.body.status : oldData.status,
            token: (req.body.token) ? req.body.token : oldData.token
        }

        await User.updateOne({ _id: req.params.id }, {
            $set: data
        }).then(() => res.json({ status: 'success', message: 'User updated', data: { username: req.params.username } }));
    } catch (error) {
        return res.json({ status: "fail", message: "Unable to update user" });
    }
}

exports.destroy = async (req, res) => {
    try {
        const data = await User.findOne({ _id: req.params.id });

        if (!data) throw error;

        await User.deleteOne({ username: data.username }).then(() => res.json({ status: 200, message: 'User has been deleted' }));
    } catch (error) {
        return res.status(400).json({ status: 'fail', message: 'Unable to delete user' });
    }
}

exports.viewImage = async (req, res) => {
    const data = await User.findOne({ username: req.params.username });

    return res.json(data.image);
}