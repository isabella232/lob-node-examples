import L from "lob";
 
export default async function cancelPostcard(req, res) {
 const Lob = L(process.env.LOB_SECRET_API_KEY);
 const id = req.params.id;
 Lob.postcards.delete(id, function (err, response) {
   if (err) {
       return res.status(err.status_code || 500).send({
           success: false,
           error_message:
             err?._response?.body?.error?.message ||
             err.message ||
             "Unknown error.",
         });
   } else {
       res.send(response);
   }
 });
}
