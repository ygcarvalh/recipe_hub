"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";
import { useRestaurant } from "@/hooks/useRestaurant";

const Container = styled.div`
  padding: 3rem 1.5rem;
  max-width: 700px;
  margin: auto;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
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

const Message = styled.p`
  text-align: center;
  margin-top: 2rem;
  font-size: 1rem;
`;

export default function RestaurantDetailPage() {
  const { id } = useParams();
  const { restaurant, loading, error } = useRestaurant(id as string);

  if (loading) return <Message>Loading restaurant...</Message>;
  if (error) return <Message style={{ color: "red" }}>{error}</Message>;
  if (!restaurant) return <Message>Restaurant not found.</Message>;

  return (
    <Container>
      <BackLink href="/restaurants">← Back to restaurants</BackLink>

      <Title>{restaurant.name}</Title>

      <Info>
        <Label>Address:</Label> {restaurant.address}
      </Info>
      <Info>
        <Label>Phone:</Label> {restaurant.phone}
      </Info>
    </Container>
  );
}
