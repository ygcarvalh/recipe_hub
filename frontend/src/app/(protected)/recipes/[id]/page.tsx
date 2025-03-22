"use client";
import { useParams, useRouter } from "next/navigation";
import { useRecipe } from "@/hooks/useRecipe";
import styled from "styled-components";

const Container = styled.div`
  padding: 3rem 1.5rem;
  max-width: 900px;
  margin: auto;
  color: ${({ theme }) => theme.colors.text};
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.secondaryText || "#666"};
  margin-bottom: 2rem;
`;

const Section = styled.div`
  margin-top: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const Instruction = styled.p`
  font-size: 1.05rem;
  line-height: 1.6;
`;

const IngredientList = styled.ul`
  list-style: disc;
  padding-left: 1.5rem;
`;

const IngredientItem = styled.li`
  margin-bottom: 0.4rem;
  font-size: 1rem;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.4rem 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 16px;
  font-size: 0.9rem;
  display: inline-block;
`;

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const BackButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 2rem;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

export default function RecipeDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { recipe, loading, error } = useRecipe(id as string);

  if (loading)
    return (
      <Container>
        <p>Loading recipe...</p>
      </Container>
    );
  if (error)
    return (
      <Container>
        <p style={{ color: "red" }}>{error}</p>
      </Container>
    );
  if (!recipe)
    return (
      <Container>
        <p>Recipe not found.</p>
      </Container>
    );

  return (
    <>
      <Container>
        <BackButton onClick={() => router.back()}>← Back</BackButton>

        <Title>{recipe.name}</Title>
        <Subtitle>Created recipe for multiple restaurants</Subtitle>

        <Section>
          <SectionTitle>Instructions</SectionTitle>
          <Instruction>{recipe.instructions}</Instruction>
        </Section>

        <Section>
          <SectionTitle>Ingredients</SectionTitle>
          <IngredientList>
            {recipe.ingredients.map((ing, idx) => (
              <IngredientItem key={idx}>
                {ing.name} — {ing.quantity}
              </IngredientItem>
            ))}
          </IngredientList>
        </Section>

        <Section>
          <SectionTitle>Associated Restaurants</SectionTitle>
          <TagWrapper>
            {recipe.restaurants.map((r) => (
              <Tag key={r.id}>{r.name}</Tag>
            ))}
          </TagWrapper>
        </Section>
      </Container>
    </>
  );
}
