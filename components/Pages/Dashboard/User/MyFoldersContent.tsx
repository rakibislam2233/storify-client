"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { FileItem, Folder } from "@/interface/file.interface";
import { cn } from "@/lib/utils";
import { deleteFile, uploadFile } from "@/services/file.service";
import { createFolder, deleteFolder } from "@/services/folder.service";
import {
  ChevronRight,
  FileArchive,
  FileCode,
  FileText,
  Film,
  Filter,
  FolderOpen,
  Image as ImageIcon,
  LayoutGrid,
  List,
  Loader2,
  MoreVertical,
  Music,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const MyFoldersContent = ({
  initialFolders = [],
  initialFiles = [],
  currentFolderId = "root",
}: {
  initialFolders?: Folder[];
  initialFiles?: FileItem[];
  currentFolderId?: string;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isGridView, setIsGridView] = useState(true);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const folders = initialFolders;
  const files = initialFiles;

  const breadcrumbs = [{ id: "root", name: "My Files" }];
  if (currentFolderId !== "root") {
    breadcrumbs.push({ id: currentFolderId, name: "Projects" });
    breadcrumbs.push({ id: "current", name: "Storify SaaS" });
  }

  const handleFolderClick = (folder: Folder) => {
    startTransition(() => {
      router.push(`?folderId=${folder.id}`);
    });
  };

  const handleBreadcrumbClick = (id: string) => {
    startTransition(() => {
      if (id === "root") {
        router.push("/dashboard/user/my-folders");
      } else {
        router.push(`?folderId=${id}`);
      }
    });
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;
    try {
      const parentId = currentFolderId === "root" ? undefined : currentFolderId;
      const res = await createFolder({ name: newFolderName, parentId });
      if (res.success) {
        toast.success("Folder created successfully");
        setNewFolderName("");
        setIsCreateFolderModalOpen(false);
        startTransition(() => {
          router.refresh();
        });
      } else {
        toast.error(res.message || "Failed to create folder");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (currentFolderId !== "root") {
        formData.append("folderId", currentFolderId);
      }

      const res = await uploadFile(formData);
      if (res.success) {
        toast.success("File uploaded successfully");
        startTransition(() => {
          router.refresh();
        });
      } else {
        toast.error(res.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during upload");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteFolder = async (id: string) => {
    if (!confirm("Are you sure you want to delete this folder?")) return;
    try {
      const res = await deleteFolder(id);
      if (res.success) {
        toast.success("Folder deleted");
        startTransition(() => {
          router.refresh();
        });
      }
    } catch (_err) {
      toast.error("Failed to delete");
    }
  };

  const handleDeleteFile = async (id: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return;
    try {
      const res = await deleteFile(id);
      if (res.success) {
        toast.success("File deleted");
        startTransition(() => {
          router.refresh();
        });
      }
    } catch (_err) {
      toast.error("Failed to delete");
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const getFileIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes("pdf"))
      return <FileText className="w-10 h-10 text-[#FF4D4F]" />;
    if (t.includes("image"))
      return <ImageIcon className="w-10 h-10 text-[#56CDAD]" />;
    if (t.includes("video"))
      return <Film className="w-10 h-10 text-[#8E00CC]" />;
    if (t.includes("audio"))
      return <Music className="w-10 h-10 text-[#FFB836]" />;
    if (
      t.includes("javascript") ||
      t.includes("typescript") ||
      t.includes("code")
    )
      return <FileCode className="w-10 h-10 text-[#25324B]" />;
    if (t.includes("zip") || t.includes("rar") || t.includes("archive"))
      return <FileArchive className="w-10 h-10 text-[#64748B]" />;
    return <FileText className="w-10 h-10 text-[#64748B]" />;
  };

  return (
    <div className="p-8 font-epilogue bg-white min-h-screen">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.id} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="w-4 h-4 text-gray-300" />}
              <button
                onClick={() => handleBreadcrumbClick(crumb.id)}
                className={cn(
                  "transition-colors",
                  index === breadcrumbs.length - 1
                    ? "text-[#25324B] font-extrabold"
                    : "text-gray-400 font-bold hover:text-primary",
                )}
              >
                {crumb.name}
              </button>
            </div>
          ))}
        </nav>

        {/* Top Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
            <button
              onClick={() => setIsGridView(true)}
              className={cn(
                "p-2 rounded-lg transition-all",
                isGridView
                  ? "bg-white shadow-sm text-primary"
                  : "text-gray-400 hover:text-gray-600",
              )}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsGridView(false)}
              className={cn(
                "p-2 rounded-lg transition-all",
                !isGridView
                  ? "bg-white shadow-sm text-primary"
                  : "text-gray-400 hover:text-gray-600",
              )}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          <button className="p-2.5 text-gray-400 hover:text-gray-600 bg-white border border-gray-100 rounded-xl shadow-sm">
            <Filter className="w-5 h-5" />
          </button>

          <div className="h-10 w-px bg-gray-100 mx-2" />

          <label className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold cursor-pointer hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            <Upload className="w-5 h-5" />
            <span>Upload File</span>
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </label>
          <button
            onClick={() => setIsCreateFolderModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-white border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary/5 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>New Folder</span>
          </button>
        </div>
      </div>

      <div
        className={cn(
          "gap-6",
          isGridView
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
            : "flex flex-col",
        )}
      >
        {isPending ? (
          Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 p-6 rounded-2xl animate-pulse"
            >
              <Skeleton className="w-12 h-12 rounded-xl mb-4" />
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))
        ) : (
          <>
            {/* Folders */}
            {folders.map((folder) => (
              <div
                key={folder.id}
                className={cn(
                  "group relative bg-white border border-gray-100 p-6 rounded-2xl hover:shadow-xl transition-all cursor-pointer ring-offset-2",
                  isGridView
                    ? "flex flex-col"
                    : "flex items-center justify-between",
                )}
                onClick={() => handleFolderClick(folder)}
              >
                <div
                  className={cn(
                    "flex items-center",
                    isGridView ? "flex-col text-center" : "gap-4",
                  )}
                >
                  <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-4 text-amber-500 group-hover:scale-110 transition-transform">
                    <FolderOpen className="w-8 h-8 fill-amber-500" />
                  </div>
                  <div className={isGridView ? "text-center" : "text-left"}>
                    <h3 className="text-base font-extrabold text-[#25324B] mb-1 truncate max-w-[180px]">
                      {folder.name}
                    </h3>
                    <p className="text-xs text-gray-400 font-bold">
                      {folder.totalFiles || 0} files •{" "}
                      {formatSize(folder.totalSize || 0)}
                    </p>
                  </div>
                </div>

                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuId(
                        activeMenuId === folder.id ? null : folder.id,
                      );
                    }}
                    className="p-1.5 text-gray-300 hover:text-gray-500 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  {activeMenuId === folder.id && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-2xl z-20 py-2 animate-in fade-in zoom-in-95 duration-200">
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                        <Plus className="w-4 h-4" /> Rename
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                        <Upload className="w-4 h-4" /> Share
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFolder(folder.id);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Files */}
            {files.map((file) => (
              <div
                key={file.id}
                className={cn(
                  "group relative bg-white border border-gray-100 p-6 rounded-2xl hover:shadow-xl transition-all ring-offset-2",
                  isGridView
                    ? "flex flex-col"
                    : "flex items-center justify-between",
                )}
              >
                <div
                  className={cn(
                    "flex items-center",
                    isGridView ? "flex-col text-center" : "gap-4",
                  )}
                >
                  <div className="w-14 h-14 bg-blue-50/50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {getFileIcon(file.type)}
                  </div>
                  <div className={isGridView ? "text-center" : "text-left"}>
                    <h3 className="text-base font-extrabold text-[#25324B] mb-1 truncate max-w-[180px]">
                      {file.originalName}
                    </h3>
                    <p className="text-xs text-gray-400 font-bold">
                      {formatSize(file.size)} •{" "}
                      {new Date(file.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuId(
                        activeMenuId === file.id ? null : file.id,
                      );
                    }}
                    className="p-1.5 text-gray-300 hover:text-gray-500 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  {activeMenuId === file.id && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-2xl z-20 py-2 animate-in fade-in zoom-in-95 duration-200">
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                        <Plus className="w-4 h-4" /> Rename
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                        <Upload className="w-4 h-4" /> Download
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFile(file.id);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {folders.length === 0 && files.length === 0 && (
              <div className="col-span-full py-40 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <FolderOpen className="w-12 h-12 text-gray-200" />
                </div>
                <h3 className="text-xl font-extrabold text-[#25324B] mb-2">
                  No files or folders found
                </h3>
                <p className="text-gray-400 text-sm max-w-sm font-medium">
                  This location is empty. Start organizing your files by
                  creating a new folder or uploading a file.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Create Folder Modal Overlay */}
      {isCreateFolderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-black text-[#25324B] mb-2 text-center">
              Create New Folder
            </h3>
            <p className="text-gray-500 text-sm mb-8 font-medium text-center">
              Enter a name for your new directory.
            </p>

            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="e.g. Work Documents"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all mb-8 font-bold text-[#25324B]"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleCreateFolder()}
            />

            <div className="flex gap-4">
              <button
                onClick={() => setIsCreateFolderModalOpen(false)}
                className="flex-1 px-4 py-4 border border-gray-100 rounded-2xl font-extrabold text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFolder}
                disabled={!newFolderName.trim()}
                className="flex-1 px-4 py-4 bg-primary text-white rounded-2xl font-extrabold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
              >
                Create Folder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Uploading Progress Overlay */}
      {isUploading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
            <p className="text-xl font-black text-[#25324B] mb-1">
              Uploading file...
            </p>
            <p className="text-gray-400 font-bold text-sm">
              Please wait while we process your file.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFoldersContent;
