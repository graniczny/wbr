import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface WasteDisplayProps {
  wasteData: Record<string, number>;
}

export function WasteDisplay({ wasteData }: WasteDisplayProps) {
  const totalWaste = Object.values(wasteData).reduce(
    (sum, amount) => sum + amount,
    0
  );

  return (
    <div className="mb-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Waste Material</TableHead>
            <TableHead>Amount (kg)</TableHead>
            <TableHead>Percentage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(wasteData).map(([material, amount]) => (
            <TableRow key={material}>
              <TableCell>{material}</TableCell>
              <TableCell>{amount.toFixed(2)}</TableCell>
              <TableCell>{((amount / totalWaste) * 100).toFixed(2)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="mt-4 font-semibold">
        Total Waste: {totalWaste.toFixed(2)} kg
      </p>
    </div>
  );
}
