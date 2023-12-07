import { OpenAI } from "openai";

export default function handler(req, res) {
  console.log(req.body.message);
  let responseToSend;
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
  fetchResponse().then((r) => {
    responseToSend = r;
    res.status(200).json({ content: r });
  });
  res.status(200).json({ response: responseToSend });
}
