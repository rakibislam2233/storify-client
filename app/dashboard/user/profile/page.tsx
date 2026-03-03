import UserProfileContent from "@/components/Pages/Dashboard/User/UserProfileContent";
import { getMyProfile } from "@/services/user.service";

const UserProfilePage = async () => {
  const profile = await getMyProfile();
  return <UserProfileContent profile={profile} />;
};

export default UserProfilePage;
