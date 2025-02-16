// src/pages/RegisterPage.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";

// Komponen shadcn/ui
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";

// Komponen Select
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const API_BASE = "https://apieat.fuadfakhruz.id";

export function RegisterPage() {
  const navigate = useNavigate();

  // State form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  // Biarkan gender dan activityLevel default = "" (menandakan belum ada pilihan)
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState<number | string>(0);
  const [height, setHeight] = useState<number | string>(0);
  const [activityLevel, setActivityLevel] = useState("");

  // State feedback
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      // Konversi birthDate (Date) ke string "YYYY-MM-DD", atau kosong jika null
      const birthDateString = birthDate ? format(birthDate, "yyyy-MM-dd") : "";

      const payload = {
        username,
        password,
        email,
        full_name: fullName,
        birth_date: birthDateString,
        gender,
        weight: Number(weight),
        height: Number(height),
        activity_level: activityLevel,
      };

      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        alert("Registrasi berhasil! Silakan login.");
        navigate("/login");
      } else {
        setErrorMessage(
          data.message || "Registrasi gagal. Periksa kembali data Anda."
        );
      }
    } catch (error) {
      console.error("Error saat register:", error);
      setErrorMessage("Terjadi kesalahan pada server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Error Message */}
        {errorMessage && (
          <div className="text-center text-red-500 font-medium">
            {errorMessage}
          </div>
        )}

        {/* Form Register */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Username */}
          <div className="space-y-1">
            <Label className="text-sm font-semibold text-pink-600">
              Username
            </Label>
            <Input
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="
                h-12 px-4 rounded-2xl border border-pink-300 bg-pink-50
                text-sm font-medium text-pink-600 placeholder-pink-300
                focus:outline-none focus:border-pink-400 focus:ring-pink-400
              "
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <Label className="text-sm font-semibold text-pink-600">
              Password
            </Label>
            <Input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="
                h-12 px-4 rounded-2xl border border-pink-300 bg-pink-50
                text-sm font-medium text-pink-600 placeholder-pink-300
                focus:outline-none focus:border-pink-400 focus:ring-pink-400
              "
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <Label className="text-sm font-semibold text-pink-600">Email</Label>
            <Input
              type="email"
              placeholder="youremail@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="
                h-12 px-4 rounded-2xl border border-pink-300 bg-pink-50
                text-sm font-medium text-pink-600 placeholder-pink-300
                focus:outline-none focus:border-pink-400 focus:ring-pink-400
              "
            />
          </div>

          {/* Full Name */}
          <div className="space-y-1">
            <Label className="text-sm font-semibold text-pink-600">
              Full Name
            </Label>
            <Input
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="
                h-12 px-4 rounded-2xl border border-pink-300 bg-pink-50
                text-sm font-medium text-pink-600 placeholder-pink-300
                focus:outline-none focus:border-pink-400 focus:ring-pink-400
              "
            />
          </div>

          {/* Baris: BirthDate dan Gender */}
          <div className="grid grid-cols-2 gap-4">
            {/* BirthDate (Calendar) */}
            <div className="space-y-1">
              <Label className="text-sm font-semibold text-pink-600">
                Birth Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="
                      h-12 w-full rounded-2xl border-pink-300 bg-pink-50 
                      text-pink-600 text-sm font-medium justify-between
                      hover:bg-pink-100 focus:outline-none focus:ring-pink-400
                    "
                  >
                    {birthDate ? (
                      format(birthDate, "PPP")
                    ) : (
                      <span className="text-gray-500">Select date</span>
                    )}
                    <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                  <Calendar
                    mode="single"
                    selected={birthDate || undefined}
                    onSelect={(date) => setBirthDate(date || null)}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Gender - shadcn/ui Select */}
            <div className="space-y-1">
              <Label className="text-sm font-semibold text-pink-600">
                Gender
              </Label>
              <Select value={gender} onValueChange={setGender} required>
                <SelectTrigger
                  className="
                    h-12 w-full rounded-2xl border border-pink-300 bg-pink-50
                    text-sm font-medium text-pink-600 
                    focus:outline-none focus:border-pink-400 focus:ring-pink-400
                  "
                >
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent className="max-h-48 overflow-y-auto">
                  {/* HAPUS item value="" karena menimbulkan error */}
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Baris: Weight & Height */}
          <div className="grid grid-cols-2 gap-4">
            {/* Weight */}
            <div className="space-y-1">
              <Label className="text-sm font-semibold text-pink-600">
                Weight (kg)
              </Label>
              <Input
                type="number"
                placeholder="40"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                className="
                  h-12 px-4 rounded-2xl border border-pink-300 bg-pink-50
                  text-sm font-medium text-pink-600 placeholder-pink-300
                  focus:outline-none focus:border-pink-400 focus:ring-pink-400
                "
              />
            </div>

            {/* Height */}
            <div className="space-y-1">
              <Label className="text-sm font-semibold text-pink-600">
                Height (cm)
              </Label>
              <Input
                type="number"
                placeholder="xxx cm"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
                className="
                  h-12 px-4 rounded-2xl border border-pink-300 bg-pink-50
                  text-sm font-medium text-pink-600 placeholder-pink-300
                  focus:outline-none focus:border-pink-400 focus:ring-pink-400
                "
              />
            </div>
          </div>

          {/* Activity Level - shadcn/ui Select */}
          <div className="space-y-1">
            <Label className="text-sm font-semibold text-pink-600">
              Activity Level
            </Label>
            <Select
              value={activityLevel}
              onValueChange={setActivityLevel}
              required
            >
              <SelectTrigger
                className="
                  h-12 w-full rounded-2xl border border-pink-300 bg-pink-50
                  text-sm font-medium text-pink-600
                  focus:outline-none focus:border-pink-400 focus:ring-pink-400
                "
              >
                <SelectValue placeholder="Select Activity" />
              </SelectTrigger>
              <SelectContent className="max-h-48 overflow-y-auto">
                {/* HAPUS item value="" karena menimbulkan error */}
                <SelectItem value="sedentary">Sedentary</SelectItem>
                <SelectItem value="lightly active">Lightly Active</SelectItem>
                <SelectItem value="moderately active">
                  Moderately Active
                </SelectItem>
                <SelectItem value="very active">Very Active</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tombol Register */}
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
            {isLoading ? "Processing..." : "Register"}
          </Button>
        </form>

        {/* Link ke Login */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 mb-2">Already have an account?</p>
          <Link to="/login">
            <Button
              variant="outline"
              className="
                w-full h-10 rounded-2xl
                border-pink-500 text-pink-500 
                font-bold text-md
                hover:bg-pink-100 transition
              "
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
