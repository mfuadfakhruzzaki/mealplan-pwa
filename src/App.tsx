// src/App.tsx
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

// Halaman autentikasi
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";

// Komponen profile & meal plan
import { ProfileInfo } from "@/components/Profile/ProfileInfo";
import { UpdateProfile } from "@/components/Profile/UpdateProfile";
import { GenerateMealPlan } from "@/components/MealPlan/GenerateMealPlan";

// Interface profile
import { Profile } from "@/interfaces/profile";

// Import komponen shadcn/ui (sesuaikan path sesuai struktur proyek)
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

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
        <div className="w-full max-w-4xl bg-white shadow-2xl rounded-lg p-6 md:p-8">
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
              <nav className="flex justify-center gap-4 mb-8">
                <Link to="/login">
                  <Button variant="default" className="px-6 py-3">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="secondary" className="px-6 py-3">
                    Register
                  </Button>
                </Link>
              </nav>
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
                <Button variant="destructive" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
              <section className="mb-8 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>Data profil Anda</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {profile ? (
                      <ProfileInfo profile={profile} />
                    ) : (
                      <p className="text-sm text-gray-500">Memuat data...</p>
                    )}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Update Profile</CardTitle>
                    <CardDescription>
                      Perbarui informasi profil Anda
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UpdateProfile
                      token={token}
                      onProfileUpdated={refreshProfile}
                    />
                  </CardContent>
                </Card>
              </section>
              <section>
                <Card>
                  <CardHeader>
                    <CardTitle>Rencana Makan</CardTitle>
                    <CardDescription>
                      Hasil generate rencana makan berdasarkan data Anda
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <GenerateMealPlan token={token} />
                  </CardContent>
                </Card>
              </section>
            </>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
