import MyFoldersContent from "@/components/Pages/Dashboard/User/MyFoldersContent";
import { getAllFiles } from "@/services/file.service";
import { getRootFolders } from "@/services/folder.service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Folders | Storify",
  description: "Manage your folders and files.",
};

export default async function MyFoldersPage() {
  const [foldersRes, filesRes] = await Promise.all([
    getRootFolders().catch(() => ({ success: false, data: [] })),
    getAllFiles({ folderId: "root" }).catch(() => ({
      success: false,
      data: [],
    })),
  ]);

  return (
    <MyFoldersContent
      initialFolders={foldersRes.success ? foldersRes.data : []}
      initialFiles={filesRes.success ? filesRes.data : []}
    />
  );
}
