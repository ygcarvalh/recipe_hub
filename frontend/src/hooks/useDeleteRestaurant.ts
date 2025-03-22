"use client";
import { useState } from "react";

export function useDeleteRestaurant() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteRestaurant = async (id: string): Promise<boolean> => {
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
        `${process.env.NEXT_PUBLIC_API_URL}/restaurants/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Error deleting restaurant.");
      }

      return true;
    } catch (err: any) {
      console.error("Error deleting restaurant:", err);
      setError(err.message || "Unknown error");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteRestaurant, loading, error };
}
