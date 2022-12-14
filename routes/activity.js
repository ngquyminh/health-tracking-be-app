const express = require("express");
const activityCtrl = require("../controllers/activity.controller");

const router = express.Router();

router.get("/get", activityCtrl.getActivityById);
router.get("/getByType", activityCtrl.getUserActivitiesByType);
router.get("/getAll", activityCtrl.getUserActivities);
router.get(
  "/getByTypeInTimeInterval",
  activityCtrl.getActivitiesInTimeInterval
);
router.post("/add", activityCtrl.addActivity);
router.put("/edit", activityCtrl.editActivity);

module.exports = router;
