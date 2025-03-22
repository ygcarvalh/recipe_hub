"use client";
import { useState, useEffect } from "react";

export type User = {
  id: string;
  username: string;
  isAdmin: boolean;
};

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.detail || "Failed to fetch users.");
        }

        const data = await res.json();
        setUsers(data);
      } catch (err: any) {
        console.error("Error fetching users:", err);
        setError(err.message || "Unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
}
