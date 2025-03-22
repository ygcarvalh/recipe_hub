"use client";
import styled from "styled-components";
import Link from "next/link";
import { Tag } from "./Tag";

const Card = styled.a`
  display: block;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    color: white;

    h2 {
      color: white;
    }
  }
`;

const Title = styled.h2`
  margin: 0 0 0.75rem;
  font-size: 1.25rem;
  transition: color 0.2s ease;
`;

const TagContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

type Props = {
  id: string;
  name: string;
  restaurants: { name: string }[];
};

export const RecipeCard = ({ id, name, restaurants }: Props) => (
  <Link href={`/recipes/${id}`} passHref>
    <Card>
      <Title>{name}</Title>
      <TagContainer>
        {restaurants.map((r, i) => (
          <Tag key={i}>{r.name}</Tag>
        ))}
      </TagContainer>
    </Card>
  </Link>
);
