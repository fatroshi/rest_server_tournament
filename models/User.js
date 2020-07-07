const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = mongoose.Schema({
   user: {
       type: String,
       required: true,
       unique: true
   },
    password: {
       type: String,
       required: true
   },
    email: {
        type: String,
        required: true,
        unique: true
    },

    userAvatar: {
       type: String,
        default: '../assets/avatar/user'
    },

    friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'Friend'}],

    team: {
       name: {
           type: String,
           default: 'KURDISTAN'
       },
        avatar: {
           type: String,
            default: '../assets/avatar/team'
        }
    },

    hash: String,
    salt: String,

    date: {
        type: Date,
        default: Date.now()
    }

});

// for later...
UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

module.exports = mongoose.model('User', UserSchema);
