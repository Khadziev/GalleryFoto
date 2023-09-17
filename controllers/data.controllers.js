const Data = require('../models/Data.model');
const path = require('path');

module.exports.childController = {
  getChild: async (req, res) => {
    try {
      const todos = await Data.find({ user: req.user.id }).populate('user');
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  },

  getChildById: async (req, res) => {
    try {
      const child = await Data.findOne({
        _id: req.params.id,
        user: req.user.id,
      });
      if (!child) {
        return res.status(404).json({ message: 'Data not found' });
      }
      res.json(child);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  },

  createChild: async (req, res) => {
    const { name, image, age, gender } = req.body;
    try {
      const child = await Data.create({
        user: req.user.id,
        name,
        pathImages: image,
        age,
        gender,
      });
      const populatedChild = await Data.findById(child._id).populate('user');
      return res.json(populatedChild);
    } catch (error) {
      return res.status(401).json(error.toString());
    }
  },
  addImage: async (req, res) => {
    try {
      const img = req.files.image;
      const newFileName = `./image/${
        Math.random() * 10000000000000000
      }${path.extname(img.name)}`;

      img.mv(newFileName, async (err) => {
        if (err) {
          console.log(err);
        } else {
          res.json({
            success: 'file uploaded',
            image: newFileName,
          });
        }
      });
    } catch (e) {
      res.json(e);
    }
  },

  deleteChild: async (req, res) => {
    const { id } = req.params;
    const mentor = await Data.findByIdAndDelete(id);
    res.json('аккаунт удален');
  },
};
