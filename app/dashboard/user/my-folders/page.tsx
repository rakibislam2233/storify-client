import MyFoldersContent from "@/components/Pages/Dashboard/User/MyFoldersContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Folders | Storify",
  description: "Manage your folders and files.",
};

const MyFoldersPage = () => {
  return <MyFoldersContent />;
};

export default MyFoldersPage;
