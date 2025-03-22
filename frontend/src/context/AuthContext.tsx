"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  username: string;
  isAdmin: boolean;
  id: number;
};

type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  accessToken: string | null;
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  accessToken: null,
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const at = localStorage.getItem("accessToken");
    const rt = localStorage.getItem("refreshToken");
    const userInfo = localStorage.getItem("user");

    if (at && rt) {
      setAccessToken(at);
      setRefreshToken(rt);
      try {
        setUser(userInfo ? JSON.parse(userInfo) : null);
      } catch {
        setUser(null);
      }
    }

    setLoading(false);
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const res = await fetch(`${apiUrl}/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) return false;

      const data = await res.json();
      const userFromToken = parseJwt(data.access);

      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("user", JSON.stringify(userFromToken));

      setAccessToken(data.access);
      setRefreshToken(data.refresh);
      setUser(userFromToken);

      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);

    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!accessToken,
        login,
        logout,
        accessToken,
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

function parseJwt(token: string): User {
  try {
    const base64 = token.split(".")[1];
    const decoded = JSON.parse(atob(base64));
    return {
      username: decoded.username,
      isAdmin: decoded.is_admin === true,
      id: decoded.user_id,
    };
  } catch (e) {
    console.error("Invalid token:", e);
    return { username: "unknown", isAdmin: false, id: -1 };
  }
}
