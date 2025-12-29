// /api/ai.js
import OpenAI from "openai";

export default async function handler(req, res) {
  // Vercel 會自動將 body 解析，但有時候需要 fallback
  const body = req.body ?? await new Promise(resolve => {
    let data = "";
    req.on("data", chunk => data += chunk);
    req.on("end", () => resolve(JSON.parse(data)));
  });

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const completion = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      { role: "user", content: body.message }
    ]
  });

  return res.status(200).json({
    reply: completion.choices[0].message.content
  });
}
