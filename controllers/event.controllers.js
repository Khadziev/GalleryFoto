const Event = require('../models/Event.model');
const Child = require("../models/Child.model");

module.exports.eventController = {
    getEvent: async (req, res) => {
        try {
            const event = await Event.find().populate('child')

            return res.json(event);
        } catch (e) {
            return res.status(400).json({
                error: e.toString(),
            });
        }
    },

    getEventById: async (req, res) => {
        const {text} = req.body;
        const {id} = req.params;
        try {
            const created = await Event.create({
                user: req.user.id,
                text,
            });
            const review = await Event.findById(created._id).populate("user");
            return res.json(review);
        } catch (e) {
            return res.status(401).json(e.toString());
        }
    },

    createEvent: async (req, res) => {
        const {text} = req.body;
        const {id} = req.params;
        try {
            const created = await Event.create({
                user: req.user.id,
                text,
                child: req.params.id,
            });
            const review = await Event.findById(created._id).populate("user");
            return res.json(review);
        } catch (e) {
            return res.status(401).json(e.toString());
        }
    },

    deleteEvent: async (req, res) => {
        const { id } = req.params;
        const mentor = await Event.findByIdAndDelete(id);
        res.json("удален");
    },
}