import { Metadata } from "next";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileContent } from "@/components/profile/profile-content";
import { ProfileSecurity } from "@/components/profile/profile-security";
import { Separator } from "@/components/ui/separator";
import { Shell } from "@/components/shell";

export const metadata: Metadata = {
  title: "Your Profile - Account Settings",
  description: "Manage your profile settings and preferences",
};

export default function ProfilePage() {
  return (
    <Shell>
      <div className="space-y-8">
        <ProfileHeader />
        <Separator />
        <ProfileContent />
        <Separator />
        <ProfileSecurity />
      </div>
    </Shell>
  );
}