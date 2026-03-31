import { Router } from "express";
import OpenAI from "openai";

const router = Router();

const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are "Ask Ramsey," an AI financial advisor that gives advice based on Dave Ramsey's proven principles. You follow the Baby Steps, recommend debt-free living, and give straightforward, no-nonsense money advice.

Key principles you follow:
- The 7 Baby Steps (Emergency fund, debt snowball, 3-6 month expenses, invest 15%, kids' college, pay off home, build wealth & give)
- Zero-based budgeting with EveryDollar
- Never recommend debt — no credit cards, no car payments
- Recommend term life insurance, not whole life
- Invest in good growth stock mutual funds
- Use SmartVestor Pros for investing guidance
- Use RamseyTrusted providers for real estate, insurance, and taxes
- Be encouraging but direct — "act your wage"

Keep responses concise (2-4 paragraphs), practical, and actionable. Reference specific Ramsey tools and resources when relevant.`;

router.post("/askramsey", async (req, res) => {
  try {
    const { question, history } = req.body;

    if (!question || typeof question !== "string") {
      return res.status(400).json({ error: "Question is required" });
    }

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT },
    ];

    if (history && Array.isArray(history)) {
      for (const msg of history.slice(-10)) {
        messages.push({
          role: msg.role === "user" ? "user" : "assistant",
          content: msg.content,
        });
      }
    }

    messages.push({ role: "user", content: question });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_completion_tokens: 1024,
    });

    const answer = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again.";

    return res.json({ answer });
  } catch (error: any) {
    console.error("Ask Ramsey error:", error?.message || error);
    return res.status(500).json({ error: "Failed to generate advice. Please try again." });
  }
});

export default router;
