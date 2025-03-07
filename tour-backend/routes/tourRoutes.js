const express = require("express");
const tourController = require("../controllers/tourController");

const router = express.Router();

router.route("/").get(tourController.getAllTour).post(tourController.postTour);
router
  .route("/:id")
  .get(tourController.getParticularTour)
  .delete(tourController.deleteParticularTour)
  .patch(tourController.updateTour);

module.exports = router;
