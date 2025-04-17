"use client";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      {/* Profile Settings */}
      <div className="bg-white/5 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Profile Settings</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-[#50a826]"
                defaultValue="John"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-[#50a826]"
                defaultValue="Doe"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-[#50a826]"
              defaultValue="john@example.com"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#50a826] text-white rounded-lg hover:bg-[#317e31] transition-colors"
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* Notification Settings */}
      <div className="bg-white/5 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
        <div className="space-y-4">
          {[
            { title: "Email Notifications", description: "Receive updates via email" },
            { title: "Push Notifications", description: "Get instant notifications" },
            { title: "Marketing Updates", description: "Receive marketing communications" },
          ].map((setting, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{setting.title}</h3>
                <p className="text-sm text-white/60">{setting.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={index === 0} />
                <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#50a826]"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white/5 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Security Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Current Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-[#50a826]"
              placeholder="Enter current password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-[#50a826]"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-[#50a826]"
              placeholder="Confirm new password"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#50a826] text-white rounded-lg hover:bg-[#317e31] transition-colors"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
} 