// src/components/Profile/UpdateProfile.tsx
import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const API_BASE = "https://api.fuadfakhruz.id";

interface UpdateProfileProps {
  token: string;
  onProfileUpdated: () => void;
}

export function UpdateProfile({ token, onProfileUpdated }: UpdateProfileProps) {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = {
      email: (form.elements.namedItem("updateEmail") as HTMLInputElement).value,
      full_name: (form.elements.namedItem("updateFullName") as HTMLInputElement)
        .value,
      birth_date: (
        form.elements.namedItem("updateBirthDate") as HTMLInputElement
      ).value,
      gender: (form.elements.namedItem("updateGender") as HTMLSelectElement)
        .value,
      weight: Number(
        (form.elements.namedItem("updateWeight") as HTMLInputElement).value
      ),
      height: Number(
        (form.elements.namedItem("updateHeight") as HTMLInputElement).value
      ),
      activity_level: (
        form.elements.namedItem("updateActivityLevel") as HTMLSelectElement
      ).value,
    };
    try {
      const res = await fetch(`${API_BASE}/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Profile berhasil diperbarui!");
        onProfileUpdated();
      } else {
        alert(data.message || "Gagal memperbarui profile");
      }
    } catch (error) {
      console.error("Error saat update profile:", error);
      alert("Error saat update profile");
    }
  };

  return (
    <div className="border p-4 rounded shadow mt-6">
      <h3 className="text-xl font-semibold mb-2">Update Profile</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
        <Input type="email" name="updateEmail" placeholder="Email" />
        <Input type="text" name="updateFullName" placeholder="Full Name" />
        <Input type="date" name="updateBirthDate" />
        <select name="updateGender" className="border rounded px-3 py-2">
          <option value="">Pilih Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <Input type="number" name="updateWeight" placeholder="Weight (kg)" />
        <Input type="number" name="updateHeight" placeholder="Height (cm)" />
        <select name="updateActivityLevel" className="border rounded px-3 py-2">
          <option value="">Pilih Activity Level</option>
          <option value="sedentary">Sedentary</option>
          <option value="lightly active">Lightly Active</option>
          <option value="moderately active">Moderately Active</option>
          <option value="very active">Very Active</option>
        </select>
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white w-full"
        >
          Update Profile
        </Button>
      </form>
    </div>
  );
}
