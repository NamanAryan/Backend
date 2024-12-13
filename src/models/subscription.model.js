import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId, // one who is subscribing
      ref: "User", // Reference to the User model for the subscriber
      required: true, // Make sure this is always required
    },
    channel: {
      type: Schema.Types.ObjectId, // one to whom the subscriber is subscribing
      ref: "User", // Reference to the User model for the channel
      required: true, // Make sure this is always required
    },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
