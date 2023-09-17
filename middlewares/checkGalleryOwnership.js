const Gallery =  ('../models/gallery.model')

exports.checkGalleryOwnership = async (req, res, next) => {
    try {
        const galleryId = req.params.id;
        const gallery = await Gallery.findById(galleryId);

        if (!gallery) {
            return res.status(404).json({ message: 'Фото не найдено' });
        }

        if (gallery.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Вы не можете удалить это фото, так как вы не являетесь его создателем' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
};

