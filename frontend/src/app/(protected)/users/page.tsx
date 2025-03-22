"use client";
import styled from "styled-components";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useUsers } from "@/hooks/useUsers";

const Container = styled.div`
  padding: 3rem 1.5rem;
  max-width: 800px;
  margin: auto;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 0;
`;

const NewUserButton = styled(Link)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.6rem 1.2rem;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.95rem;

  &:hover {
    opacity: 0.9;
  }
`;

const UserCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.colors.inputBackground || "#fff"};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: white;
  }
`;

const Message = styled.p`
  font-size: 1rem;
  margin-top: 1.5rem;
`;

export default function UsersPage() {
  const { user } = useAuth();
  const { users, loading, error } = useUsers();

  return (
    <Container>
      <Header>
        <Title>Users</Title>
        {user?.isAdmin && (
          <NewUserButton href="/users/new">+ New User</NewUserButton>
        )}
      </Header>

      {loading && <Message>Loading users...</Message>}
      {error && <Message style={{ color: "red" }}>{error}</Message>}

      {!loading && users.length === 0 && <Message>No users found.</Message>}

      {!loading &&
        users.map((u) => (
          <Link key={u.id} href={`/users/${u.id}`}>
            <UserCard>
              <p>
                <strong>Username:</strong> {u.username}
              </p>
              <p>
                <strong>Role:</strong>{" "}
                {u.isAdmin ? "Administrator" : "Standard"}
              </p>
            </UserCard>
          </Link>
        ))}
    </Container>
  );
}
