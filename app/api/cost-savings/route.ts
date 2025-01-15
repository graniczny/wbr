import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function POST(req: Request) {
  const { wasteData, suggestions } = await req.json();

  const prompt = `Given the following waste materials and suggested reuse solutions:

Waste materials:
${Object.entries(wasteData)
  .map(([material, amount]) => `${material}: ${Number(amount) / 10} kg`)
  .join("\n")}

Suggested reuse solutions:
${suggestions.join("\n")}

Estimate the potential financial savings that could be achieved by implementing these reuse solutions. Provide a breakdown of savings for each suggestion and a total estimated annual savings. Return the response as a JSON object with the following structure:
{
  "savings": [
    {
      "suggestion": "Suggestion text",
      "annualSavings": "Estimated annual savings in dollars"
    },
    ...
  ],
  "totalAnnualSavings": "Total estimated annual savings in dollars"
}
`;

  console.log(prompt);

  try {
    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      prompt: prompt,
    });

    let savingsData;
    try {
      savingsData = JSON.parse(text);
    } catch (error) {
      console.error("Error parsing AI response:", error);
      throw new Error("Invalid response from AI");
    }

    return Response.json(savingsData);
  } catch (error) {
    console.error("Error generating cost savings:", error);
    return Response.json(
      {
        error: "Failed to generate cost savings",
        fallbackData: {
          savings: [
            {
              suggestion: "Compost the organic waste for use in agriculture",
              annualSavings: "$5,000",
            },
            {
              suggestion: "Use trimmings for animal feed production",
              annualSavings: "$3,000",
            },
            {
              suggestion:
                "Recycle rejected products into new food items or non-food applications",
              annualSavings: "$7,000",
            },
          ],
          totalAnnualSavings: "$15,000",
        },
      },
      { status: 500 }
    );
  }
}
