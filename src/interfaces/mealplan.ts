// src/interfaces/MealPlan.ts
export interface MealPlan {
  meals: MealPlanMeal[];
  nutrients: MealPlanNutrients;
  target_calories: number;
}

export interface MealPlanMeal {
  meal: Meal;
  recipe: Recipe;
}

export interface Meal {
  id: number;
  title: string;
  imageType: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
}

export interface Recipe {
  id: number;
  title: string;
  image: string;
  servings: number;
  nutrition: Nutrition;
}

export interface Nutrition {
  nutrients: Nutrient[];
}

export interface Nutrient {
  name: string;
  amount: number;
  unit: string;
}

export interface MealPlanNutrients {
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
}
