const { childController } = require('../controllers/data.controllers');
const { Router } = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const router = Router();

router.get('/data', authMiddleware, childController.getChild);
router.get('/data/:id', authMiddleware, childController.getChildById);
router.post('/data', authMiddleware, childController.createChild);
router.post('/data/upload/image', childController.addImage);
router.delete('/data*/:id', childController.deleteChild);

module.exports = router;
