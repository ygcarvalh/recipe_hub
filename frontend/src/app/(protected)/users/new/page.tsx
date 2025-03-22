"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCreateUser } from "@/hooks/useCreateUser";

const Container = styled.div`
  padding: 3rem 1.5rem;
  max-width: 600px;
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
  margin-bottom: 1.5rem;
  font-size: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.secondary || "#ccc"};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.inputBackground || "#fff"};
  color: ${({ theme }) => theme.colors.text};
`;

const Checkbox = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;

const Error = styled.p`
  color: red;
  margin-top: 1rem;
  font-weight: bold;
`;

export default function NewUserPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [formError, setFormError] = useState("");

  const { createUser, loading, error } = useCreateUser();

  useEffect(() => {
    if (!user?.isAdmin) {
      router.replace("/users");
    }
  }, [user]);

  const handleSubmit = async () => {
    setFormError("");

    if (!username || !password) {
      setFormError("Please fill out all fields.");
      return;
    }

    const success = await createUser({ username, password, is_staff: isAdmin });

    if (success) {
      router.push("/users");
    }
  };

  return (
    <Container>
      <BackLink href="/users">← Back to users</BackLink>

      <Title>New User</Title>

      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Checkbox>
        <input
          type="checkbox"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        />
        Administrator
      </Checkbox>

      {(formError || error) && <Error>{formError || error}</Error>}

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Save User"}
      </Button>
    </Container>
  );
}
