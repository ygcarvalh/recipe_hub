"use client";
import { useState } from "react";
import { Restaurant } from "./useRestaurants";

type CreateInput = Omit<Restaurant, "id">;

export function useCreateRestaurant() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createRestaurant = async (input: CreateInput): Promise<boolean> => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("User not authenticated.");
      setLoading(false);
      return false;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/restaurants/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(input),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Error creating restaurant.");
      }

      return true;
    } catch (err: any) {
      console.error("Error creating restaurant:", err);
      setError(err.message || "Unknown error");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createRestaurant, loading, error };
}
