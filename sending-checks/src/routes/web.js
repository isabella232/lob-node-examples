const express = require("express");
const router = express.Router();

// Controller Import
const checkController = require("../controllers/check.controller");

// Route Declaration
router.route("/")
  .get(checkController.createCheck)
  .post(checkController.createCheckPost);
 
router.route("/getCheck/:checkId")
  .get(checkController.getACheck);

router.route("/getChecks")
  .get(checkController.getChecks);

router.route("/cancelACheck/:checkId")
    .get(checkController.cancelACheck)

// Route Export
module.exports = router;
