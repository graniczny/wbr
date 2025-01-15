'use client'

import { useState } from 'react'
import { ProductForm } from '@/components/product-form'
import { WasteDisplay } from '@/components/waste-display'
import { WasteCharts } from '@/components/waste-charts'
import { SuggestionsDisplay } from '@/components/suggestions-display'

export default function Home() {
  const [wasteData, setWasteData] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleWasteEstimation = async (productName: string, amount: number) => {
    try {
      const response = await fetch('/api/waste-estimation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName, amount }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch waste estimation')
      }

      const data = await response.json()

      if (data.error) {
        console.error('Error from API:', data.error)
        setWasteData(data.fallbackData)
      } else {
        setWasteData(data)
      }

      // Get suggestions for waste utilization
      const suggestionsResponse = await fetch('/api/waste-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wasteData: data.error ? data.fallbackData : data }),
      })

      if (!suggestionsResponse.ok) {
        throw new Error('Failed to fetch waste suggestions')
      }

      const suggestionsData = await suggestionsResponse.json()
      setSuggestions(suggestionsData.suggestions)
    } catch (error) {
      console.error('Error:', error)
      // Handle the error in the UI, e.g., show an error message to the user
      setWasteData(null)
      setSuggestions([])
      setErrorMessage('An error occurred. Please try again later.')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Waste Estimation Tool</h1>
      <ProductForm onSubmit={handleWasteEstimation} />
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}
      {wasteData && (
        <>
          <WasteDisplay wasteData={wasteData} />
          <WasteCharts wasteData={wasteData} />
          <SuggestionsDisplay suggestions={suggestions} />
        </>
      )}
    </div>
  )
}

