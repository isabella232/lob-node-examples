import L from "lob";
export default async function listPostcards(req, res) {
   const Lob = L(process.env.LOB_SECRET_API_KEY);
   Lob.postcards.list(
       {
           limit: 50,
       },
       function (err, data) {
           if (err) {
               return res.status(err.status_code || 500).send({
                   success: false,
                   error_message:
                       err?._response?.body?.error?.message ||
                       err.message ||
                       "Unknown error.",
                   });    
           } else {
               console.log(data.data)
               res.send({ success: true, postcards: data.data, count: data.count })
           }
       }
       );
}
