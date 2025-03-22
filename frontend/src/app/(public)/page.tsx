"use client";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.1rem;
  max-width: 600px;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.secondaryText || "#888"};
`;

const Button = styled.a`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.8rem 1.5rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    opacity: 0.9;
  }
`;

export default function Home() {
  return (
    <Container>
      <Title>Welcome to Recipe Hub</Title>
      <Subtitle>Your centralized recipe management platform</Subtitle>
      <Description>
        Easily create, organize, and manage restaurant recipes in one place.
        Save time, improve consistency, and streamline your kitchen workflow.
      </Description>
      <Button href="/login">Get Started</Button>
    </Container>
  );
}
