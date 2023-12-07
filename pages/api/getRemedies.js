// import { OpenAI } from "openai";

export default function handler(req, res) {
  // let responseToSend;
  // // console.log()
  // const openai = new OpenAI({
  //   apiKey: "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",
  // });
  // async function fetchResponse() {
  //   const chatCompletion = await openai.chat.completions.create({
  //     model: "gpt-3.5-turbo",
  //     messages: [{ role: "user", content: req.body.message }],
  //     max_tokens: 200,
  //   });

  //   return chatCompletion.choices[0].message;
  // }
  // fetchResponse().then((res) => {
  //   console.log("THIS: ", res);
  // });
  // res.status(200).json({ response: responseToSend, test: "test parameters" });
  res.status(200).json({ test: "test parameters" });
}
