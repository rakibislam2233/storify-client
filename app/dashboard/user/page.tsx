import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Storify | Dashboard",
  description: "Manage your files and folders in your personal dashboard.",
};

export default function UserDashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">File Management Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Storage Usage Card */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Storage Usage</h3>
          <div className="text-2xl font-bold text-primary">2.5 GB / 10 GB</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: '25%' }}></div>
          </div>
        </div>

        {/* Files Count Card */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Total Files</h3>
          <div className="text-2xl font-bold text-primary">45 / 100</div>
          <p className="text-sm text-muted-foreground">Files uploaded</p>
        </div>

        {/* Folders Count Card */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Folders</h3>
          <div className="text-2xl font-bold text-primary">12</div>
          <p className="text-sm text-muted-foreground">Total folders</p>
        </div>

        {/* Subscription Plan Card */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Current Plan</h3>
          <div className="text-2xl font-bold text-primary">Silver</div>
          <p className="text-sm text-muted-foreground">$9/month</p>
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
            <span>Documents</span>
            <span>/</span>
            <span className="text-foreground font-medium">Projects</span>
          </div>

          {/* Files and Folders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Folder Example */}
            <div className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="text-4xl mb-2">📁</div>
              <span className="text-sm font-medium">Documents</span>
              <span className="text-xs text-muted-foreground">5 items</span>
            </div>

            {/* File Examples */}
            <div className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="text-4xl mb-2">📄</div>
              <span className="text-sm font-medium">report.pdf</span>
              <span className="text-xs text-muted-foreground">2.5 MB</span>
            </div>

            <div className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="text-4xl mb-2">🖼️</div>
              <span className="text-sm font-medium">image.jpg</span>
              <span className="text-xs text-muted-foreground">1.2 MB</span>
            </div>

            <div className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="text-4xl mb-2">📊</div>
              <span className="text-sm font-medium">data.xlsx</span>
              <span className="text-xs text-muted-foreground">856 KB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
