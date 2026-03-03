import { Cloud, FolderOpen, HardDrive, Upload } from "lucide-react";

interface UserDashboardStats {
  totalFiles: number;
  totalFolders: number;
  storageUsed: number;
  recentUploads: number;
}

interface UserDashboardContentProps {
  stats?: UserDashboardStats;
}

const UserDashboardContent = ({ stats }: UserDashboardContentProps) => {
  const userStats = [
    {
      label: "Total Files",
      value: stats?.totalFiles || 0,
      icon: Cloud,
      color: "bg-primary",
    },
    {
      label: "Total Folders",
      value: stats?.totalFolders || 0,
      icon: FolderOpen,
      color: "bg-[#56CDAD]",
    },
    {
      label: "Storage Used",
      value: `${(stats?.storageUsed || 0).toFixed(1)} GB`,
      icon: HardDrive,
      color: "bg-[#FFB836]",
    },
    {
      label: "Recent Uploads",
      value: stats?.recentUploads || 0,
      icon: Upload,
      color: "bg-[#4F46E5]",
    },
  ];

  return (
    <div className="font-epilogue p-6 space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-[#25324B]">
          User Dashboard
        </h2>
        <p className="text-gray-500 font-medium text-sm">
          Manage your files and track storage usage.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {userStats?.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} p-6 text-white rounded-lg flex items-center justify-between group cursor-pointer transition-all`}
          >
            <div>
              <span className="text-5xl font-extrabold block mb-2">
                {stat.value}
              </span>
              <p className="text-white/90 font-semibold leading-tight">
                {stat.label}
              </p>
            </div>
            <div className="transform group-hover:translate-x-1 transition-transform">
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {/* Storage Usage */}
      <div className="bg-white border border-gray-100 p-6 rounded-lg">
        <h3 className="text-lg font-bold text-[#25324B] mb-4">
          Storage Usage
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Used Storage</span>
            <span className="text-sm font-semibold text-gray-900">
              {(stats?.storageUsed || 0).toFixed(1)} GB / 10 GB
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(((stats?.storageUsed || 0) / 10) * 100, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">
            {Math.max(0, 10 - (stats?.storageUsed || 0)).toFixed(1)} GB available
          </p>
        </div>
      </div>

      {/* Recent Files */}
      <div className="bg-white border border-gray-100 p-6 rounded-lg">
        <h3 className="text-lg font-bold text-[#25324B] mb-4">
          Recent Files
        </h3>
        <p className="text-gray-500">No recent files available</p>
      </div>

      {/* Subscription Plan */}
      <div className="bg-white border border-gray-100 p-6 rounded-lg">
        <h3 className="text-lg font-bold text-[#25324B] mb-4">
          Your Subscription Plan
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-900">Free Plan</h4>
            <p className="text-sm text-gray-500">10 GB Storage • Basic Features</p>
          </div>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
            Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardContent;
