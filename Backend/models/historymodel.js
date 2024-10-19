import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  email: { type: String, required: true }, 
  type: { type: String, enum: ['deposit', 'transfer','closing_pot'], required: true }, 
  amount: { type: Number, required: true }, 
  from: { type: String, enum: ['wallet', 'saving_pot'], required: true }, 
  to: { type: String, enum: ['wallet', 'saving_pot'], required: true }, 
  potId: { type: mongoose.Schema.Types.ObjectId, ref: 'pots', required: true }, 
  date: { type: Date, default: Date.now }, 
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
