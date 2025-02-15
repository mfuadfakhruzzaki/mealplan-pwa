// src/components/MealPlan/GenerateMealPlan.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MealPlan } from "@/interfaces/mealplan";

const API_BASE = "https://api.fuadfakhruz.id";

interface GenerateMealPlanProps {
  token: string;
}

export function GenerateMealPlan({ token }: GenerateMealPlanProps) {
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);

  const handleGenerate = async () => {
    try {
      const res = await fetch(`${API_BASE}/mealplan/generate`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setMealPlan(data);
      } else {
        alert(data.message || "Gagal generate meal plan");
      }
    } catch (error) {
      console.error("Error saat generate meal plan:", error);
      alert("Error saat generate meal plan");
    }
  };

  return (
    <div className="border p-4 rounded shadow mt-6">
      <h3 className="text-xl font-semibold mb-2">Generate Meal Plan</h3>
      <Button
        onClick={handleGenerate}
        className="bg-purple-500 hover:bg-purple-600 text-white w-full mb-4"
      >
        Generate Meal Plan
      </Button>
      {mealPlan && (
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(mealPlan, null, 2)}
        </pre>
      )}
    </div>
  );
}
