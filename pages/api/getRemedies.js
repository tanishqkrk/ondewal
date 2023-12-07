import { OpenAI } from "openai";

export default async function handler(req, res) {
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
