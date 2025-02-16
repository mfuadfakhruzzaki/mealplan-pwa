// src/components/Profile/UpdateProfile.tsx
import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const API_BASE = "https://apieat.fuadfakhruz.id";

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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Update Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <Input
            type="email"
            name="updateEmail"
            placeholder="Email"
            className="w-full"
          />
          <Input
            type="text"
            name="updateFullName"
            placeholder="Full Name"
            className="w-full"
          />
          <Input type="date" name="updateBirthDate" className="w-full" />
          <select
            name="updateGender"
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">Pilih Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <Input
            type="number"
            name="updateWeight"
            placeholder="Weight (kg)"
            className="w-full"
          />
          <Input
            type="number"
            name="updateHeight"
            placeholder="Height (cm)"
            className="w-full"
          />
          <select
            name="updateActivityLevel"
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">Pilih Activity Level</option>
            <option value="sedentary">Sedentary</option>
            <option value="lightly active">Lightly Active</option>
            <option value="moderately active">Moderately Active</option>
            <option value="very active">Very Active</option>
          </select>
          <Button type="submit" className="w-full">
            Update Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
