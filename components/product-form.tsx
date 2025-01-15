"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProductFormProps {
  onSubmit: (productName: string, amount: number) => void;
  shrink?: boolean;
}

export function ProductForm({ onSubmit, shrink }: ProductFormProps) {
  const [productName, setProductName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(productName, parseFloat(amount));
  };

  if (shrink) {
    return (
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 items-center mb-5 mt-4"
      >
        <Label htmlFor="productName">Product Name</Label>

        <Input
          className="block flex-1"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="e.g., pet bottle"
          required
        />

        <Label htmlFor="amount">Amount (kg/year)</Label>

        <Input
          className="block flex-1"
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount in kilograms"
          required
          min="0"
          step="0.1"
        />

        <div className="flex-1">
          <Button style={{ width: "100%" }} type="submit">
            Estimate Waste
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold mb-6">Waste Estimation Tool</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6 w-[400px]">
        <div>
          <Label htmlFor="productName">Product Name</Label>
          <Input
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="e.g., pet bottle"
            required
          />
        </div>
        <div>
          <Label htmlFor="amount">Amount (kg/year)</Label>
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
        <Button style={{ width: "100%" }} type="submit">
          Estimate Waste
        </Button>
      </form>
    </div>
  );
}
