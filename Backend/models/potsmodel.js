import mongoose from "mongoose";

const savingPotSchema = new mongoose.Schema({
    potname: { type: String, required: true }, 
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    balance: { type: Number, default: 0 }, 
    target:{type: Number , required:false },
  }, { timestamps: true });
  
  const SavingPot = mongoose.model('pots', savingPotSchema);
export default SavingPot;
  