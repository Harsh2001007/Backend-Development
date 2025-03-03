const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.postTour);
router
  .route('/:id')
  .get(tourController.getParticularTour)
  .patch(tourController.patchTour)
  .delete(tourController.deleteTour);

module.exports = router;
