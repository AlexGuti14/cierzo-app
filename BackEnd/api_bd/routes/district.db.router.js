const express = require('express');
const router = express.Router();
const ctrlDistrict = require('../controllers/district.db.controller');



// district
router.post('/saveData', ctrlDistrict.saveData);

router.get('/data', ctrlDistrict.getRankingDB);
router.get('/data/:districtid', ctrlDistrict.getDistrictDB);

router.get('/stats', ctrlDistrict.stats);

router.get('/', ctrlDistrict.getRanking);
router.get('/:districtid', ctrlDistrict.getDistrict);


// valuation
router.get('/:districtid/valuation/myvaluation', ctrlDistrict.getmyValuation);
router.get('/:districtid/valuation', ctrlDistrict.getValuations);
router.post('/:districtid/valuation', ctrlDistrict.addValuation);
router.put('/:districtid/valuation', ctrlDistrict.updateValuation)
router.post('/', ctrlDistrict.districCreate);

module.exports = router;