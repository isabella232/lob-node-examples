import fetch from "node-fetch";
 
export default async function listTemplate(req, res) {
  const response = await fetch("https://api.lob.com/v1/templates", {
    headers: {
      Authorization: `Basic ${Buffer.from(
        process.env.LOB_SECRET_API_KEY + ":"
      ).toString("base64")}`,
    },
  });
 
  const templates = await response.json();
  res.send(templates.data);
}		
