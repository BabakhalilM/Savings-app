import express from 'express'
import User from '../models/usermodel.js';
import SavingPot from '../models/potsmodel.js';
import mongoose from 'mongoose';

const savingPlanRouter = express.Router();

savingPlanRouter.post(`/user/:userId/savingplan`, async (req, res) => {
    const { potPurpose, targetAmount, currentBalance, imoji, color } = req.body;
    
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User Not found" });
        }

        const newSaving = new SavingPot({
            potPurpose,
            targetAmount,
            currentBalance,
            imoji,
            color,
            user: req.params.userId 
        });

        const savedPot = await newSaving.save();
        user.pots.push(savedPot._id);
        await user.save();

        res.status(201).json({ message: 'Saving plan created', pot: savedPot });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

savingPlanRouter.get('/user/:id/savingplan', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('pots');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user.pots);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

savingPlanRouter.patch('/user/:userId/savingplan/:potId', async (req, res) => {
    const { potId, userId } = req.params;
    const { currentBalance } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const pot = await SavingPot.findById(potId);
        if (!pot) return res.status(404).json({ message: 'Saving plan not found' });

        if (currentBalance !== undefined) {
            pot.currentBalance += currentBalance;
        } else {
            return res.status(400).json({ message: 'currentBalance is required' });
        }

        await pot.save();
        res.json({ message: 'Saving plan balance updated', pot });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

savingPlanRouter.get('/user/:userId/savingplan/:potId', async (req, res) => {
    const { userId, potId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(potId)) {
            return res.status(400).json({ message: 'Invalid user ID or pot ID' });
        }
        const user = await User.findById(userId).populate('pots');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const pot = user.pots.find(pot => pot._id.toString() === potId);
        if (!pot) {
            return res.status(404).json({ message: 'Saving plan not found' });
        }
        res.json(pot);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



savingPlanRouter.delete('/user/:userId/savingplan/:potId', async (req, res) => {
    const {potId, userId} = req.params;
    try {
        const user = await User.findById(userId);
        if(!user) res.status(404).send("user not found");
        const pot = await SavingPot.findById(potId);
        if (!pot) return res.status(404).json({ message: 'Saving plan not found' });
        await SavingPot.deleteOne({ _id: potId });
        user.pots = user.pots.filter(potId => potId.toString() !== pot._id.toString());
        await user.save();
        res.json({ message: 'Saving plan deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
});

export default savingPlanRouter;