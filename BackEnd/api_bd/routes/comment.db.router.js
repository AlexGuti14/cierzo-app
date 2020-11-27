const express = require('express');
const router = express.Router();
const ctrlComment = require('../controllers/comment.db.controller');



router.get('/:districtid/comment/:sort', ctrlComment.getComments);
router.post('/:districtid/comment', ctrlComment.createComment);
router.put('/:districtid/comment/:commentid', ctrlComment.valorateComment);
router.delete('/:districtid/comment/:commentid', ctrlComment.deleteComment);

router.put('/:districtid/comment/:commentid/1', ctrlComment.addLike);
router.put('/:districtid/comment/:commentid/0', ctrlComment.removeLike);

module.exports = router;