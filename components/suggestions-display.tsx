interface SuggestionsDisplayProps {
  suggestions: string[];
}

export function SuggestionsDisplay({ suggestions }: SuggestionsDisplayProps) {
  return (
    <div className="bg-blue-100 px-4 py-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Waste Utilization Suggestions</h2>
      <ul className="list-disc pl-6 space-y-2">
        {suggestions.map((suggestion, index) => (
          <div key={index}>{suggestion}</div>
        ))}
      </ul>
    </div>
  );
}
