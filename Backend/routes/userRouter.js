import express from 'express';
import SavingPot from '../models/potsmodel.js';
import User from '../models/usermodel.js';
import Transaction from '../models/historymodel.js';

const userRouter = express.Router();
userRouter.get('/user', async (req, res) => {
    try {
        const users = await User.find().populate('pots').populate('history');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

userRouter.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('pots').populate('history');
        if (!user) return res.status(404).json({message: "User not found"});
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default userRouter;