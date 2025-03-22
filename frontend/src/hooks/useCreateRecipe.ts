"use client";
import { useState } from "react";
import { Ingredient } from "./useRecipes";

type CreateRecipeInput = {
  name: string;
  description: string;
  instructions: string;
  ingredients: Ingredient[];
  restaurantIds: string[];
  created_by_id: number;
};

export function useCreateRecipe() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createRecipe = async (data: CreateRecipeInput): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("You must be logged in to create a recipe.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: data.name,
            description: data.description,
            instructions: data.instructions,
            ingredients: data.ingredients,
            restaurantIds: data.restaurantIds,
            created_by: data.created_by_id,
          }),
        }
      );

      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.detail || "Failed to create recipe.");
      }

      return true;
    } catch (err: any) {
      console.error("CreateRecipe error:", err);
      setError(err.message || "Unexpected error while creating recipe.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createRecipe, loading, error };
}
