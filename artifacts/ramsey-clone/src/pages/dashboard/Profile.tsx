import { useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { User, Camera, CheckCircle2, Shield, Eye, EyeOff } from "lucide-react";

const inputClass =
  "w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-[#003561] placeholder:text-gray-400 outline-none focus:border-[#0073B9] focus:ring-2 focus:ring-[#0073B9]/10 transition-all";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [profileSaved, setProfileSaved] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ firstName, lastName, phone });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords don't match");
      return;
    }
    setPasswordSaved(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordSaved(false), 3000);
  };

  const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      updateUser({ profilePicture: result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#003561]">Profile Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account information</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-[#003561] flex items-center justify-center">
              {user?.profilePicture ? (
                <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-10 h-10 text-white" />
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-8 h-8 bg-[#0073B9] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#005a94] transition-colors"
            >
              <Camera className="w-4 h-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePictureUpload}
              className="hidden"
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-[#003561]">{user?.firstName} {user?.lastName}</h3>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            <p className="text-xs text-gray-400 mt-1">{user?.accountType}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleProfileSave} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
        <h3 className="font-semibold text-[#003561] mb-4">Personal Information</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1.5">First Name</label>
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1.5">Last Name</label>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClass} />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">Email Address</label>
            <input value={user?.email || ""} disabled className="w-full px-4 py-3 bg-gray-100 rounded-xl border border-gray-200 text-gray-400 cursor-not-allowed" />
            <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">Phone Number</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="(555) 123-4567" />
          </div>
        </div>
        <div className="flex items-center gap-3 mt-5">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#0073B9] hover:bg-[#005a94] text-white rounded-xl font-medium transition-colors"
          >
            Save Changes
          </button>
          {profileSaved && (
            <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" /> Saved
            </span>
          )}
        </div>
      </form>

      <form onSubmit={handlePasswordSave} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-[#003561]" />
          <h3 className="font-semibold text-[#003561]">Security</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">Current Password</label>
            <div className="relative">
              <input
                type={showCurrentPw ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={inputClass}
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPw(!showCurrentPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">New Password</label>
            <div className="relative">
              <input
                type={showNewPw ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={inputClass}
                placeholder="Min. 8 characters"
              />
              <button
                type="button"
                onClick={() => setShowNewPw(!showNewPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputClass}
              placeholder="Re-enter new password"
            />
          </div>
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
        </div>
        <div className="flex items-center gap-3 mt-5">
          <button
            type="submit"
            disabled={!currentPassword || !newPassword || !confirmPassword}
            className="px-6 py-2.5 bg-[#003561] hover:bg-[#002040] disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl font-medium transition-colors"
          >
            Update Password
          </button>
          {passwordSaved && (
            <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" /> Password updated
            </span>
          )}
        </div>
      </form>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h3 className="font-semibold text-[#003561] mb-4">Account Information</h3>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500 text-sm">Account Type</span>
            <span className="font-medium text-[#003561] text-sm">{user?.accountType}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500 text-sm">Member Since</span>
            <span className="font-medium text-[#003561] text-sm">March 2026</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500 text-sm">Account Status</span>
            <span className="text-green-600 text-sm font-medium">Active</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-500 text-sm">KYC Verification</span>
            <span className="text-green-600 text-sm font-medium">Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
