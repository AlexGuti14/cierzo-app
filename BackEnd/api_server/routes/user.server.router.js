var express = require('express');
var jwt = require('express-jwt');
var router = express.Router();
const ctrlUsers = require('../controllers/user.server.controller');
var config = require('../../api_bd/models/db');


/**
 * @swagger
 * definition:
 *   User:
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 */

 /**
 * @swagger
 * definition:
 *   UserLogin:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 */

 /**
 * @swagger
 * definition:
 *   StatUser:
 *     properties:
 *       usuarios:
 *         type: integer
 *       admins:
 *         type: integer
 *       banned:
 *         type: integer
 *       logins:
 *         type: integer
 */


/**
 * @swagger
 * definition:
 *   UserInfo:
 *     properties:
 *       userid:
 *         type: string
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       logins:
 *         type: integer
 *       lastLoginOn:
 *         type: string
 *         format: date-time
 *       createdOn:
 *         type: string
 *         format: date-time
 *       banned:
 *         type: boolean
 *       admin:
 *         type: boolean
 */

/**
 * @swagger
 * /user:
 *  get:
 *     tags: 
 *       - 'users'
 *     summary: Return user info
 *     description: Returns one user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: "successful operation" 
 *         schema:
 *           $ref: '#/definitions/UserInfo'
 *       400:
 *          description: "Error"
 *  post:
 *     security: []
 *     tags: 
 *       - 'users'
 *     summary: Add new user
 *     description: Add one user
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "body"
 *       in: body
 *       description: User object that needs to be added to the db
 *       required: true
 *       schema: 
 *           $ref: '#/definitions/User'
 *     responses:
 *       201:
 *         description: "Created" 
 *       400:
 *          description: "Error"
 * /user/login:
 *  post:
 *     security: []
 *     tags: 
 *       - 'users'
 *     summary: Validate user
 *     description: Validate user
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "body"
 *       in: body
 *       description: User object that needs to be validate
 *       required: true
 *       schema: 
 *           $ref: '#/definitions/UserLogin'
 *     responses:
 *       200:
 *         description: "Login" 
 *       400:
 *          description: "Error"
 * /user/{userid}:
 *   put:
 *     tags: 
 *       - 'users'
 *     summary: Modify user info
 *     description: Modify one user
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "userId"
 *       in: query
 *       description: "ID of user to return"
 *       required: true
 *       type: "string"
 *     - name: "body"
 *       in: body
 *       description: User object that needs to be added to the db
 *       required: true
 *       schema: 
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: "Modified"
 *       400:
 *          description: "Error"
 *   delete:
 *     tags: 
 *       - 'users'
 *     summary: Delete user
 *     description: Delete one user
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "userId"
 *       in: query
 *       description: "ID of user to return"
 *       required: true
 *       type: "string"
 *     responses:
 *       204:
 *         description: "Deleted" 
 *       400:
 *          description: "Error"
 * 
 * /user/users:
 *  get:
 *     tags: 
 *       - 'users'
 *     summary: Return all users info
 *     description: Returns all user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: "successful operation" 
 *         schema:
 *           $ref: '#/definitions/UserInfo'
 *       400:
 *          description: "Error"
 * 
 * /user/ban:
 *  get:
 *     tags: 
 *       - 'users'
 *     summary: Return banned users info
 *     description: Returns banned users info
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: "successful operation" 
 *         schema:
 *           $ref: '#/definitions/UserInfo'
 *       400:
 *          description: "Error"
 * 
 * /user/ban/{userid}:
 *  put:
 *     tags: 
 *       - 'users'
 *     summary: Ban user
 *     description: Ban one user, don't allow put comments
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "userId"
 *       in: query
 *       description: "ID of user to return"
 *       required: true
 *       type: "string"
 *     responses:
 *       200:
 *         description: "Banned" 
 *       400:
 *          description: "Error"
 * 
 * /user/unban/{userid}:
 *  put:
 *     tags: 
 *       - 'users'
 *     summary: Allow put comments
 *     description: Allow put comments
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "userId"
 *       in: query
 *       description: "ID of user to return"
 *       required: true
 *       type: "string"
 *     responses:
 *       200:
 *         description: "Unbanned" 
 *       400:
 *          description: "Error"
 * 
 * /user/stats:
 *  get:
 *     tags: 
 *       - 'users'
 *     summary: Return stats users info
 *     description: Returns stats users info
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: "successful operation" 
 *         schema:
 *           $ref: '#/definitions/StatUser'
 *       400:
 *          description: "Error"
 */

const checkIfAuthenticated = jwt({
	secret: config.secret
});


router.post('/login', ctrlUsers.login);//aqui coco
router.get('/loginGoogle', ctrlUsers.loginGoogle);//aqui coco
router.post('/signup', ctrlUsers.signup);//aqui coco

router.post('/', ctrlUsers.signup);
router.get('/', checkIfAuthenticated, ctrlUsers.readUser);
router.delete('/:userid', checkIfAuthenticated, ctrlUsers.deleteUser);
router.put('/:userid', checkIfAuthenticated, ctrlUsers.updateUser);

router.get('/users', checkIfAuthenticated, ctrlUsers.getUsers);

router.get('/ban', checkIfAuthenticated, ctrlUsers.getUsersBanned);
router.put('/ban/:userid', checkIfAuthenticated, ctrlUsers.banearUser);
router.put('/unban/:userid', checkIfAuthenticated, ctrlUsers.unbanearUser);

router.get('/stats', checkIfAuthenticated, ctrlUsers.numUsers);

module.exports = router;
