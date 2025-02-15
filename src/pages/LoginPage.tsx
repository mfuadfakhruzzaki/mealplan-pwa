import { Login } from "@/components/auth/Login";

interface LoginPageProps {
  onLoginSuccess: (token: string) => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
      <Login onLoginSuccess={onLoginSuccess} />
    </div>
  );
}
