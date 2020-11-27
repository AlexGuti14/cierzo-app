var express = require('express');
var jwt = require('express-jwt');
var router = express.Router();
const ctrlComment = require('../controllers/comment.server.controller');
const logger = require('../../config/winston.log').logger;
var config = require('../../api_bd/models/db');


/**
 * @swagger
 * definition:
 *   Comment:
 *     properties:
 *       text:
 *         type: string
 *       likes:
 *         type: Number
 *       createdOn:
 *         type: string
 *         format: date-time
 *       username:
 *         type: string
 *       userId:
 *         type: string
 *       email:
 *         type: string
 *       likesids:
 *         type: array
 */

/**
 * @swagger
 * 
 * /comment/{districtid}/comment/{sort}:
 *  get:
 *     tags: 
 *       - 'comments'
 *     summary: Return sort district comments  
 *     description: Returns sort district comments
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "districtid"
 *       in: query
 *       description: "Name of district to return"
 *       required: true
 *       type: "integer"
 *     - name: "sort"
 *       in: query
 *       description: "Sort by likes(0) or date(1)"
 *       required: true
 *       type: "integer"
 *     responses:
 *       200:
 *         description: "successful operation" 
 *         schema:
 *           type: "array"
 *           items:
 *           	$ref: '#/definitions/Comment'
 *       400:
 *          description: "Error"
 * 
 * /comment/{districtid}/comment: 
 *   post:
 *     tags: 
 *       - 'comments'
 *     summary: Add new comment in district
 *     description: Add one comment in district
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "districtid"
 *       in: query
 *       description: "Name of district to return"
 *       required: true
 *       type: "integer"
 *     - name: "body"
 *       in: body
 *       description: Comment object that needs to be added to the db
 *       required: true
 *       schema: 
 *           $ref: '#/definitions/Comment'
 *     responses:
 *       201:
 *         description: "Created" 
 *       400:
 *          description: "Error"
 * 
 * /comment/{districtid}/comment/{commentid}:
 *   put:
 *     tags: 
 *       - 'comments'
 *     summary: Modify comment info adding a like
 *     description: Modify one Comment
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "districtid"
 *       in: query
 *       description: "ID of district to return"
 *       required: true
 *       type: "integer"
 *     - name: "commentid"
 *       in: query
 *       description: "ID of commentid to update"
 *       required: true
 *       type: "integer"
 *     - name: "body"
 *       in: body
 *       description: Comment object that needs to be added to the db
 *       required: true
 *       schema: 
 *           $ref: '#/definitions/Comment'
 *     responses:
 *       200:
 *         description: "Modified"
 *       400:
 *          description: "Error"
 *   delete:
 *     tags: 
 *       - 'comments'
 *     summary: Delete comment
 *     description: Delete one comment
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "districtid"
 *       in: query
 *       description: "ID of district to return"
 *       required: true
 *       type: "integer"
 *     - name: "commentId"
 *       in: query
 *       description: "ID of comment to delete"
 *       required: true
 *       type: "string"
 *     responses:
 *       204:
 *         description: "Deleted" 
 *       400:
 *          description: "Error"
 * 
 */

const checkIfAuthenticated = jwt({
	secret: config.secret
});


router.get('/:districtid/comment/:sort', checkIfAuthenticated, ctrlComment.getComments);
router.post('/:districtid/comment', checkIfAuthenticated, ctrlComment.createComment);
router.put('/:districtid/comment/:commentid', checkIfAuthenticated, ctrlComment.valorateComment);
router.delete('/:districtid/comment/:commentid', checkIfAuthenticated, ctrlComment.deleteComment);

router.put('/:districtid/comment/:commentid/1', checkIfAuthenticated, ctrlComment.addLike);
router.put('/:districtid/comment/:commentid/0', checkIfAuthenticated, ctrlComment.removeLike);

module.exports = router;