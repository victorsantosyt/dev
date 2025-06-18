"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "lopesul" && senha === "teste22") {
      document.cookie = "token=acesso-master; path=/";
      router.push("/dashboard");
    } else {
      setErro("Usuário ou senha incorretos.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login - Lopesul Wi-Fi
        </h1>

        {erro && <p className="text-red-500 text-sm mb-4">{erro}</p>}

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Usuário</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm"
            placeholder="admin"
            autoComplete="username"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium">Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm"
            placeholder="1234"
            autoComplete="current-password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}