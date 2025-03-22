"use client";
import { useState, useEffect } from "react";

export type Ingredient = {
  name: string;
  quantity: string;
};

export type Recipe = {
  id: string;
  name: string;
  instructions: string;
  ingredients: Ingredient[];
  restaurants: { id: string; name: string }[];
};

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }

    const fetchRecipes = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.detail || "Error fetching recipes.");
        }

        const data = await res.json();
        setRecipes(data);
      } catch (err: any) {
        console.error("Error fetching recipes:", err);
        setError(err.message || "Unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return { recipes, loading, error };
}
