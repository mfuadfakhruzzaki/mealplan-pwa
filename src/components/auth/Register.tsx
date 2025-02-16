// src/components/Auth/Register.tsx
import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const API_BASE = "https://apieat.fuadfakhruz.id";

interface RegisterData {
  username: string;
  password: string;
  email: string;
  full_name: string;
  birth_date: string;
  gender: string;
  weight: string;
  height: string;
  activity_level: string;
}

export function Register() {
  const [regData, setRegData] = useState<RegisterData>({
    username: "",
    password: "",
    email: "",
    full_name: "",
    birth_date: "",
    gender: "",
    weight: "",
    height: "",
    activity_level: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setRegData({ ...regData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      ...regData,
      weight: Number(regData.weight),
      height: Number(regData.height),
    };
    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Registrasi berhasil! Silakan login.");
      } else {
        alert(data.message || "Registrasi gagal");
      }
    } catch (error) {
      console.error("Error saat registrasi:", error);
      alert("Error saat registrasi");
    }
  };

  return (
    <div className="border p-4 rounded shadow mt-6">
      <h2 className="text-xl font-semibold mb-2">Register</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={regData.username}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={regData.password}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={regData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={regData.full_name}
          onChange={handleChange}
          required
        />
        <Input
          type="date"
          name="birth_date"
          value={regData.birth_date}
          onChange={handleChange}
          required
        />
        <select
          name="gender"
          value={regData.gender}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        >
          <option value="">Pilih Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <Input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={regData.weight}
          onChange={handleChange}
          required
        />
        <Input
          type="number"
          name="height"
          placeholder="Height (cm)"
          value={regData.height}
          onChange={handleChange}
          required
        />
        <select
          name="activity_level"
          value={regData.activity_level}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        >
          <option value="">Pilih Activity Level</option>
          <option value="sedentary">Sedentary</option>
          <option value="lightly active">Lightly Active</option>
          <option value="moderately active">Moderately Active</option>
          <option value="very active">Very Active</option>
        </select>
        <Button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white w-full"
        >
          Register
        </Button>
      </form>
    </div>
  );
}
