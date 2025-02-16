// src/pages/LandingPage.tsx

import { Link } from "react-router-dom";
// Komponen shadcn/ui
import { Button } from "@/components/ui/button";

export function LandingPage() {
  return (
    <div className="w-full h-screen bg-pink-50 flex flex-col">
      {/* Bagian atas: ilustrasi + teks */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 relative">
        {/* Latar gradient (opsional): */}
        <div className="absolute inset-0 bg-gradient-to-b from-pink-100 to-pink-50 pointer-events-none" />

        {/* Ilustrasi/logo */}
        <img
          src="/illustration.png"
          alt="Eatgorithm Logo"
          className="relative w-40 h-auto mb-4 rounded-2xl"
        />

        {/* Judul & Deskripsi */}
        <h1 className="relative text-3xl font-extrabold text-pink-600 mb-2">
          Eatgorithm
        </h1>
        <p className="relative text-md text-gray-400 font-medium text-center max-w-xs">
          Your personal healthy-eating assistant
        </p>
      </div>

      {/* Bagian bawah: dua tombol aksi */}
      <div className="px-6 pb-24">
        {/* Tombol Login */}
        <Link to="/login">
          <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg py-[22px] mb-4 rounded-xl">
            Login
          </Button>
        </Link>

        {/* Tombol Register */}
        <Link to="/register">
          <Button
            variant="outline"
            className="w-full border-pink-500 text-pink-500 hover:bg-pink-100 font-bold py-[20px] text-lg rounded-xl"
          >
            Register
          </Button>
        </Link>
      </div>
    </div>
  );
}
