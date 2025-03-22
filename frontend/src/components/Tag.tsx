"use client";
import styled from "styled-components";

const StyledTag = styled.span`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  margin-right: 0.5rem;
  text-transform: capitalize;
  display: inline-block;
`;

export const Tag = ({ children }: { children: React.ReactNode }) => (
  <StyledTag>{children}</StyledTag>
);
