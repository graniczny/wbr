import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function POST(req: Request) {
  const { feedback } = await req.json();

  const prompt = `A user doesn't like the waste estimation results and provided this feedback: "${feedback}". Generate a silly, childish excuse why the AI-generated data is not working. The excuse should be humorous and not take the complaint seriously and be written in a Terminator style.`;

  try {
    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      prompt: prompt,
    });

    return Response.json({ excuse: text });
  } catch (error) {
    console.error("Error generating silly excuse:", error);
    return Response.json(
      {
        error: "Failed to generate a silly excuse",
        excuse:
          "The AI is on a coffee break. It'll be back after it finishes its donut!",
      },
      { status: 500 }
    );
  }
}
