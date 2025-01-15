import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'

export async function POST(req: Request) {
  const { wasteData } = await req.json()

  const wasteDescription = Object.entries(wasteData)
    .map(([material, amount]) => `${material}: ${amount} kg`)
    .join(', ')

  const prompt = `Given the following waste materials from a production process: ${wasteDescription}. Suggest 3 innovative and sustainable ways to utilize or recycle these waste materials. Provide the suggestions as a JSON array of strings.`

  const { text } = await generateText({
    model: openai('gpt-3.5-turbo'),
    prompt: prompt,
  })

  let suggestions
  try {
    suggestions = JSON.parse(text)
  } catch (error) {
    console.error('Error parsing AI response:', error)
    suggestions = [
      'Compost the organic waste for use in agriculture',
      'Use trimmings for animal feed production',
      'Recycle rejected products into new food items or non-food applications',
    ]
  }

  return Response.json({ suggestions })
}

