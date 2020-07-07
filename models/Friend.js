const mongoose = require('mongoose');

const FriendSchema = mongoose.Schema({
    username: String
});

module.exports = mongoose.model('Friend', FriendSchema);