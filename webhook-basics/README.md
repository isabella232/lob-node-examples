# Webhook basics with Node and MongoDB

## Overview
This code demonstrates how to leverage Lob's webhooks. The app allows you to create a Letter, save the results locally in MongoDB, then receive and process any related webhooks for the letter.

For a step by step explaination of how we built this project - checkout the companion blog post. - Coming Soon.

## Prerequisites
To proceed you need the following installed on your local machine: 

* [Node.js](https://nodejs.org/)
* [Ngrok](https://ngrok.com/download)
* [MongoDB](https://www.mongodb.com/try/download/community)

You’ll also need to have a basic understanding of Node.js and ES6 syntax. Make sure you’re signed up for your [free Lob account](https://dashboard.lob.com/#/register), which has a quick registration.

## Install packages 
Start off by cloning the repo to your preferred location and entering `lob-node-examples/webhook-basics` 

To run this code, you'll need to install a handful of dependencies, We assume you already have node.js and npm installed.

All dependencies are setup in `package.json`

Navigate to the webhook-basics directory and install the following packages using the npm install command in your CLI, as shown in this code snippet:

`npm install express mongoose cors hbs path lob dotenv`

Since we’ll be using ES6 in the application, we’ll also need some Babel packages to transpile our code to plain ES5 JavaScript. We install them as dev dependencies using the following command:

`npm install @babel/cli @babel/core @babel/node @babel/preset-env --save-dev`

## Configure Lob API keys
For this project we’ll use environment variables to securely store our API keys.  In the root of your project create a new file .env

`touch .env`

Open the .env file and add your API keys.

LOB_API_KEY = test_6b2fXXXXXXXXXXXXXXXXXbd3586

## Test Lob webhooks
To quickly test out Lob webhooks, we will use ngrok. This tool generates a unique URL that lets us receive webhooks locally by creating a tunnel between our application and the internet. Using ngrok, we expose our local web server to the internet and receive Lob webhooks without having to deploy our application on a live server.

Download and install the ngrok software compatible with your operating system.

After downloading ngrok to your local machine, run the installation file to open the ngrok terminal. Then, expose our application port to the internet using the following ngrok command:

`ngrok http 3500`

## Configure webhooks in Lob
Then, on the Lob dashboard, open the Webhooks menu on the sidebar.  Note the Test/Live toggle, located at the top of the webhooks menu page.

Next, select the Create button to create a new webhook record, 

Fill the webhook URL creation form with the appropriate details and paste the URL from your clipboard into the URL field. In the example screenshot above, our complete webhook URL is  “https://bf39-2c0f-f5c0-440-4c4-7c06-9959-5706-1db0.ngrok.io/processWebhookEvent”.

Next, select which events you want to trigger the webhook, and select the Create button to finish. The following screenshot illustrates part of the creation process in the webhook creation form:

We’ve configured the application controllers and added a webhook URL to Lob. Now let’s try to send a webhook to our application 

## Start the app

In the terminal start your application with the command:

`npm run start-dev`

In the Lob dashboard, go to the new webhook you created and click the debugger button to access the Webhooks Debugger view.

Clicking the send button will trigger an example webhook event to your application via ngrok.

If we did everything correctly, we’ll receive events from Lob on our local machine, as shown on the console in the screenshot below:

