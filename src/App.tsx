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

const API_BASE = "https://api.fuadfakhruz.id";

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
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold mb-4 text-center">Eatgorithm</h1>
          {!token ? (
            <>
              {/* Navigasi untuk memilih antara Login dan Register */}
              <div className="flex justify-center space-x-4 mb-6">
                <Link
                  to="/login"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
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
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              </div>
              <ProfileInfo profile={profile!} />
              <UpdateProfile token={token} onProfileUpdated={refreshProfile} />
              <GenerateMealPlan token={token} />
            </>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
