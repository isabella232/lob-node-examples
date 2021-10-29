import fetch from "node-fetch";
 
export default async function createTemplateHandler(req, res) {
   try {
       const htmlString = createHTMLTemplate(req.query);
       const params = new URLSearchParams();
      const templateName = req.query.templateName || new Date().toString();

       params.append("description", templateName);
       params.append("html", htmlString);

       await fetch("https://api.lob.com/v1/templates", {
       method: "POST",
       body: params,
       headers: {
           Authorization: `Basic ${Buffer.from(
           process.env.LOB_SECRET_API_KEY + ":"
           ).toString("base64")}`,
       },
       });

       res.send({ message: "Template created." });
   } catch (error) {
     res.send(error);
   }
 }


  
  function createHTMLTemplate({ logoText, description, backgroundImage }) {
    return `
      <html>
       <head>
       <meta charset="UTF-8">
       <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css">
       <title>4x6 Postcard Front</title>
       <style>
           *, *:before, *:after {
               -webkit-box-sizing: border-box;
               -moz-box-sizing: border-box;
               box-sizing: border-box;
           }
      
           @font-face {
               font-family: "Lato-Bold";
               src: url(https://s3.us-west-2.amazonaws.com/public.lob.com/solutions/Lob_demo_postcard_conversion/Retail+psc/4x6+Retail+Postcard/Document+fonts/Lato-Bold.ttf) format("truetype");
           }
      
           @font-face {
               font-family: "Lato-Light";
               src: url(https://s3.us-west-2.amazonaws.com/public.lob.com/solutions/Lob_demo_postcard_conversion/Retail+psc/4x6+Retail+Postcard/Document+fonts/Lato-Light.ttf) format("truetype");
           }
      
           @font-face {
               font-family: "Lato-Regular";
               src: url(https://s3.us-west-2.amazonaws.com/public.lob.com/solutions/Lob_demo_postcard_conversion/Retail+psc/4x6+Retail+Postcard/Document+fonts/Lato-Regular.ttf) format("truetype");
           }
      
           body {
               width: 6.25in;
               height: 4.25in;
               margin: 0;
               padding: 0;
               background-image: url(${backgroundImage});
               background-size: 6.25in 4.25in;
               background-repeat: no-repeat;
           }
      
           .header{
               position: absolute;
               width: 4.3232in;
               height: 1.8625in;
               left: 0.9138in;
               top: 0.2847in;
               font-size: 39.247pt;
               line-height: 35.804pt;
               font-family: "Lato-Light";
           }
          
           .logo{
               position: absolute;
               height: .4407in;
               right: 0.2in;
               top: 3.7072in;
               font-size: 24.787pt;
               line-height: 29.745pt;
               font-family: "Lato-Regular"
           }
      
           #safe-area {
               position: absolute;
               width: 5.875in;
               height: 3.875in;
               left: 0.1875in;
               top: 0.1875in;
               background-color: rgba(255,255,255,0.5);
           }
      
       </style>
       </head>
      
       <body>
           <div class="header">${description}</div>
           <div class="logo">${logoText}</div>
           <div id="safe-area">
            </div>
       </body>
      
       </html>
       `
   
  }
  