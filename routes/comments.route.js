const { Router } = require("express");

const { commentsController } = require("../controllers/comments.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.post("/gallery/:id", authMiddleware, commentsController.createComment);
router.get("/", commentsController.getComments);
router.get("/gallery/:id", authMiddleware, commentsController.getCommentsByMeme);
router.delete("/:id", authMiddleware, commentsController.deleteComment);
router.patch("/gallery/:id", authMiddleware, commentsController.editComment);

module.exports = router;
