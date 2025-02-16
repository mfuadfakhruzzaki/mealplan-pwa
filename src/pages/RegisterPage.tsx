import { Register } from "@/components/auth/Register";

export function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Register</h1>
        <Register />
      </div>
    </div>
  );
}
