import mongoose from "mongoose";

const schema = new mongoose.Schema({
  stripe_invoice: {
    type: String,
    required: true,
  },
  stripe_payment_id: {
    type: String,
    required: true,
  },
  stripe_subscription_id: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
 
export const Subscription = mongoose.model("Payment", schema);  
