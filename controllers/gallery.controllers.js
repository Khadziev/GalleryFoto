const Gallery = require("../models/Gallery.model");


module.exports.galleryController = {

    getGallery: async (req, res) => {
        const todos = await Gallery.find()
        res.json(todos)
    },

    createGallery: async (req, res) => {
        try {
            const event = await Gallery.create({
                name: req.body.name,
                imageURL:req.body.imageURL,
                description:req.body.description
            });
            res.json(event);
        } catch (e) {
            console.log(e.message);
        }
    },
    deleteGallery: async (req, res) => {
        const { id } = req.params;
        const mentor = await Gallery.findByIdAndDelete(id);
        res.json("аккаунт удален");
    },


}