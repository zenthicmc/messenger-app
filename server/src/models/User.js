const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    online: {
        type: Boolean,
        default: false
    },

    status: {
        type: String,
        required: false,
    },
    token: {
        type: String,
        required: false,
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', UserSchema);