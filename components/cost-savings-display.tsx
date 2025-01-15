import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface CostSavingsDisplayProps {
  savings: {
    suggestion: string
    annualSavings: string
  }[]
  totalAnnualSavings: string
}

export function CostSavingsDisplay({ savings, totalAnnualSavings }: CostSavingsDisplayProps) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Potential Cost Savings</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Suggestion</TableHead>
              <TableHead>Estimated Annual Savings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {savings.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.suggestion}</TableCell>
                <TableCell>{item.annualSavings}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 text-right font-bold">
          Total Estimated Annual Savings: {totalAnnualSavings}
        </div>
      </CardContent>
    </Card>
  )
}

