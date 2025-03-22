"use client";
import styled from "styled-components";
import Link from "next/link";
import { useTheme } from "@/provider/ThemeProvider";
import { useAuth } from "@/context/AuthContext";

const NavbarContainer = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
`;

const NavLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const ThemeButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0 0.5rem;
`;

const LogoutButton = styled.button`
  background: ${({ theme }) => theme.colors.danger || "red"};
  border: none;
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    opacity: 0.9;
  }
`;

const Navbar = () => {
  const { toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();

  return (
    <NavbarContainer>
      <Link href="/">
        <Title>Recipe Hub</Title>
      </Link>
      <NavLinks>
        <StyledLink href="/recipes">Recipes</StyledLink>
        <StyledLink href="/restaurants">Restaurants</StyledLink>
        <StyledLink href="/users">Users</StyledLink>
        <ThemeButton onClick={toggleTheme} title="Toggle theme">
          🌗
        </ThemeButton>
        {isAuthenticated && (
          <LogoutButton onClick={logout}>Logout</LogoutButton>
        )}
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
