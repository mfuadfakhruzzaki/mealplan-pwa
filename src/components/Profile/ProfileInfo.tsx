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
        {profile ? (
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(profile, null, 2)}
          </pre>
        ) : (
          <p>Loading profile...</p>
        )}
      </CardContent>
    </Card>
  );
}
