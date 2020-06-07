const path = require('path');
const express = require('express');


const mainController = require('../controllers/mainController');

const router = express.Router();

// page 1: home page
router.get('/', mainController.getHomePage);


// demo page
router.get('/demo', mainController.getDemoPage);

// tutorial page
router.get('/tutorial', mainController.getTutorialPage);

// // page 2: 
router.get('/install', mainController.getInstall);

// page 3: 
router.get('/conclusion', mainController.getConclusion);

// page 4: 
router.get('/credits', mainController.getCredits);

// page 5: 
router.get('/whybulma', mainController.getWhyBulma);

// page 6: 
router.get('/whynodejs', mainController.getWhyNodeJs);

module.exports = router;
