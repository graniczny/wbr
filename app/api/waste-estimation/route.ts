import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";

export async function POST(req: Request) {
  const { productName, amount } = await req.json();

  const prompt = `Given a production of ${amount} kg of ${productName}, estimate the waste materials and their amounts in the production process. Provide the result as a validated JSON object with waste material names as keys and their amounts in kg as values.`;

  try {
    const { object: wasteData } = await generateObject({
      model: openai("gpt-3.5-turbo"),
      prompt: prompt,
      output: "no-schema",
    });

    return Response.json(wasteData);
  } catch (error) {
    console.error("Error generating waste estimation:", error);
    return Response.json(
      {
        error: "Failed to generate waste estimation",
        fallbackData: {
          "Peels/Skins": amount * 0.2,
          Trimmings: amount * 0.1,
          "Rejected Products": amount * 0.05,
        },
      },
      { status: 500 }
    );
  }
}
