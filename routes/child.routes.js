const { childController } = require("../controllers/child.controllers");
const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const router = Router();

router.get("/child", childController.getChild);
router.get("/child/:id", authMiddleware, childController.getChildById);
router.post('/child/:id', authMiddleware, childController.createChild)
router.delete('/child/:id',  childController.deleteChild)




module.exports = router