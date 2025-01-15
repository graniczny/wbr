"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ExcuseDisplayProps {
  excuse: string;
  onClose: () => void;
}

export function ExcuseDisplay({ excuse, onClose }: ExcuseDisplayProps) {
  const [stage, setStage] = useState<"excuse" | "question" | "waiting">(
    "excuse"
  );
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (stage === "waiting" && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (stage === "waiting" && countdown === 0) {
      onClose();
    }
    return () => clearTimeout(timer);
  }, [stage, countdown, onClose]);

  const handleAgree = () => {
    setStage("question");
  };

  const handleOptionSelect = (option: string) => {
    setStage("waiting");
    setCountdown(option === "testing" ? 5 : 15);
  };

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="max-w-2xl w-full p-8 bg-card rounded-lg shadow-lg text-center">
        {stage === "excuse" && (
          <>
            <h2 className="text-3xl font-bold mb-6">{excuse}</h2>
            <Button onClick={handleAgree}>I agree, fair enough, go back</Button>
          </>
        )}
        {stage === "question" && (
          <>
            <h2 className="text-2xl font-bold mb-6">
              Ok, so why were you so harsh on us, we built it in like 1 hour?
            </h2>
            <div className="flex gap-2 justify-center pt-8">
              <Button onClick={() => handleOptionSelect("min")}>
                Because I'm Min
              </Button>
              <Button onClick={() => handleOptionSelect("steven")}>
                Because I'm Steven
              </Button>
              <Button onClick={() => handleOptionSelect("testing")}>
                Because I'm testing an app
              </Button>
            </div>
          </>
        )}
        {stage === "waiting" && (
          <>
            <h2 className="text-2xl font-bold mb-6">
              Ok, we forgive you, but now you need to wait {countdown} seconds
            </h2>
            <div className="text-6xl font-bold">{countdown}</div>
          </>
        )}
      </div>
    </div>
  );
}
