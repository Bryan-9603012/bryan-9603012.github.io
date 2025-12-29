// /api/ai.js
import OpenAI from "openai";

export const runtime = "edge"; // 使用 Edge Runtime 提升效能

export async function POST(req) {
  try {
    // Vercel 自動解析 JSON body
    const body = await req.json();
    
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // 修正：gpt-4.1-mini → gpt-4o-mini
      messages: [
        { role: "user", content: body.message }
      ],
      max_tokens: 500, // 避免超時
    });

    return Response.json({
      reply: completion.choices[0].message.content
    }, { 
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// 處理 OPTIONS preflight
export async function OPTIONS(req) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
