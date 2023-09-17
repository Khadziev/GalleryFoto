const { Router } = require('express');
const { commentsController } = require('../controllers/comments.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

router.post(
  '/comments/gallery/:id',
  authMiddleware,
  commentsController.createComment
);
router.get('/comments/gallery', authMiddleware, commentsController.getComments);
router.get(
  '/comments/gallery/:id',
  authMiddleware,
  commentsController.getCommentsByMeme
);
router.delete(
  '/comments/:id',
  authMiddleware,
  commentsController.deleteComment
);
router.patch(
  '/comments/gallery/:id',
  authMiddleware,
  commentsController.editComment
);

module.exports = router;
