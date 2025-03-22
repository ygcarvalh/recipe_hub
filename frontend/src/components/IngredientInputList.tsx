"use client";
import styled from "styled-components";

const IngredientContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const IngredientRow = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.secondary || "#ccc"};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.inputBackground || "#fff"};
  color: ${({ theme }) => theme.colors.text};
`;

const RemoveButton = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const AddButton = styled.button`
  background: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 0.5rem;

  &:hover {
    opacity: 0.9;
  }
`;

type Props = {
  ingredients: { name: string; quantity: string }[];
  setIngredients: (ings: { name: string; quantity: string }[]) => void;
};

export const IngredientInputList = ({ ingredients, setIngredients }: Props) => {
  const handleAdd = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };

  const handleRemove = (index: number) => {
    const updated = ingredients.filter((_, i) => i !== index);
    setIngredients(updated);
  };

  const handleChange = (
    index: number,
    field: "name" | "quantity",
    value: string
  ) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  return (
    <IngredientContainer>
      <h3>Ingredients</h3>
      {ingredients.map((ingredient, index) => (
        <IngredientRow key={index}>
          <Input
            type="text"
            placeholder="Name"
            value={ingredient.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
          />
          <Input
            type="text"
            placeholder="Quantity"
            value={ingredient.quantity}
            onChange={(e) => handleChange(index, "quantity", e.target.value)}
          />
          <RemoveButton
            type="button"
            onClick={() => handleRemove(index)}
            aria-label="Remove ingredient"
          >
            ✕
          </RemoveButton>
        </IngredientRow>
      ))}

      <AddButton type="button" onClick={handleAdd}>
        + Add Ingredient
      </AddButton>
    </IngredientContainer>
  );
};
