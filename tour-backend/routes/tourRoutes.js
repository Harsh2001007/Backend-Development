const express = require("express");
const tourController = require("../controllers/tourController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/top-5-cheap")
  .get(tourController.aliasTopTour, tourController.getAllTour);

router.route("/tour-stats").get(tourController.getTourStats);
router.route("/tour-two-stats").get(tourController.getTourStatsPartTwo);
router.route("/monthly-plan/:year").get(tourController.getMonthlyPlan);

router
  .route("/")
  .get(authController.protect, tourController.getAllTour)
  .post(tourController.postTour);
router
  .route("/:id")
  .get(tourController.getParticularTour)
  .delete(tourController.deleteParticularTour)
  .patch(tourController.updateTour);

module.exports = router;
