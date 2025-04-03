import mongoose from "mongoose";

export type SportEventType = {
  name: string;
  startsAt: string;
  endsAt: string;
};

const sportEventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    startsAt: {
      type: String,
      required: true,
    },
    endsAt: {
      type: String,
      required: true,
    },
    results: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

const SportEvent = mongoose.model("SportEvent", sportEventSchema);

export default SportEvent;
