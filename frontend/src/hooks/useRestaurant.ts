"use client";
import { useState, useEffect } from "react";
import { Restaurant } from "./useRestaurants";

export function useRestaurant(id: string) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }

    const fetchRestaurant = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/restaurants/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.detail || "Error fetching restaurant.");
        }

        const data = await res.json();
        setRestaurant(data);
      } catch (err: any) {
        console.error("Error fetching restaurant:", err);
        setError(err.message || "Unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  return { restaurant, loading, error };
}
