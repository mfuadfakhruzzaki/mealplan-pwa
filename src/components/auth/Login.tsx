// src/components/Auth/Login.tsx
import { useState, FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const API_BASE = "https://apieat.fuadfakhruz.id";

interface LoginProps {
  onLoginSuccess: (token: string) => void;
}

export function Login({ onLoginSuccess }: LoginProps) {
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Login berhasil!");
        onLoginSuccess(data.token);
      } else {
        alert(data.message || "Login gagal");
      }
    } catch (error) {
      console.error("Error saat login:", error);
      alert("Error saat login");
    }
  };

  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={loginData.username}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          required
        />
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white w-full"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
