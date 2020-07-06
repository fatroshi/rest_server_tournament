const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament');


// All tournaments
router.get('/', async(req, res) => {
    try{
        const tournaments = await Tournament.find();
        await res.json(tournaments);
    }catch (e) {
        res.status(500).json({message: e});
    }
});

router.get('/players', (req, res) => {
    res.send('Players page');
});

// Submit post
router.post('/', async (req, res) => {
   const tournament = new Tournament({
      title: req.body.title,
      matches: req.body.matches
   });

   try{
       const record = await tournament.save();
       await res.status(200).json(record);
   }catch (e) {
       res.status(500).json({message: e});
   }
});

// Find by id
router.get('/:tournamentId', async(req, res) => {
    try{
        const tournament = await Tournament.findById(req.params.tournamentId);
        res.status(200).json(tournament);
    }catch (e) {
        res.status(500).json({ message: e });
    }
});

// Delete record
router.delete('/:tournamentId', async(req, res) => {
    try{
        const removedTournament = await Tournament.remove({_id : req.params.tournamentId});
        res.status(200).json(removedTournament);
    }catch (e) {
        res.status(500).json({ message: e });
    }
});

// update record
router.patch('/:tournamentId', async(req, res) => {
    try{
        const removedTournament = await Tournament.updateOne(
            {_id : req.params.tournamentId},
            {$set: {title: req.body.title}});
        res.status(200).json(removedTournament);
    }catch (e) {
        res.status(500).json({ message: e });
    }
});

module.exports = router;