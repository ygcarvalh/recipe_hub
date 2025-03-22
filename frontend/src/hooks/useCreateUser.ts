"use client";
import { useState } from "react";

type CreateUserInput = {
  username: string;
  password: string;
  is_staff: boolean;
};

export function useCreateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (data: CreateUserInput): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.detail || "Failed to create user.");
      }

      return true;
    } catch (err: any) {
      setError(err.message || "Unexpected error.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error };
}
