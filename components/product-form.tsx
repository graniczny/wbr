'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ProductFormProps {
  onSubmit: (productName: string, amount: number) => void
}

export function ProductForm({ onSubmit }: ProductFormProps) {
  const [productName, setProductName] = useState('')
  const [amount, setAmount] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(productName, parseFloat(amount))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div>
        <Label htmlFor="productName">Product Name</Label>
        <Input
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="e.g., potato fries"
          required
        />
      </div>
      <div>
        <Label htmlFor="amount">Amount (kg)</Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount in kilograms"
          required
          min="0"
          step="0.1"
        />
      </div>
      <Button type="submit">Estimate Waste</Button>
    </form>
  )
}

