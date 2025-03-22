"use client";
import Link from "next/link";
import styled from "styled-components";

const Card = styled.a`
  display: block;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  padding: 1.25rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: white;
  }

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
  }

  p {
    margin: 0.25rem 0;
    font-size: 0.95rem;
  }
`;

type Props = {
  id: string;
  name: string;
  address: string;
  phone: string;
};

export const RestaurantCard = ({ id, name, address, phone }: Props) => (
  <Link href={`/restaurants/${id}`} passHref>
    <Card>
      <h3>{name}</h3>
      <p>{address}</p>
      <p>{phone}</p>
    </Card>
  </Link>
);
