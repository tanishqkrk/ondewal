import { OpenAI } from "openai";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  console.log(req.body.message);
  // let responseToSend = "default";
  async function fetchResponse(msg) {
    const openai = new OpenAI({
      apiKey: "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",
      // dangerouslyAllowBrowser: true,
    });
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: req.body.message }],
      max_tokens: 500,
    });
    return chatCompletion.choices[0].message;
  }

  let responseToSend = await fetchResponse();

  res.status(200).json({
    response: responseToSend.content,
  });
}
