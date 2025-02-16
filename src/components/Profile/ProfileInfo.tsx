// src/components/Profile/ProfileInfo.tsx
import { Profile } from "@/interfaces/profile";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ProfileInfoProps {
  profile: Profile;
}

export function ProfileInfo({ profile }: ProfileInfoProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Username:</span>
            <span>{profile.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Email:</span>
            <span>{profile.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Full Name:</span>
            <span>{profile.full_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Birth Date:</span>
            <span>{profile.birth_date}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Age:</span>
            <span>{profile.age}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Gender:</span>
            <span>{profile.gender}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Weight (kg):</span>
            <span>{profile.weight}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Height (cm):</span>
            <span>{profile.height}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Activity Level:</span>
            <span>{profile.activity_level}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">
              Calories Required:
            </span>
            <span>{profile.daily_calories_required.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
