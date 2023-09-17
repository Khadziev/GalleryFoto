const Gallery = require('../models/Gallery.model');
const path = require('path');

module.exports.galleryController = {
  getGallery: async (req, res) => {
    try {
      const gallery = await Gallery.find();
      res.json(gallery);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
  },
  getChildGallery: async (req, res) => {
    const books = await Gallery.findById(req.params.id);
    res.json(books);
  },

  createGallery: async (req, res) => {
    try {
      const { name, image, description } = req.body;
      const userId = req.user.id; // Получаем идентификатор пользователя из аутентификационного токена

      const gallery = await Gallery.create({
        name,
        pathImages: image,
        description,
        likes: [],
        user: userId, // Сохраняем идентификатор пользователя в поле "user"
      });

      res.json(gallery);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: 'Ошибка сервера' });
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

  deleteGallery: async (req, res) => {
    const { id } = req.params;
    try {
      const books = await Gallery.findById(id);

      if (books.user.toString() === req.user.id) {
        await books.remove();
        return res.json(books);
      }

      return res.status(401).json('Ошибка, нет доступа');
    } catch (e) {
      return res.status(401).json('Ошибка ' + e.toString());
    }
  },

  patchMeme: async (req, res) => {
    try {
      const candidate = await Gallery.findOne({
        _id: req.params.id,
        likes: req.user.id,
      });
      if (candidate) {
        await Gallery.findByIdAndUpdate(req.params.id, {
          $pull: { likes: req.user.id },
        });
        return res
          .status(200)
          .json({ status: false, galleryId: req.params.id });
      } else {
        await Gallery.findByIdAndUpdate(req.params.id, {
          $push: { likes: req.user.id },
        });
        return res.status(200).json({ status: true, galleryId: req.params.id });
      }
    } catch (e) {
      res.status(401).json({ error: e.toString() });
    }
  },
};
