import { getAllFiles } from "@/services/file.service";
import { getRootFolders } from "@/services/folder.service";
import { getUserDashboardStats } from "@/services/user.service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Storify | Dashboard",
  description: "Manage your files and folders in your personal dashboard.",
};

export default async function UserDashboardPage() {
  const [statsRes, foldersRes, filesRes] = await Promise.all([
    getUserDashboardStats().catch(() => ({ success: false, data: null })),
    getRootFolders().catch(() => ({ success: false, data: [] })),
    getAllFiles({ folderId: "root" }).catch(() => ({
      success: false,
      data: [],
    })),
  ]);

  const stats = statsRes.success ? statsRes.data : null;
  const folders = foldersRes.success ? foldersRes.data : [];
  const files = filesRes.success ? filesRes.data : [];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">File Management Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Storage Usage Card */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Storage Usage</h3>
          <div className="text-2xl font-bold text-primary">
            {stats
              ? `${(stats.stats.usedStorage / (1024 * 1024 * 1024)).toFixed(2)} GB`
              : "0 GB"}{" "}
            /
            {stats
              ? ` ${(stats.stats.totalStorage / (1024 * 1024 * 1024)).toFixed(0)} GB`
              : " 10 GB"}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: `${stats?.stats.storageUsagePercentage || 0}%` }}
            ></div>
          </div>
        </div>

        {/* Files Count Card */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Total Files</h3>
          <div className="text-2xl font-bold text-primary">
            {stats?.stats.totalFiles || 0} /{" "}
            {stats?.package.totalFileLimit || 100}
          </div>
          <p className="text-sm text-muted-foreground">Files uploaded</p>
        </div>

        {/* Folders Count Card */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Folders</h3>
          <div className="text-2xl font-bold text-primary">
            {stats?.stats.totalFolders || 0}
          </div>
          <p className="text-sm text-muted-foreground">Total folders</p>
        </div>

        {/* Subscription Plan Card */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Current Plan</h3>
          <div className="text-2xl font-bold text-primary">
            {stats?.package.name || "Free"}
          </div>
          <p className="text-sm text-muted-foreground">Active Subscription</p>
        </div>
      </div>

      {/* File Management Area */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">My Files</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
              Upload File
            </button>
            <button className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10">
              New Folder
            </button>
          </div>
        </div>

        {/* File Browser */}
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
            <span>🏠</span>
            <span>/</span>
            <span className="text-foreground font-medium">Root</span>
          </div>

          {/* Files and Folders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Folders */}
            {folders &&
              folders.map((folder: any) => (
                <div
                  key={folder.id}
                  className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  <div className="text-4xl mb-2">📁</div>
                  <span className="text-sm font-medium truncate w-full text-center">
                    {folder.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {folder._count?.files || 0} items
                  </span>
                </div>
              ))}

            {/* Files */}
            {files &&
              files.map((file: any) => (
                <div
                  key={file.id}
                  className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  <div className="text-4xl mb-2">
                    {file.type.includes("image")
                      ? "🖼️"
                      : file.type.includes("pdf")
                        ? "📄"
                        : "📄"}
                  </div>
                  <span className="text-sm font-medium truncate w-full text-center">
                    {file.originalName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                </div>
              ))}

            {(!folders || folders.length === 0) &&
              (!files || files.length === 0) && (
                <div className="col-span-full py-10 text-center text-muted-foreground">
                  No files or folders found.
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
