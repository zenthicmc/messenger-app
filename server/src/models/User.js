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
        required: true,
    },
    token: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('User', UserSchema);