import MyFoldersContent from "@/components/Pages/Dashboard/User/MyFoldersContent";
import { getFilesByFolderId } from "@/services/file.service";
import { getChildFolders, getRootFolders } from "@/services/folder.service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Folders | Storify",
  description: "Manage your folders and files.",
};

export default async function MyFoldersPage({
  searchParams,
}: {
  searchParams: { folderId?: string };
}) {
  const folderId = searchParams.folderId || "root";

  const [foldersRes, filesRes] = await Promise.all([
    folderId === "root"
      ? getRootFolders().catch(() => ({ success: false, data: [] }))
      : getChildFolders(folderId).catch(() => ({ success: false, data: [] })),
    getFilesByFolderId(folderId).catch(() => ({
      success: false,
      data: [],
    })),
  ]);

  return (
    <MyFoldersContent
      currentFolderId={folderId}
      initialFolders={foldersRes.success ? (foldersRes.data as any) : []}
      initialFiles={filesRes.success ? (filesRes.data as any) : []}
    />
  );
}
