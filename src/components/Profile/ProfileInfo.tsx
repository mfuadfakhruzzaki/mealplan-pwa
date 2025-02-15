import { Profile } from "@/interfaces/profile";

interface ProfileInfoProps {
  profile: Profile;
}

export function ProfileInfo({ profile }: ProfileInfoProps) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-2">User Profile</h2>
      {profile ? (
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(profile, null, 2)}
        </pre>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}
