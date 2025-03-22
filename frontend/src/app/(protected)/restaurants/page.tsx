"use client";
import styled from "styled-components";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRestaurants } from "@/hooks/useRestaurants";
import { RestaurantCard } from "@/components/RestaurantCard";

const Container = styled.div`
  padding: 3rem 1.5rem;
  max-width: 1000px;
  margin: auto;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2.5rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
`;

const NewRestaurantButton = styled(Link)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;

  &:hover {
    opacity: 0.9;
  }
`;

const Message = styled.p`
  font-size: 1rem;
  margin-top: 1rem;
`;

export default function RestaurantsPage() {
  const { user } = useAuth();
  const { restaurants, loading, error } = useRestaurants();

  return (
    <Container>
      <Header>
        <Title>Restaurants</Title>
        {user?.isAdmin && (
          <NewRestaurantButton href="/restaurants/new">
            + New Restaurant
          </NewRestaurantButton>
        )}
      </Header>

      {loading && <Message>Loading restaurants...</Message>}
      {error && <Message style={{ color: "red" }}>{error}</Message>}

      {!loading && restaurants.length === 0 && (
        <Message>No restaurants found.</Message>
      )}

      {!loading &&
        restaurants.map((r) => (
          <RestaurantCard
            key={r.id}
            id={r.id}
            name={r.name}
            address={r.address}
            phone={r.phone}
          />
        ))}
    </Container>
  );
}
