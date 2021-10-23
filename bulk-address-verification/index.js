// Require the express and path modules

const Lob = require('lob')('<your api key here>');
const express = require('express')
const path = require('path')

// Create the Express application 

const app = express()
const port = 3000

// Set up static files folder and the HTML engine
 
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Query the addresses table and render the results in the HTML file

app.get('/', (request, response, next) => {
  pool.query('SELECT * FROM addresses ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }

    /* Use the Array.map() method to remove the id and name attributes from the objects of the results */

    const addresses = results.rows.map(e => {

      return Object.keys(e).reduce((object, key) => {
        if (key !== "name" && key !== "id") {
          object[key] = e[key]
        }
        return object
      }, {});
    });

    // Call the Lob API to verify the passed addresses in bulk

    Lob.bulkUSVerifications.verify({
      addresses: addresses
    }, function (err, res) {
      console.log(err, res);
      if (!err) {
        let i = 0;
        let invalid = 0;

        // Add the status and full_address attributes to the results
        const lob_addresses = results.rows.map((e) => {
          const response_addr = res.addresses[i];
          switch (response_addr.deliverability) {
            case 'deliverable':
              e["action"] = "No action";
              break;
            case 'deliverable_unnecessary_unit':
              e["action"] = "Needs to be updated";
              break;
            case 'deliverable_incorrect_unit':
              e["action"] = "Needs to be corrected";
              break;
            case 'deliverable_missing_unit':
              e["action"] = "Needs to be manually reviewed";
              break;
            case 'undeliverable':
              e["action"] = "Remove from the database";
              invalid++;
              break;
          }
      
          // Add the deliverability status

          e["status"] = response_addr.deliverability;

          /* Use the primary_line, secondary_line and last_line of the returned Lob address to display the address to the user */

          e["full_address"] = `${response_addr.primary_line} ${response_addr.secondary_line} ${response_addr.last_line}`;
          i++;
          return e;
        })

      /* Return the response that contains the HTML file with the scanned addresses and the valid and invalid counts */
    
      response.render(path.join(__dirname, '/public', 'main.html'), { addresses: lob_addresses, scanned: res.addresses.length, valid: res.addresses.length - invalid, invalid: invalid });
      }
    });
  })
})

// Start listening on port 3000 

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

// Require the pg module  
const Pool = require('pg').Pool

// Create a Pool instance and connect to the database 
// Your Database name is probably "postgres"
// Your user name is probably your username on your computer
// Your password by default is blank
const pool = new Pool({
  user: '<YOUR DATABASE USER NAME>',
  host: 'localhost',
  database: '<YOUR DATABASE NAME',
  password: '<YOUR DATABASE PASSWORD>',
  port: 5432,
})

