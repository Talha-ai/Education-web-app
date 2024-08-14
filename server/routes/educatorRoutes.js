const express = require('express');
const router = express.Router();
const { coursesEdu, updateEdu, deleteEdu, getEducatorName } = require('../controllers/eduControllers')

router.get('/:educatorId/dashboard', coursesEdu);

router.get('/:educatorId/update', updateEdu);

router.get('/:educatorId/delete', deleteEdu);

router.get('/:educatorId/profile', getEducatorName);

module.exports = router;
