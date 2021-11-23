import L from "lob";

export default async function createPostcard(req, res) {
  const Lob = L(process.env.LOB_SECRET_API_KEY);
  const { toAddress, fromAddress, frontTemplate, backTemplate, description } = req.body;
 
Lob.postcards.create(
   {
       description: description,
       to: toAddress,
       from: fromAddress,
       front: frontTemplate,
       back: backTemplate,
   },
   function (err, postcard) {
       if (err) {
           return res.status(err.status_code || 500).send({
               success: false,
               error_message:
                   err?._response?.body?.error?.message ||
                   err.message ||
                   "Unknown error.",
               });     
       } else {
           res.send({ success: true, postcard: postcard});
       }
   })   

}
