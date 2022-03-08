const { galleryController } = require("../controllers/gallery.controllers");
const { Router } = require("express");

const router = Router();

router.get("/gallery", galleryController.getGallery);
router.post('/gallery', galleryController.createGallery)
router.delete('/gallery/:id',  galleryController.deleteGallery)




module.exports = router