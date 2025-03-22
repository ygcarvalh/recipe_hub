"use client";
import styled from "styled-components";

type Restaurant = {
  id: string;
  name: string;
};

type Props = {
  selected: string[];
  onChange: (ids: string[]) => void;
  options: Restaurant[];
};

const Container = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h3`
  margin-bottom: 0.75rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const Label = styled.label<{ checked: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: ${({ theme, checked }) =>
    checked ? theme.colors.primary : theme.colors.secondary};
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  input {
    display: none;
  }
`;

export const RestaurantMultiSelect = ({
  selected,
  onChange,
  options,
}: Props) => {
  const handleToggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <Container>
      <Title>Associated Restaurants</Title>
      <CheckboxContainer>
        {options.map((r) => {
          const isChecked = selected.includes(r.id);
          return (
            <Label key={r.id} checked={isChecked}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleToggle(r.id)}
              />
              {r.name}
            </Label>
          );
        })}
      </CheckboxContainer>
    </Container>
  );
};
