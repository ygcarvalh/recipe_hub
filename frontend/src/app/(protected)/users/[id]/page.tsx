"use client";
import { useParams } from "next/navigation";
import styled from "styled-components";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";

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
  margin-bottom: 1rem;
`;

const Info = styled.p`
  font-size: 1.1rem;
  margin: 0.5rem 0;
`;

const Label = styled.span`
  font-weight: bold;
`;

const Message = styled.p`
  text-align: center;
  margin-top: 2rem;
  font-size: 1rem;
`;

export default function UserDetailPage() {
  const { id } = useParams();
  const { user, loading, error } = useUser(id as string);

  if (loading) return <Message>Loading user...</Message>;
  if (error) return <Message style={{ color: "red" }}>{error}</Message>;
  if (!user) return <Message>User not found.</Message>;

  return (
    <Container>
      <BackLink href="/users">← Back to users</BackLink>

      <Title>{user.username}</Title>
      <Info>
        <Label>Role:</Label> {user.isAdmin ? "Administrator" : "Standard"}
      </Info>
    </Container>
  );
}
