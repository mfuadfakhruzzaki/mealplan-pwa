// src/App.tsx
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { ProfileInfo } from "@/components/Profile/ProfileInfo";
import { UpdateProfile } from "@/components/Profile/UpdateProfile";
import { GenerateMealPlan } from "@/components/MealPlan/GenerateMealPlan";
import { Profile } from "@/interfaces/profile";

const API_BASE = "https://apieat.fuadfakhruz.id";

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const fetchProfile = async (tkn: string) => {
    try {
      const res = await fetch(`${API_BASE}/user`, {
        method: "GET",
        headers: { Authorization: `Bearer ${tkn}` },
      });
      const data = await res.json();
      if (res.ok) {
        setProfile(data);
      } else {
        alert(data.message || "Gagal mengambil profile");
      }
    } catch (error) {
      console.error("Error mengambil profile:", error);
      alert("Error mengambil profile");
    }
  };

  const handleLoginSuccess = (token: string) => {
    setToken(token);
    fetchProfile(token);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_BASE}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setToken(null);
        setProfile(null);
        alert("Logout berhasil");
      } else {
        alert("Logout gagal");
      }
    } catch (error) {
      console.error("Error saat logout:", error);
      alert("Error saat logout");
    }
  };

  const refreshProfile = () => {
    if (token) {
      fetchProfile(token);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-green-100 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white shadow-2xl rounded-lg p-8">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
              Eatgorithm
            </h1>
            <p className="text-gray-600">
              Solusi cerdas untuk pola makan sehat Anda
            </p>
          </header>

          {!token ? (
            <>
              {/* Navigasi untuk Login dan Register */}
              <div className="flex justify-center space-x-6 mb-8">
                <Link
                  to="/login"
                  className="px-6 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-3 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition duration-200"
                >
                  Register
                </Link>
              </div>
              <Routes>
                <Route
                  path="/login"
                  element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
                />
                <Route path="/register" element={<RegisterPage />} />
                {/* Redirect jika URL tidak sesuai */}
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </>
          ) : (
            <>
              <div className="flex justify-end mb-6">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow transition duration-200"
                >
                  Logout
                </button>
              </div>
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Profile
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProfileInfo profile={profile!} />
                  <UpdateProfile
                    token={token}
                    onProfileUpdated={refreshProfile}
                  />
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Rencana Makan
                </h2>
                <GenerateMealPlan token={token} />
              </section>
            </>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
