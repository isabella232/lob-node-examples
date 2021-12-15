const express = require("express");
const router = express.Router();

// Controller Import
const letterController = require("../controllers/letter.controller");
const webhookController = require("../controllers/webhook.controller");

// Route Declaration
router.route("/")
  .get(letterController.createLetter)
  .post(letterController.createLetterPost);
 
router.route("/getLetter/:letterId")
  .get(letterController.getALetter);

router.route("/getLetters")
  .get(letterController.getLetters);

router.route("/processWebhookEvent")
  .post(webhookController.processWebhookEventPost);

// Route Export
module.exports = router;
