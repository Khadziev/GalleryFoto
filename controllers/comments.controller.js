const Comment = require("../models/Comment.model");

module.exports.commentsController = {
    createComment: async (req, res) => {
        try {
            const { text } = req.body;
            const data = await Comment.create({
                text,
                userId: req.user.id,
                galleryId: req.params.id,
            });
            res.json(data);
        } catch (e) {
            res.json(e);
        }
    },

    getComments: async (req, res) => {
        try {
            const data = await Comment.find().populate("userId");
            console.log(data); // Добавьте эту строку
            res.json(data);
        } catch (e) {
            res.json(e);
        }
    },
    deleteComment: async (req, res) => {
        try {
            const data = await Comment.findByIdAndDelete(req.params.id);
            res.json(data);
        } catch (e) {
            res.json(e);
        }
    },
    editComment: async (req, res) => {
        try {
            const { text } = req.body;

            const data = await Comment.findByIdAndUpdate(req.params.id, {
                text,
            });
            res.json(data);
        } catch (e) {
            res.json(e);
        }
    },
    getCommentsByMeme: async (req, res) => {
        try {
            const data = await Comment.find({ galleryId: req.params.id });
            res.json(data);
        } catch (e) {
            res.json(e);
        }
    },
};
