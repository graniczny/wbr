import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SuggestionsDisplayProps {
  suggestions: string[]
}

export function SuggestionsDisplay({ suggestions }: SuggestionsDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Waste Utilization Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-6 space-y-2">
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

