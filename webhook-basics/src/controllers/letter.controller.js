import dotenv from 'dotenv';
dotenv.config();
const Lob = require('lob')(process.env.LOB_API_KEY);
import Letter from "../models/letter"



/*
 * GET / route to show the createLetter form.
 */
function createLetter(req, res) {
  // Catch any response on the url
  let response = req.query.response
  res.render('index', { response })
}

/*
 * POST / route to process the letters.
 */
function createLetterPost(req, res) {
 
  const myStory = req.body.story
  // Create the address
  Lob.addresses.create({
    name: 'Robin Joseph',
    email: 'test@gmail.com',
    phone: '123456789',
    address_line1: '210 King St',
    address_city: 'San Francisco',
    address_state: 'CA',
    address_zip: '94107',
    address_country: 'US'
  })
    .then((address) => {
      return Lob.letters.create({
        description: 'My First Letter',
        to: address.id,
        from: {
          name: 'Test Person',
          address_line1: '220 South Michigan Avenue',
          address_city: 'Chicago',
          address_state: 'IL',
          address_zip: '60604',
          address_country: 'US'
        },
        file: '<html style="padding-top: 3in; margin: .5in;">{{story}}</html>',
        merge_variables: {
              story: myStory
        },
        color: true
      });
    })
    .then((letter) => {
      const { id, ...otherProperties } = letter;
      Letter.create({ letterId: id, ...otherProperties })
      res.redirect('/?response=Your letter was successfully sent')
    })
    .catch((err) => {
      console.log(err);
    });

}


/*
 * GET / route to get created letters.
 */
function getLetters(req, res) {

  Lob.letters.list({ limit: 50 }, function (err, response) {
    const letters = response.data
    res.render('letters', { letters })
  });

}

/*
 * GET / route to get a letter.
 */
function getALetter(req, res) {

  const letterId = req.params.letterId
  Lob.letters.retrieve(letterId, function (err, response) {
    const letter = response
    res.render('letter', { letter })
  });

}

//export all the functions
module.exports = { createLetter, createLetterPost, getLetters, getALetter };
