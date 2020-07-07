const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Friend = require('../models/Friend');

// Route: /users
router.get('/', async(req, res) => {
   try{
       const users = await User.find();
       res.status(200).json(users);
   } catch (e) {
       res.status(500).json({message: e});
   }
});

router.post('/', async(req, res) => {

    const user = new User({
       user: req.body.username,
       password: req.body.password,
       email: req.body.email,
    });

    try{
        const savedUser = await user.save();
        res.status(200).json(savedUser);
    }catch (e) {
        res.status(500).json({ message: e});
    }
});

router.post('/friends', async(req, res) => {
    const user = new User({
        user: req.body.username,
        password: req.body.password,
        email: req.body.email,
    });

    const friend = new Friend({
        username: req.body.friends.username
    });

    try{
        const saveFriend = await friend.save();
        user.friends.push(saveFriend);
        const savedUser = await user.save();
        res.status(200).json(savedUser);
    }catch (e) {
        res.status(500).json({ message: e});
    }

});

module.exports = router;
