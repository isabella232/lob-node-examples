const Letter = require('../models/letter');

/*
 * POST /processWebhookEvent to process events and perform actions based on response.
 */
async function processWebhookEventPost(req, res) {
  const { id, body, reference_id, event_type, date_created, object } = req.body;
  const letterId = body.id;
  const letter = await Letter.findOne({ letterId });

  if (letter) {
    letter.event_id = id;
    letter.event_type = event_type;
    letter.reference_id = reference_id;
    letter.save();
  }

  if (event_type.id == "letter.certified.delivered") {
    let currentTime = new Date();
    currentTime.setDate(currentTime.getDate() + 14);
    await ScheduleFollowUpLetter(body.from.id, currentTime);
    await SendNotificationLetter(body.to.id);
  }

  if (event_type.id == "letter.in_local_area") {
    await SendNotificationLetter(body.to.id);
  }

  if (event_type.id == "letter.returned_to_sender") {
    await SendNotificationLetter(body.from.id);
  }

  console.log("Webhook received and processed")

}

function ScheduleFollowUpLetter(address, delivery_date) {
  Lob.letters.create({
    description: 'Demo Letter Schedule',
    to: {
      name: 'Demo Tester',
      address_line1: '210 King St',
      address_line2: '# 6100',
      address_city: 'San Francisco',
      address_state: 'CA',
      address_zip: '94107'
    },
    from: address,
    file: '<html style="padding-top: 3in; margin: .5in;">A Sample Scheduled Letter for {{name}}</html>',
    merge_variables: {
      name: 'Harry Zhang'
    },
    color: true,
    send_date: delivery_date
  }).then((letter) => {
    return letter
  })
    .catch((error) => {
      console.log(error)
    })
}

function SendNotificationLetter(address) {
  Lob.letters.create({
    description: 'Demo Notification Letter',
    to: {
      name: 'Demo Tester',
      address_line1: '210 King St',
      address_line2: '# 6100',
      address_city: 'San Francisco',
      address_state: 'CA',
      address_zip: '94107'
    },
    from: address,
    file: '<html style="padding-top: 3in; margin: .5in;">A sample reminder letter form {{name}}</html>',
    merge_variables: {
      name: 'Leore Avidar'
    },
    color: true,
  }).then((letter) => {
    return letter
  })
    .catch((error) => {
      console.log(error)
    })
}
 
//export all the functions
module.exports = { processWebhookEventPost };
