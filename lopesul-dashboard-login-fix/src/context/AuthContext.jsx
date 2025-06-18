"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    if (userStorage) {
      setUser(JSON.parse(userStorage));
    }
  }, []);

  const login = async ({ nome, senha }) => {
    try {
      const res = await fetch("/api/operadores");
      const operadores = await res.json();

      const operador = operadores.find((op) => op.nome === nome);
      if (!operador) {
        throw new Error("Operador não encontrado.");
      }

      const senhaCorreta = await bcrypt.compare(senha, operador.senha);
      if (!senhaCorreta) {
        throw new Error("Senha incorreta.");
      }

      setUser(operador);
      localStorage.setItem("user", JSON.stringify(operador));
      router.push("/dashboard");
    } catch (err) {
      console.error("Erro no login:", err.message);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
