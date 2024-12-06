const Slot = require("../models/AvailableSlots");

const createSlot = async (req, res) => {
    try {
        const { packageId, packageName, date, slots } = req.body;

        const existingSlot = await Slot.findOne({ date });

        if (existingSlot) {
            existingSlot.slots = [];
            existingSlot.packageId = packageId;
            existingSlot.packageName = packageName;
            existingSlot.slots = slots;
            await existingSlot.save();
            return res.status(200).json({ message: "Slots updated successfully." });
        }

        const newSlot = new Slot({
            packageId,
            packageName,
            date,
            slots,
        });

        await newSlot.save();

        res.status(201).json({ message: "Slot created successfully", data: newSlot });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllSlots = async (req, res) => {
    try {
        const slots = await Slot.find();
        res.status(200).json(slots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSlotById = async (req, res) => {
    try {
        const slot = await Slot.findById(req.params.id);
        if (!slot) return res.status(404).json({ message: "Slot not found" });
        res.status(200).json(slot);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateSlot = async (req, res) => {
    try {
        const slot = await Slot.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!slot) return res.status(404).json({ message: "Slot not found" });
        res.status(200).json({ message: "Slot updated successfully", data: slot });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSlotsByDate = async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) {
            return res.status(400).json({ message: "Date query parameter is required" });
        }

        const slots = await Slot.find({ date: new Date(date) });
        if (slots.length === 0) {
            return res.status(404).json({ message: "No slots found for the given date" });
        }

        res.status(200).json(slots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteSlot = async (req, res) => {
    try {
        const slot = await Slot.findByIdAndDelete(req.params.id);
        if (!slot) return res.status(404).json({ message: "Slot not found" });
        res.status(200).json({ message: "Slot deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createSlot, getAllSlots, getSlotById, updateSlot, getSlotsByDate, deleteSlot };
