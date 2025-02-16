// src/pages/LoginPage.tsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Komponen shadcn/ui
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface LoginPageProps {
  onLoginSuccess?: (token: string) => void;
}

const API_BASE = "https://apieat.fuadfakhruz.id";

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const payload = { username, password };
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        alert("Login berhasil!");
        localStorage.setItem("token", data.token);
        onLoginSuccess?.(data.token);
        navigate("/profile");
      } else {
        setErrorMessage(
          data.message || "Login gagal, periksa username/password."
        );
      }
    } catch (error) {
      console.error("Error saat login:", error);
      setErrorMessage("Terjadi kesalahan pada server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center">
      {/* LATAR BELAKANG: Gradasi pink & wave */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-pink-200 to-pink-50" />
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none rotate-180">
        <svg
          className="relative block h-[100px] w-[200%] min-w-full"
          fill="#fff"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M321.39,56.44C240.77,65.58,160.49,91.4,79.24,99.64,52,102.4,24.59,103.61,0,95.92V0H1200V26.6C1147.61,40.77,1095.64,56,1040,56,968.48,56,902.12,23.06,830,8,776.59-3.36,726.56.8,674,16,606.07,35.06,551.06,64.11,489,70.6,424.2,77.48,351.46,47.11,321.39,56.44Z" />
        </svg>
      </div>

      {/* BAGIAN ATAS: ILUSTRASI, JUDUL, DESKRIPSI */}
      <div className="mb-6 flex flex-col items-center px-4 text-center">
        <img
          src="/illustration.png"
          alt="Login Illustration"
          className="w-32 h-auto mb-4 rounded-xl drop-shadow-lg"
        />
        <h1 className="text-3xl font-extrabold text-pink-600 mb-1">Login</h1>
        <p className="text-md text-gray-500 font-medium max-w-xs">
          Your personal healthy-eating assistant
        </p>
      </div>

      {/* ERROR MESSAGE */}
      {errorMessage && (
        <div className="mb-4 px-4 text-center text-red-500 font-medium">
          {errorMessage}
        </div>
      )}

      {/* FORM LOGIN */}
      <form onSubmit={handleLogin} className="w-full max-w-sm px-4 space-y-5">
        {/* USERNAME */}
        <div className="space-y-1">
          <Label
            htmlFor="username"
            className="text-sm font-semibold text-pink-600"
          >
            Username
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="
              w-full h-12 px-4 
              rounded-2xl border border-pink-300 bg-pink-50 
              text-sm text-pink-600 placeholder-pink-300
              focus:outline-none focus:border-pink-400 focus:ring-pink-400
            "
          />
        </div>

        {/* PASSWORD */}
        <div className="space-y-1">
          <Label
            htmlFor="password"
            className="text-sm font-semibold text-pink-600"
          >
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="
              w-full h-12 px-4 
              rounded-2xl border border-pink-300 bg-pink-50 
              text-sm text-pink-600 placeholder-pink-300
              focus:outline-none focus:border-pink-400 focus:ring-pink-400
            "
          />
        </div>

        {/* FORGOT PASSWORD */}
        <div className="text-right">
          <a href="#" className="text-xs text-gray-400 hover:underline">
            Forgot password?
          </a>
        </div>

        {/* TOMBOL LOGIN */}
        <Button
          type="submit"
          disabled={isLoading}
          className="
            w-full h-12 rounded-2xl
            bg-pink-500 hover:bg-pink-600 
            text-white font-bold text-md
            transition disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {isLoading ? "Processing..." : "Login"}
        </Button>
      </form>

      {/* LINK KE REGISTER */}
      <div className="mt-8 px-4 text-center">
        <p className="text-sm text-gray-600 mb-2">
          Don&apos;t have an account?
        </p>
        <Link to="/register">
          <Button
            variant="outline"
            className="
              w-full h-10 rounded-2xl
              border-pink-500 text-pink-500 
              font-bold text-md
              hover:bg-pink-100 transition
            "
          >
            Register
          </Button>
        </Link>
      </div>
    </div>
  );
}
