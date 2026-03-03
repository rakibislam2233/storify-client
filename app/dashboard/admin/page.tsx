import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Storify | Admin Dashboard",
  description: "Manage subscription plans and user accounts.",
};

const AdminDashboardPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Users Card */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <div className="text-2xl font-bold text-primary">1,234</div>
          <p className="text-sm text-muted-foreground">+12% from last month</p>
        </div>

        {/* Active Subscriptions Card */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Active Subscriptions</h3>
          <div className="text-2xl font-bold text-primary">892</div>
          <p className="text-sm text-muted-foreground">72% of users</p>
        </div>

        {/* Revenue Card */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Monthly Revenue</h3>
          <div className="text-2xl font-bold text-primary">$12,456</div>
          <p className="text-sm text-muted-foreground">+8% from last month</p>
        </div>

        {/* Storage Used Card */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Total Storage Used</h3>
          <div className="text-2xl font-bold text-primary">2.5 TB</div>
          <p className="text-sm text-muted-foreground">Across all users</p>
        </div>
      </div>

      {/* Subscription Plans Management */}
      <div className="bg-white border rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Subscription Plans</h2>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
            Add New Plan
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Plan Name</th>
                <th className="text-left p-3">Price</th>
                <th className="text-left p-3">Storage</th>
                <th className="text-left p-3">Max Files</th>
                <th className="text-left p-3">Users</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">Free</td>
                <td className="p-3">$0</td>
                <td className="p-3">1 GB</td>
                <td className="p-3">10</td>
                <td className="p-3">342</td>
                <td className="p-3">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                  <button className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">Silver</td>
                <td className="p-3">$9</td>
                <td className="p-3">10 GB</td>
                <td className="p-3">100</td>
                <td className="p-3">456</td>
                <td className="p-3">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                  <button className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">Gold</td>
                <td className="p-3">$19</td>
                <td className="p-3">50 GB</td>
                <td className="p-3">500</td>
                <td className="p-3">289</td>
                <td className="p-3">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                  <button className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">Diamond</td>
                <td className="p-3">$39</td>
                <td className="p-3">Unlimited</td>
                <td className="p-3">Unlimited</td>
                <td className="p-3">147</td>
                <td className="p-3">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                  <button className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Users */}
      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Recent Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">User</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Plan</th>
                <th className="text-left p-3">Storage Used</th>
                <th className="text-left p-3">Joined</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">John Doe</td>
                <td className="p-3">john@example.com</td>
                <td className="p-3"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">Silver</span></td>
                <td className="p-3">2.1 GB</td>
                <td className="p-3">2024-01-15</td>
                <td className="p-3">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">View</button>
                  <button className="text-red-600 hover:text-red-800">Suspend</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">Jane Smith</td>
                <td className="p-3">jane@example.com</td>
                <td className="p-3"><span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Gold</span></td>
                <td className="p-3">15.3 GB</td>
                <td className="p-3">2024-01-10</td>
                <td className="p-3">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">View</button>
                  <button className="text-red-600 hover:text-red-800">Suspend</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
