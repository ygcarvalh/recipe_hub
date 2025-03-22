"use client";
import styled from "styled-components";
import { useAuth } from "@/context/AuthContext";
import { useRecipes } from "@/hooks/useRecipes";
import Link from "next/link";

const Container = styled.div`
  padding: 3rem 1.5rem;
  max-width: 1000px;
  margin: auto;
  color: ${({ theme }) => theme.colors.text};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ActionButton = styled(Link)`
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

const Card = styled(Link)`
  display: block;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: white;

    h3 {
      color: white;
    }
  }

  h3 {
    margin-bottom: 0.75rem;
    color: ${({ theme }) => theme.colors.primary};
    transition: color 0.2s;
  }

  p {
    margin: 0.25rem 0;
  }
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.3rem 0.7rem;
  margin-right: 0.5rem;
  border-radius: 16px;
  font-size: 0.85rem;
  display: inline-block;
  margin-top: 0.5rem;
`;

export default function RecipesPage() {
  const { user } = useAuth();
  const { recipes, loading, error } = useRecipes();

  return (
    <Container>
      <Header>
        <Title>Recipes</Title>
        {user?.isAdmin && (
          <ButtonGroup>
            <ActionButton href="/recipes/new">+ New Recipe</ActionButton>
            <ActionButton href="/recipes/scrape">Scraping</ActionButton>
          </ButtonGroup>
        )}
      </Header>

      {loading && <p>Loading recipes...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading &&
        recipes.map((recipe) => (
          <Card key={recipe.id} href={`/recipes/${recipe.id}`}>
            <h3>{recipe.name}</h3>
            <p>
              <strong>Instructions:</strong> {recipe.instructions}
            </p>
            <p>
              <strong>Ingredients:</strong>{" "}
              {recipe.ingredients.map((i, idx) => (
                <span key={idx}>
                  {i.name} ({i.quantity})
                  {idx < recipe.ingredients.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <div>
              {recipe.restaurants.map((r) => (
                <Tag key={r.id}>{r.name}</Tag>
              ))}
            </div>
          </Card>
        ))}
    </Container>
  );
}
