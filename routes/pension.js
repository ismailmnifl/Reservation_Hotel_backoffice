const express = require('express');
const router = express.Router();

const pensionController = require('../app/controllers/pensions');

router.route('/')
    .get(pensionController.getAllPensions)
    .post(pensionController.newPension);

router.route('/:pensionId')
    .patch(pensionController.updatePension)
    .delete(pensionController.deletePension);



module.exports = router;