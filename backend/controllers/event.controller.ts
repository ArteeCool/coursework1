import mongoose from "mongoose";
import SportEvent from "../schemas/event.schema.ts";
import type { SportEventType } from "../schemas/event.schema.ts";

export const getEvents = async (req, res) => {
  try {
    const events = await SportEvent.find({});
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    console.log("error in fetching events:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createEvent = async (req, res) => {
  const event: SportEventType = req.body;

  if (!event.name || !event.startsAt || !event.endsAt) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newEvent = new SportEvent(event);

  try {
    await newEvent.save();
    res.status(201).json({ success: true, data: newEvent });
  } catch (error) {
    console.error("Error in Create event:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;

  const event = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Event Id" });
  }

  try {
    const updatedEvent = await SportEvent.findByIdAndUpdate(id, event, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedEvent });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    await SportEvent.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Event deleted" });
  } catch (error) {
    console.log("error in deleting product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
