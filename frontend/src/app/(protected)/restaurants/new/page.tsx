"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCreateRestaurant } from "@/hooks/useCreateRestaurant";

const Container = styled.div`
  padding: 3rem 1.5rem;
  max-width: 600px;
  margin: auto;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1.2rem;
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Error = styled.p`
  color: red;
  margin-top: 1rem;
  font-weight: bold;
`;

export default function NewRestaurantPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [formError, setFormError] = useState("");

  const { createRestaurant, loading, error } = useCreateRestaurant();

  useEffect(() => {
    if (!user?.isAdmin) {
      router.replace("/restaurants");
    }
  }, [user]);

  const handleSubmit = async () => {
    setFormError("");

    if (!name || !address || !phone) {
      setFormError("Please fill out all fields.");
      return;
    }

    const success = await createRestaurant({ name, address, phone });

    if (success) {
      router.push("/restaurants");
    }
  };

  return (
    <Container>
      <BackLink href="/restaurants">← Back to restaurants</BackLink>

      <Title>New Restaurant</Title>

      <Input
        type="text"
        placeholder="Restaurant name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <Input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      {(formError || error) && <Error>{formError || error}</Error>}

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Save Restaurant"}
      </Button>
    </Container>
  );
}
