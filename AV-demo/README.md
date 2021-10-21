# Bulk Address Verification with Postgres and Node 

This code sample outlines how to leverage Lob's Bulk Address Verification tool to validate the deliverability of addresses stored in a local Postgres database. 

Start off by cloning the repo to your preferred location and entering `lob-node-examples/AV-demo` 

To use this sample code, you'll need to install a handful of dependencies, including Lob, Express, psql and nodemon packages. We assume you already have node.js and npm installed.

`npm install lob`
`npm install express ejs`
`npm install nodemon --save-dev`
`npm install pg`
 

## Postgres Setup

Since this sample updates a local Postgres database, you'll need to set one up or access a pre-existing db. 

Open a new terminal and run the following command:  

`psql postgres`

Provide the password and press **Enter** by default there isn’t a password.

If you see postgres=# in your terminal, you have successfully logged in. 

Next, create the addresses table. Use the serial type to create an  [auto-incremented primary key](https://www.techiediaries.com/auto-increment-primary-key-postgresql/). The code is as follows:  

    CREATE TABLE addresses(
	    id SERIAL PRIMARY KEY,
	    name VARCHAR(100),
	    primary_line VARCHAR(100),
	    secondary_line VARCHAR(100),
	    city VARCHAR(100),
	    state VARCHAR(100),
	    zip_code INTEGER
    );

Next, let’s fill the table with some dummy records with both valid and invalid addresses. Use a  [public location](https://github.com/EthanRBrown/rrad)  for valid addresses without sensitive info. You can use the following SQL queries:


    insert into addresses (name, primary_line, secondary_line, state, city, zip_code)
    values ('P1','560 Penstock Drive','', 'CA', 'Grass Valley', '95945');

    insert into addresses (name, primary_line, secondary_line, state, city, zip_code)
    values ('P2','6007 Applegate Lane','', 'KY', 'Louisville', '40219');

    insert into addresses (name, primary_line, secondary_line, state, city, zip_code)
    values ('P3','150 Carter Street','','Manchester','CT',06040);

    insert into addresses (name, primary_line, secondary_line, state, city, zip_code)
    values ('P4','2721 Lindsay Avenue','','Louisville','KY',40206);

    insert into addresses (name, primary_line, secondary_line, state, city, zip_code)
    values ('P5','18 Densmore Drive','','Essex','VT',05452);

    insert into addresses (name, primary_line, secondary_line, state, city, zip_code)
    values ('P6','637 Britannia Drive','','Vallejo','CA',94591);

    insert into addresses (name, primary_line, secondary_line, state, city, zip_code)
    values ('P7','5601 West Crocus Drive','','Glendale','AZ',85306);

    insert into addresses (name, primary_line, secondary_line, state, city, zip_code)
    values ('P8','5403 Illinois Avenue','','Nashville','TN',37209);


## Update index.js

Navigate to lob-node-examples/AV-demo/index.js and update the following lines:

 - Line 3: Update `'<your api key here>'` with your Lob API key (more
   info on finding your API key
   [here](https://support.lob.com/hc/en-us/articles/115000094570-Where-are-my-API-Keys-))
 - Lines 100-104: Update to your db's credentials.


## Launch the App
From lob-node-examples/AV-demo, you can now start the app with the command: `npm start`

The webapp should display something like this:
![webapp render](https://assets-global.website-files.com/5e1e5c62fa3d44c96b4170a1/614a2c98408f47a814fe29ab_jQ3E3VNtV6jXeSwvQYYAB_3REFkKgBqCIKfFhrwejolBvDXSjR7na8R5RM_k74__QME-5h6xcV7kzSNkpy_Vleggv7ly90WZ0BA3NQBN7KUdik6OEKMIQiNd5MXy_Z_uHNQApbJm%3Ds0.png)


## Next Steps and Further Details
Now that you have a fully functioning bulk address verification webapp, you can import larger lists into the Postgres db to assess deliverability at scale.

For more information about how to build this sample code from scratch, please visit our blog post [here](https://www.lob.com/blog/bulk-address-verification-with-the-lob-api).
