"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useAuth } from "@/context/AuthContext";
import { useCreateRecipe } from "@/hooks/useCreateRecipe";
import { useRestaurants } from "@/hooks/useRestaurants";

const Container = styled.div`
  padding: 3rem 1.5rem;
  max-width: 800px;
  margin: auto;
`;

const Title = styled.h1`
  margin-bottom: 1.5rem;
  font-size: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const IngredientRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const Select = styled.select`
  width: 100%;
  min-height: 150px;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.secondary || "#ccc"};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.inputBackground || "#fff"};
  color: ${({ theme }) => theme.colors.text || "#000"};
  margin-bottom: 1rem;
  resize: vertical;
  outline: none;

  option {
    padding: 0.5rem;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;

const Error = styled.p`
  color: red;
  margin-top: 1rem;
  font-weight: bold;
`;

const SectionTitle = styled.h3`
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

export default function NewRecipePage() {
  const { user } = useAuth();
  const router = useRouter();
  const { restaurants, loading: loadingRestaurants } = useRestaurants();
  const { createRecipe, loading, error } = useCreateRecipe();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);
  const [selectedRestaurantIds, setSelectedRestaurantIds] = useState<string[]>(
    []
  );
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!user?.isAdmin) {
      router.replace("/recipes");
    }
  }, [user]);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };

  const handleIngredientChange = (
    index: number,
    field: "name" | "quantity",
    value: string
  ) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleRestaurantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions);
    setSelectedRestaurantIds(options.map((o) => o.value));
  };

  const handleSubmit = async () => {
    setFormError("");

    if (
      !name ||
      !description ||
      !instructions ||
      ingredients.some((i) => !i.name || !i.quantity)
    ) {
      setFormError("Please fill out all fields and ingredients.");
      return;
    }

    const success = await createRecipe({
      name,
      description,
      instructions,
      ingredients,
      restaurantIds: selectedRestaurantIds,
      created_by_id: user?.id || 1,
    });

    if (success) {
      router.push("/recipes");
    }
  };

  return (
    <Container>
      <Title>New Recipe</Title>

      <Input
        type="text"
        placeholder="Recipe name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Textarea
        placeholder="Instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
      />

      <SectionTitle>Ingredients</SectionTitle>
      {ingredients.map((ingredient, index) => (
        <IngredientRow key={index}>
          <Input
            placeholder="Name"
            value={ingredient.name}
            onChange={(e) =>
              handleIngredientChange(index, "name", e.target.value)
            }
          />
          <Input
            placeholder="Quantity"
            value={ingredient.quantity}
            onChange={(e) =>
              handleIngredientChange(index, "quantity", e.target.value)
            }
          />
        </IngredientRow>
      ))}

      <Button type="button" onClick={handleAddIngredient}>
        + Add Ingredient
      </Button>

      <SectionTitle>Associated Restaurants</SectionTitle>
      {loadingRestaurants ? (
        <p>Loading restaurants...</p>
      ) : (
        <Select multiple onChange={handleRestaurantChange}>
          {restaurants.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </Select>
      )}

      {(formError || error) && <Error>{formError || error}</Error>}

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Save Recipe"}
      </Button>
    </Container>
  );
}
