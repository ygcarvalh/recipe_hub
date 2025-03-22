"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { authFetch } from "@/utils/authFetch";

export type Restaurant = {
  id: string;
  name: string;
  address: string;
  phone: string;
};

export function useRestaurants() {
  const { accessToken } = useAuth();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }

    const fetchRestaurants = async () => {
      try {
        const res = await authFetch(
          `${process.env.NEXT_PUBLIC_API_URL}/restaurants`
        );
        if (!res.ok) throw new Error("Failed to fetch restaurants");

        const data = await res.json();
        setRestaurants(data);
      } catch (err: any) {
        console.error("Error fetching restaurants:", err);
        setError(err.message || "Unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [accessToken]);

  return { restaurants, loading, error };
}
