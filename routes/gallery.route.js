const { galleryController } = require('../controllers/gallery.controllers');
const { Router } = require('express');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

router.get('/gallery', authMiddleware, galleryController.getGallery);
router.get('/gallery/:id', galleryController.getChildGallery);
router.post('/gallery', authMiddleware, galleryController.createGallery);
router.post('/gallery/upload/image', galleryController.addImage);
router.delete('/gallery/:id', authMiddleware, galleryController.deleteGallery);
router.post('/gallery/likes/:id', authMiddleware, galleryController.patchMeme);

module.exports = router;
