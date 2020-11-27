var express = require('express');
var jwt = require('express-jwt');
var router = express.Router();
const ctrlDistrict = require('../controllers/district.server.controller');
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
 *         type: integer
 *       createdOn:
 *         type: string
 *         format: date-time
 *       userId:
 *         type: string
 */


  /**
 * @swagger
 * definition:
 *   Valuation:
 *     properties:
 *       score:
 *         type: integer
 */

  /**
 * @swagger
 * definition:
 *   Stats:
 *     properties:
 *       nombre:
 *         type: string
 *       commentarios:
 *         type: integer
 *       valoraciones:
 *         type: integer
 *       visitas:
 *         type: integer
 */

/**
 * @swagger
 * definition:
 *   District:
 *     properties:
 *       name:
 *         type: string
 *       subjectScore:
 *         type: integer
 *       numScores:
 *         type: integer
 *       valuations:
 *         $ref: '#/definitions/Valuation'
 *       comments:
 *         $ref: '#/definitions/Comment'
 *       numAccess:
 *         type: integer
 *       banned:
 *         type: boolean
 *       admin:
 *         type: boolean 
 */

/**
 * @swagger
 * 
 * /district/{districtid}:
 *  get:
 *     tags: 
 *       - 'districts'
 *     summary: Return a district info
 *     description: Returns one district
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "districtid"
 *       in: query
 *       description: "Number of district to return"
 *       required: true
 *       type: "integer"
 *     responses:
 *       200:
 *         description: "successful operation" 
 *         schema:
 *           $ref: '#/definitions/District'
 *       400:
 *          description: "Error"
 */

 /**
 * @swagger
 * 
 * /district/externdata/{districtid}:
 *  get:
 *     tags: 
 *       - 'districts'
 *     summary: Return a district info from databases
 *     description: Returns one district
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "districtid"
 *       in: query
 *       description: "Number of district to return"
 *       required: true
 *       type: "integer"
 *     responses:
 *       200:
 *         description: "successful operation" 
 *         schema:
 *           $ref: '#/definitions/District'
 *       400:
 *          description: "Error"
 */

/**
 * @swagger
 *
 * /district:
 *  get:
 *     tags:
 *       - 'districts'
 *     summary: Return all the districts ordered by subject ranking position
 *     description: Returns all districts
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: "successful operation" 
 *         schema:
 *           type: "array"
 *           items:
 *             $ref: '#/definitions/District'
 *       400:
 *          description: "Error"
 * 
 * 
 */

 /**
 * @swagger
 *
 * /district/filter/{filterName}:
 *  get:
 *     tags:
 *       - 'districts'
 *     summary: Return all the districts ordered by mark according to the filter (general, conectividad, economia, cultura)
 *     description: Returns all districts
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "filterName"
 *       in: query
 *       description: "Name of the parameter values that need to be considered for filter"
 *       required: true
 *       type: "integer"
 *     responses:
 *       200:
 *         description: "successful operation" 
 *         schema:
 *           type: "array"
 *           items:
 *             $ref: '#/definitions/District'
 *       400:
 *          description: "Error"
 */

/**
 * @swagger
 * /district/{districtid}/valuation:
 *  get:
 *     tags:
 *       - 'valuations'
 *     summary: Get valuations to a district
 *     description: Get a reviews
 *     parameters:
 *     - name: "districtid"
 *       in: query
 *       description: "Number of the district"
 *       required: true
 *       type: "integer"
 *     responses:
 *       200:
 *         description: "successful operation" 
 *         schema:
 *           type: "array"
 *           items:
 *             type: integer
 *       400:
 *          description: "Error"
 *  post:
 *     tags:
 *       - 'valuations'
 *     summary: Adds a valuation to a district
 *     description: Adds a review
 *     parameters:
 *     - name: "districtid"
 *       in: query
 *       description: "Number of the district to add a valuation on"
 *       required: true
 *       type: "integer"
 *     - name: "body"
 *       in: body
 *       description: "valuation to add"
 *       required: true
 *       schema:
 *         $ref: '#/definitions/Valuation'
 *     responses:
 *       201:
 *         description: "Created" 
 *       400:
 *          description: "Error"
 */

 /**
 * @swagger
 *
 * /district/{districtid}/valuation:
 *  put:
 *     tags:
 *       - 'valuations'
 *     summary: Updates a district's review
 *     description: Updates a valuation
 *     parameters:
 *     - name: "districtid"
 *       in: query
 *       description: "Number of the district to add a valuation on"
 *       required: true
 *       type: "integer"
 *     - name: "body"
 *       in: body
 *       description: "valuation to update"
 *       required: true
 *       schema:
 *         $ref: '#/definitions/Valuation'
 *     responses:
 *       200:
 *         description: "Updated" 
 *       400:
 *          description: "Error"
 * 
  * /district/{districtid}/valuation/myvaluation:
 *  get:
 *     tags:
 *       - 'valuations'
 *     summary: Get user valuation to a district
 *     description: Get a reviews
 *     parameters:
 *     - name: "districtid"
 *       in: query
 *       description: "Number of the district"
 *       required: true
 *       type: "integer"
 *     responses:
 *       200:
 *         description: "successful operation" 
 *         schema:
 *          $ref: '#/definitions/Valuation'
 *       400:
 *          description: "Error"
 * 
 * /district/stats:
 *  get:
 *     tags:
 *       - 'districts'
 *     summary: Return stats districts info
 *     description: Returns all stats districts info
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: "successful operation" 
 *         schema:
 *           type: "array"
 *           items:
 *             $ref: '#/definitions/Stats'
 *       400:
 *          description: "Error"
 */

const checkIfAuthenticated = jwt({
	secret: config.secret
});

//district
router.get('/externdata/:districtid', checkIfAuthenticated, ctrlDistrict.getDistrictDB);

router.get('/stats', checkIfAuthenticated, ctrlDistrict.stats);

router.get('/', checkIfAuthenticated, ctrlDistrict.getRanking);
router.get('/:districtid', checkIfAuthenticated, ctrlDistrict.getDistrict);
router.get('/filter/:filterName', checkIfAuthenticated, ctrlDistrict.filter);

//valuation
router.get('/:districtid/valuation/myvaluation', checkIfAuthenticated, ctrlDistrict.getmyValuation);
router.get('/:districtid/valuation', checkIfAuthenticated, ctrlDistrict.getValuation);
router.post('/:districtid/valuation', checkIfAuthenticated, ctrlDistrict.addValuation);
router.put('/:districtid/valuation', checkIfAuthenticated, ctrlDistrict.updateValuation)

module.exports = router;