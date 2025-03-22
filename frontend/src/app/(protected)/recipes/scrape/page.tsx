"use client";
import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { RestaurantMultiSelect } from "@/components/RestaurantMultiSelect";
import { useRestaurants } from "@/hooks/useRestaurants";

const Container = styled.div`
  padding: 3rem 1.5rem;
  max-width: 700px;
  margin: auto;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.secondary || "#ccc"};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.inputBackground || "#fff"};
  color: ${({ theme }) => theme.colors.text};
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const Message = styled.p<{ success?: boolean }>`
  margin-top: 1rem;
  font-weight: bold;
  color: ${({ success }) => (success ? "green" : "red")};
`;

export default function ScrapePage() {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [restaurantIds, setRestaurantIds] = useState<string[]>([]);

  const { restaurants, loading: loadingRestaurants } = useRestaurants();

  const handleImport = async () => {
    setMessage("");

    if (!url) {
      setMessage("Please enter a valid URL.");
      return;
    }

    if (restaurantIds.length === 0) {
      setMessage("Please select at least one restaurant.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scrape/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          url,
          restaurant_ids: restaurantIds,
        }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.detail || "Failed to import recipe.");
      }

      setMessage("✅ Recipe successfully imported!");
    } catch (err: any) {
      setMessage(`❌ ${err.message || "Failed to import recipe."}`);
    }
  };

  return (
    <Container>
      <BackLink href="/recipes">← Back to recipes</BackLink>

      <Title>Import Recipe from URL</Title>

      <Input
        type="url"
        placeholder="Paste the recipe URL here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      {loadingRestaurants ? (
        <p>Loading restaurants...</p>
      ) : (
        <RestaurantMultiSelect
          selected={restaurantIds}
          onChange={setRestaurantIds}
          options={restaurants}
        />
      )}

      <Button onClick={handleImport}>Import</Button>

      {message && (
        <Message success={message.includes("successfully")}>{message}</Message>
      )}
    </Container>
  );
}
