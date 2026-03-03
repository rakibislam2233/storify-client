/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IUser } from "@/interface/user.interface";
import { getMyProfile, updateMyProfile } from "@/services/user.service";
import { Camera, Phone, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
interface UserProfileContentProps {
  profile?: IUser;
}

const UserProfileContent = ({
  profile: initialProfile,
}: UserProfileContentProps) => {
  const [profile, setProfile] = useState<IUser | null>(initialProfile || null);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    fullName: initialProfile?.fullName || "",
    phone: initialProfile?.phoneNumber || "",
    bio: initialProfile?.bio || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const updateData = {
        ...formData,
      };
      await updateMyProfile(updateData);
      toast.success("Profile updated successfully!");
      // Refresh profile data
      const updatedProfile = await getMyProfile();
      setProfile(updatedProfile);
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-[#25324B]">My Profile</h2>
        <p className="text-gray-500 font-medium text-sm">
          Update your professional identity.
        </p>
      </div>

      <div className="w-full space-y-8 ">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white border border-gray-100 p-8 shadow-none rounded">
            <div className="flex items-center gap-8 mb-10 pb-10 border-b border-gray-50">
              <div className="relative group cursor-pointer">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-50 border border-gray-100 relative">
                  {profile?.profileImage ? (
                    <Image
                      src={profile?.profileImage}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#25324B] mb-2">
                  {profile?.fullName || "User Name"}
                </h3>
                <p className="text-gray-500 text-sm">{profile?.email}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Full Name"
                  name="fullName"
                  value={profile?.fullName || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
                <FormInput
                  label="Email"
                  name="email"
                  value={profile?.email || ""}
                  disabled
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                className="rounded-none border-gray-200 text-[#25324B] font-bold h-12 px-8"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={updating}
                className="bg-primary text-white rounded-none h-12 px-8 font-bold shadow-none"
              >
                {updating ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfileContent;
