import { Register } from "@/components/auth/Register";

export function RegisterPage() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-4 text-center">Register</h1>
      <Register />
    </div>
  );
}
