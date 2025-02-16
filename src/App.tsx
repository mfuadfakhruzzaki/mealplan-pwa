// src/App.tsx

import { JSX, useState } from "react";
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

// Komponen shadcn/ui
import { Button } from "@/components/ui/button";

// Ikon lucide-react (pastikan sudah install: npm i lucide-react)
import {
  Home as HomeIcon,
  User as UserIcon,
  Clipboard as ListIcon,
  LogOut as LogOutIcon,
  Edit as EditIcon,
} from "lucide-react";

const API_BASE = "https://apieat.fuadfakhruz.id";

function App() {
  // State
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  // Ambil data profil
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

  // Saat login berhasil
  const handleLoginSuccess = (token: string) => {
    setToken(token);
    fetchProfile(token);
  };

  // Logout
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

  // Refresh profile setelah update
  const refreshProfile = () => {
    if (token) {
      fetchProfile(token);
    }
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Top Bar */}
        {token && (
          <header className="flex items-center justify-between bg-blue-600 px-4 py-3 text-white shadow">
            <h1 className="text-lg font-bold">Eatgorithm</h1>
            <Button
              variant="ghost"
              className="text-white"
              onClick={handleLogout}
            >
              <LogOutIcon className="w-5 h-5 mr-1" />
              Logout
            </Button>
          </header>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {!token ? (
            <Routes>
              <Route
                path="/login"
                element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
              />
              <Route path="/register" element={<RegisterPage />} />
              {/* Jika belum login, arahkan ke login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          ) : (
            <Routes>
              {/* Home */}
              <Route
                path="/"
                element={
                  <HomeScreen
                    profile={profile}
                    onGenerateMealPlan={() => console.log("FAB clicked!")}
                  />
                }
              />
              {/* Profile */}
              <Route
                path="/profile"
                element={<ProfileScreen profile={profile} loading={!profile} />}
              />
              {/* Update Profile */}
              <Route
                path="/update"
                element={
                  <UpdateScreen
                    token={token}
                    onProfileUpdated={refreshProfile}
                  />
                }
              />
              {/* Meal Plan */}
              <Route
                path="/mealplan"
                element={<MealPlanScreen token={token} />}
              />
              {/* Jika sudah login dan route tidak dikenali, arahkan ke / */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </div>

        {/* Bottom Navigation (Hanya tampil jika sudah login) */}
        {token && <BottomNav />}
      </div>
    </Router>
  );
}

export default App;

/* 
  ------------------------------------------------------------
  COMPONENTS SECTION 
  (Anda bisa memisahkan ke file terpisah; 
   di sini semua ditaruh jadi satu demi kejelasan contoh)
  ------------------------------------------------------------
*/

// Contoh Layar "Home" Sederhana
function HomeScreen({
  profile,
  onGenerateMealPlan,
}: {
  profile: Profile | null;
  onGenerateMealPlan: () => void;
}) {
  return (
    <div className="p-4">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-6 mb-4 shadow">
        <h2 className="text-2xl font-bold">
          Selamat Datang{profile && `, ${profile.full_name}`}
        </h2>
        <p className="mt-2 text-sm text-white/90">
          Ini adalah beranda Eatgorithm. Gunakan menu di bawah untuk navigasi.
        </p>
      </div>

      {/* Contoh "Floating Action Button" untuk generate meal plan */}
      <div className="relative">
        <div className="flex flex-col items-center">
          <p className="text-center text-sm text-gray-500 mb-2">
            Tekan tombol di bawah ini untuk membuat rencana makan
          </p>
          <Button
            onClick={onGenerateMealPlan}
            className="rounded-full bg-green-600 text-white px-6 py-3 shadow"
          >
            Generate Meal Plan
          </Button>
        </div>
      </div>
    </div>
  );
}

// Contoh Layar "Profile"
function ProfileScreen({
  profile,
  loading,
}: {
  profile: Profile | null;
  loading: boolean;
}) {
  return (
    <div className="p-4">
      {loading ? (
        <p className="text-center text-gray-500">Memuat data profile...</p>
      ) : (
        <ProfileInfo profile={profile!} />
      )}
    </div>
  );
}

// Contoh Layar "Update Profile"
function UpdateScreen({
  token,
  onProfileUpdated,
}: {
  token: string;
  onProfileUpdated: () => void;
}) {
  return (
    <div className="p-4">
      <UpdateProfile token={token} onProfileUpdated={onProfileUpdated} />
    </div>
  );
}

// Contoh Layar "Meal Plan"
function MealPlanScreen({ token }: { token: string }) {
  return (
    <div className="p-4">
      <GenerateMealPlan token={token} />
    </div>
  );
}

// Bottom Navigation
function BottomNav() {
  return (
    <nav className="bg-white border-t border-gray-200 shadow">
      <div className="flex justify-around py-2">
        <NavItem to="/" icon={<HomeIcon className="w-5 h-5" />} label="Home" />
        <NavItem
          to="/profile"
          icon={<UserIcon className="w-5 h-5" />}
          label="Profile"
        />
        <NavItem
          to="/update"
          icon={<EditIcon className="w-5 h-5" />}
          label="Update"
        />
        <NavItem
          to="/mealplan"
          icon={<ListIcon className="w-5 h-5" />}
          label="MealPlan"
        />
      </div>
    </nav>
  );
}

// Komponen Item untuk BottomNav
function NavItem({
  to,
  icon,
  label,
}: {
  to: string;
  icon: JSX.Element;
  label: string;
}) {
  return (
    <Link
      to={to}
      className="flex flex-col items-center justify-center text-xs text-gray-600 hover:text-blue-600"
    >
      {icon}
      <span className="mt-1">{label}</span>
    </Link>
  );
}
