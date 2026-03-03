import MyFoldersContent from "@/components/Pages/Dashboard/User/MyFoldersContent";
import { FileItem, Folder } from "@/interface/file.interface";
import { getFilesByFolderId } from "@/services/file.service";
import {
  getChildFolders,
  getFolderAncestry,
  getRootFolders,
} from "@/services/folder.service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Folders | Storify",
  description: "Manage your folders and files.",
};

export default async function MyFoldersPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  const currentFolderId = slug.length > 0 ? slug[slug.length - 1] : "root";

  // Fetch folders, files, and ancestry for breadcrumbs
  const [foldersRes, filesRes, ancestryRes] = await Promise.all([
    currentFolderId === "root"
      ? getRootFolders().catch(() => ({ success: false, data: [] }))
      : getChildFolders(currentFolderId).catch(() => ({
          success: false,
          data: [],
        })),
    getFilesByFolderId(currentFolderId).catch(() => ({
      success: false,
      data: [],
    })),
    currentFolderId === "root"
      ? Promise.resolve({ success: true, data: [] })
      : getFolderAncestry(currentFolderId).catch(() => ({
          success: false,
          data: [],
        })),
  ]);

  return (
    <MyFoldersContent
      currentFolderId={currentFolderId}
      initialFolders={foldersRes.success ? (foldersRes.data as Folder[]) : []}
      initialFiles={filesRes.success ? (filesRes.data as FileItem[]) : []}
      ancestry={ancestryRes.success ? (ancestryRes.data as Folder[]) : []}
      slug={slug}
    />
  );
}
