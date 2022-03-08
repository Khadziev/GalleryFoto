const Child = require("../models/Child.model");


module.exports.childController = {

    getChild: async (req, res) => {
        const todos = await Child.find().populate("user");
        res.json(todos)

    },

    getChildById: async (req, res) => {
        const books = await Child.findById(req.params.id).populate("user");
        res.json(books);
    },

    createChild: async (req, res) => {
        const {name, imageURL, age, gender} = req.body;
        const {id} = req.params;
        try {
            const child = await Child.create({
                    user: req.user.id,
                    name,
                    imageURL,
                    age,
                    gender,
        });
            const review = await Child.findById(child._id);
            return res.json(review);
        } catch (e) {
            return res.status(401).json(e.toString());
        }
    },



    deleteChild: async (req, res) => {
        const { id } = req.params;
        const mentor = await Child.findByIdAndDelete(id);
        res.json("аккаунт удален");
    },

};


