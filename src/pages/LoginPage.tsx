import { Login } from "@/components/auth/Login";

interface LoginPageProps {
  onLoginSuccess: (token: string) => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <Login onLoginSuccess={onLoginSuccess} />
      </div>
    </div>
  );
}
