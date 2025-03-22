"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useAuth } from "@/context/AuthContext";

const Container = styled.div`
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.background || "#fff"};
  color: ${({ theme }) => theme.colors.text || "#000"};
  border: 1px solid ${({ theme }) => theme.colors.secondary || "#ccc"};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h1`
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.secondary || "#ccc"};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.inputBackground || "#fff"};
  color: ${({ theme }) => theme.colors.text || "#000"};
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary || "#007bff"};
  color: white;
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const ErrorMsg = styled.p`
  color: red;
  margin-top: 1rem;
  text-align: center;
`;

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    const success = await login(username, password);
    if (success) {
      router.push("/recipes");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <Container>
      <Title>Login to Recipe Hub</Title>
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
      <Button onClick={handleLogin}>Sign In</Button>
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </Container>
  );
}
