"use client";
import { useEffect, useState } from "react";
import { User } from "./useUsers";

export function useUser(id: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.detail || "Failed to fetch user.");
        }

        const data = await res.json();
        setUser(data);
      } catch (err: any) {
        console.error("Error fetching user:", err);
        setError(err.message || "Unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return { user, loading, error };
}
