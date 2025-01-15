"use client";

import { useState } from "react";
import { ProductForm } from "@/components/product-form";
import { WasteDisplay } from "@/components/waste-display";
import { WasteCharts } from "@/components/waste-charts";
import { SuggestionsDisplay } from "@/components/suggestions-display";
import { FullPageLoader } from "@/components/full-page-loader";
import { FeedbackModal } from "@/components/feedback-modal";
import { Button } from "@/components/ui/button";
import { ExcuseDisplay } from "../components/excuse-display";

export default function Home() {
  const [wasteData, setWasteData] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [excuse, setExcuse] = useState<string | null>(null);

  const handleWasteEstimation = async (productName: string, amount: number) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch("/api/waste-estimation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName, amount }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch waste estimation");
      }

      const data = await response.json();

      if (data.error) {
        console.error("Error from API:", data.error);
        setWasteData(data.fallbackData);
      } else {
        setWasteData(data);
      }

      // Get suggestions for waste utilization
      const suggestionsResponse = await fetch("/api/waste-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wasteData: data.error ? data.fallbackData : data,
        }),
      });

      if (!suggestionsResponse.ok) {
        throw new Error("Failed to fetch waste suggestions");
      }

      const suggestionsData = await suggestionsResponse.json();
      setSuggestions(suggestionsData.suggestions);
    } catch (error) {
      console.error("Error:", error);
      // Handle the error in the UI, e.g., show an error message to the user
      setWasteData(null);
      setSuggestions([]);
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedbackSubmit = async (feedback: string) => {
    setIsModalOpen(false);
    setIsLoading(true);

    try {
      const response = await fetch("/api/silly-excuse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate silly excuse");
      }

      const data = await response.json();

      setExcuse(data.excuse);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto pb-8">
      <ProductForm onSubmit={handleWasteEstimation} shrink={!!wasteData} />
      {errorMessage && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}
      {wasteData && (
        <>
          <h2 className="text-2xl font-bold mb-4">Waste Estimation Results</h2>

          <WasteCharts wasteData={wasteData} />
          <WasteDisplay wasteData={wasteData} />

          <SuggestionsDisplay suggestions={suggestions} />

          <div className="mt-8">
            <Button
              style={{ width: "100%" }}
              onClick={() => setIsModalOpen(true)}
            >
              Don't you like this outcome? 😥
            </Button>
          </div>
        </>
      )}

      {isLoading && <FullPageLoader />}
      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
      />
      {excuse && (
        <ExcuseDisplay excuse={excuse} onClose={() => setExcuse("")} />
      )}
    </div>
  );
}
