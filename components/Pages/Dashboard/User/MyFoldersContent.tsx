"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { FileItem, Folder } from "@/interface/file.interface";
import {
  deleteFile,
  getFilesByFolderId,
  uploadFile,
} from "@/services/file.service";
import {
  createFolder,
  deleteFolder,
  getChildFolders,
  getRootFolders,
} from "@/services/folder.service";
import {
  ChevronRight,
  FileText,
  FolderOpen,
  Home,
  Image as ImageIcon,
  Loader2,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const MyFoldersContent = ({
  initialFolders = [],
  initialFiles = [],
}: {
  initialFolders?: Folder[];
  initialFiles?: FileItem[];
}) => {
  const [currentFolderId, setCurrentFolderId] = useState<string>("root");
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [files, setFiles] = useState<FileItem[]>(initialFiles);
  const [breadcrumbs, setBreadcrumbs] = useState<
    { id: string; name: string }[]
  >([{ id: "root", name: "My Folders" }]);
  const [loading, setLoading] = useState(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // Only fetch if we are NOT at root (since root is handled by server component)
    if (currentFolderId !== "root") {
      fetchContent(currentFolderId);
    }
  }, [currentFolderId]);

  const fetchContent = async (folderId: string) => {
    setLoading(true);
    try {
      let foldersData;
      if (folderId === "root") {
        const res = await getRootFolders();
        foldersData = res.success ? res.data : [];
      } else {
        const res = await getChildFolders(folderId);
        foldersData = res.success ? res.data : [];
      }

      const filesRes = await getFilesByFolderId(folderId);
      const filesData = filesRes.success ? filesRes.data : [];

      setFolders(foldersData);
      setFiles(filesData);
    } catch (_err) {
      toast.error("Failed to load content");
    } finally {
      setLoading(false);
    }
  };

  const handleFolderClick = (folder: Folder) => {
    setCurrentFolderId(folder.id);
    setBreadcrumbs([...breadcrumbs, { id: folder.id, name: folder.name }]);
  };

  const handleBreadcrumbClick = (id: string, index: number) => {
    setCurrentFolderId(id);
    setBreadcrumbs(breadcrumbs.slice(0, index + 1));
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
        fetchContent(currentFolderId);
      } else {
        toast.error(res.message || "Failed to create folder");
      }
    } catch (_err) {
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
        fetchContent(currentFolderId);
      } else {
        toast.error(res.message || "Upload failed");
      }
    } catch (_err) {
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
        fetchContent(currentFolderId);
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
        fetchContent(currentFolderId);
      }
    } catch (_err) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="p-6 font-epilogue">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-[#25324B]">My Folders</h1>
          <p className="text-gray-500 text-sm font-medium">
            Manage and organize your documents.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg font-semibold cursor-pointer hover:bg-primary/5 transition-colors">
            <Upload className="w-4 h-4" />
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
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Folder</span>
          </button>
        </div>
      </div>

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 mb-6 text-sm overflow-x-auto whitespace-nowrap pb-2">
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.id} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
            <button
              onClick={() => handleBreadcrumbClick(crumb.id, index)}
              className={`hover:text-primary transition-colors ${
                index === breadcrumbs.length - 1
                  ? "text-gray-900 font-bold"
                  : "text-gray-500 font-medium"
              }`}
            >
              {index === 0 ? <Home className="w-4 h-4" /> : crumb.name}
            </button>
          </div>
        ))}
      </nav>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-50 p-4 rounded-xl space-y-3"
            >
              <Skeleton className="w-16 h-16 rounded-lg mx-auto" />
              <Skeleton className="h-4 w-3/4 mx-auto" />
              <Skeleton className="h-3 w-1/2 mx-auto" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {/* List Folders */}
          {folders.map((folder) => (
            <div
              key={folder.id}
              className="group relative bg-white border border-gray-100 p-4 rounded-xl hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleFolderClick(folder)}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#F8F9FF] rounded-lg flex items-center justify-center mb-3">
                  <FolderOpen className="w-8 h-8 text-primary" />
                </div>
                <span className="text-sm font-bold text-[#25324B] truncate w-full">
                  {folder.name}
                </span>
                <span className="text-xs text-gray-400 font-medium mt-1">
                  {folder._count?.files || 0} items
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFolder(folder.id);
                }}
                className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* List Files */}
          {files.map((file) => (
            <div
              key={file.id}
              className="group relative bg-white border border-gray-100 p-4 rounded-xl hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#F8F9FF] rounded-lg flex items-center justify-center mb-3">
                  {file.type.includes("image") ? (
                    <ImageIcon className="w-8 h-8 text-[#56CDAD]" />
                  ) : (
                    <FileText className="w-8 h-8 text-[#FFB836]" />
                  )}
                </div>
                <span className="text-sm font-bold text-[#25324B] truncate w-full">
                  {file.originalName}
                </span>
                <span className="text-xs text-gray-400 font-medium mt-1">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFile(file.id);
                }}
                className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {folders.length === 0 && files.length === 0 && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <FolderOpen className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-[#25324B]">Empty Folder</h3>
              <p className="text-gray-400 text-sm max-w-xs">
                This folder is empty. Start organizing by creating a new folder
                or uploading a file.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Create Folder Modal Overlay */}
      {isCreateFolderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-extrabold text-[#25324B] mb-2">
              Create New Folder
            </h3>
            <p className="text-gray-500 text-sm mb-6 font-medium">
              Enter a name for your new directory.
            </p>

            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="e.g. Work Documents"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all mb-6 font-medium"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleCreateFolder()}
            />

            <div className="flex gap-3">
              <button
                onClick={() => setIsCreateFolderModalOpen(false)}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFolder}
                disabled={!newFolderName.trim()}
                className="flex-1 px-4 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
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
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-lg font-bold text-[#25324B]">
              Uploading file...
            </p>
            <p className="text-gray-500 text-sm">
              Please wait while we process your file.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFoldersContent;
