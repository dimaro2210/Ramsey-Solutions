import { useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import {
  User, Camera, CheckCircle2, Mail, Phone, Calendar, BadgeCheck, CreditCard,
  Shield, Pencil, Bell, Lock, Globe, Moon, ChevronRight, Eye, EyeOff, LogOut,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};
const stagger = { animate: { transition: { staggerChildren: 0.1 } } };

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [profileSaved, setProfileSaved] = useState(false);
  const [editingInfo, setEditingInfo] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");
  const [showPassword, setShowPassword] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ firstName, lastName, phone });
    setProfileSaved(true);
    setEditingInfo(false);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => updateUser({ profilePicture: reader.result as string });
    reader.readAsDataURL(file);
  };

  const tabs = [
    { id: "profile" as const, label: "Profile", icon: User },
    { id: "security" as const, label: "Security", icon: Lock },

  ];

  return (
    <motion.div initial="initial" animate="animate" variants={stagger} className="max-w-4xl mx-auto pb-8">
      <style>{`
        @keyframes liquidFloat {
          0%, 100% { transform: translate(0, 0) scale(1); border-radius: 40% 60% 50% 50%; }
          33% { transform: translate(10px, -10px) scale(1.05); border-radius: 50% 40% 60% 50%; }
          66% { transform: translate(-5px, 5px) scale(0.95); border-radius: 60% 50% 40% 60%; }
        }
      `}</style>

      {/* Profile Header Banner */}
      <motion.div {...fadeUp} className="relative overflow-hidden rounded-[30px] mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0073B9] via-[#004d8a] to-[#0073B9]">
          <div className="absolute w-64 h-64 -top-20 -right-20 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #0073B9 0%, transparent 70%)", animation: "liquidFloat 8s ease-in-out infinite" }} />
          <div className="absolute w-48 h-48 -bottom-10 -left-10 rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #FCD214 0%, transparent 70%)", animation: "liquidFloat 6s ease-in-out infinite reverse" }} />
        </div>

        <div className="relative z-10 px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group flex-shrink-0">
              <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-white/20 shadow-xl">
                {user?.profilePicture ? (
                  <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <User className="w-12 h-12 text-white/70" />
                  </div>
                )}
              </div>
              <button onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 w-9 h-9 bg-[#FCD214] rounded-full flex items-center justify-center text-[#0073B9] shadow-lg hover:scale-110 transition-transform">
                <Camera className="w-4 h-4" />
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePictureUpload} className="hidden" />
            </div>

            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{user?.firstName} {user?.lastName}</h1>
              <p className="text-white/60 text-sm mt-1">{user?.email}</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-sm text-white/80 text-xs rounded-full">
                  <BadgeCheck className="w-3.5 h-3.5 text-green-400" /> Verified
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-sm text-white/80 text-xs rounded-full">
                  <CreditCard className="w-3.5 h-3.5 text-[#FCD214]" /> {user?.accountType || "Individual"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div {...fadeUp} className="flex gap-2 mb-8 bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-[#0073B9] text-white shadow-lg"
                  : "text-gray-400 hover:text-[#0073B9] hover:bg-gray-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </motion.div>

      {activeTab === "profile" && (
        <motion.div {...fadeUp} className="w-full">
          <form onSubmit={handleProfileSave} className="bg-white rounded-[24px] border border-gray-100 shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0073B9]/5 flex items-center justify-center">
                  <User className="w-4 h-4 text-[#0073B9]" />
                </div>
                <h3 className="font-bold text-[#0073B9]">Personal Information</h3>
              </div>
              {!editingInfo && (
                <button type="button" onClick={() => setEditingInfo(true)} className="flex items-center gap-1.5 text-xs text-[#0073B9] font-bold hover:underline">
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
              )}
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">First Name</label>
                  {editingInfo ? (
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-[#0073B9] outline-none focus:border-[#0073B9] focus:ring-2 focus:ring-[#0073B9]/10 text-sm" />
                  ) : (
                    <p className="px-4 py-3 text-[#0073B9] text-sm font-medium">{firstName || "-"}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">Last Name</label>
                  {editingInfo ? (
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-[#0073B9] outline-none focus:border-[#0073B9] focus:ring-2 focus:ring-[#0073B9]/10 text-sm" />
                  ) : (
                    <p className="px-4 py-3 text-[#0073B9] text-sm font-medium">{lastName || "-"}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">Email</label>
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">{user?.email}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">Phone</label>
                {editingInfo ? (
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 123-4567"
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-[#0073B9] outline-none focus:border-[#0073B9] focus:ring-2 focus:ring-[#0073B9]/10 text-sm" />
                  </div>
                ) : (
                  <div className="flex items-center gap-3 px-4 py-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-[#0073B9] font-medium">{phone || "Not set"}</span>
                  </div>
                )}
              </div>
              {editingInfo && (
                <div className="flex items-center gap-3 pt-2">
                  <button type="submit" className="px-6 py-2.5 bg-[#0073B9] hover:bg-[#005a94] text-white rounded-xl font-medium text-sm">Save Changes</button>
                  <button type="button" onClick={() => { setEditingInfo(false); setFirstName(user?.firstName || ""); setLastName(user?.lastName || ""); setPhone(user?.phone || ""); }}
                    className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-medium text-sm">Cancel</button>
                </div>
              )}
              {profileSaved && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-green-600 text-sm font-medium bg-green-50 px-4 py-2.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4" /> Profile updated successfully
                </motion.div>
              )}
            </div>
          </form>
        </motion.div>
      )}

      {activeTab === "security" && (
        <motion.div {...fadeUp} className="space-y-6">
          <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-lg">
            <h3 className="font-bold text-[#0073B9] mb-6 flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#0073B9]" /> Change Password
            </h3>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">Current Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} placeholder="••••••••"
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-[#0073B9] outline-none focus:border-[#0073B9] text-sm pr-10" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">New Password</label>
                <input type="password" placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-[#0073B9] outline-none focus:border-[#0073B9] text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">Confirm New Password</label>
                <input type="password" placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-[#0073B9] outline-none focus:border-[#0073B9] text-sm" />
              </div>
              <button className="px-6 py-3 bg-[#0073B9] text-white rounded-xl font-bold text-sm hover:bg-[#002040] transition-colors mt-2">
                Update Password
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-lg">
            <h3 className="font-bold text-[#0073B9] mb-6 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#0073B9]" /> Two-Factor Authentication
            </h3>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-2xl border border-green-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0073B9]">2FA is enabled</p>
                  <p className="text-[10px] text-gray-400">Your account has extra security</p>
                </div>
              </div>
              <div className="w-12 h-7 bg-green-500 rounded-full flex items-center px-1">
                <div className="w-5 h-5 bg-white rounded-full shadow ml-auto"></div>
              </div>
            </div>
          </div>

          <button onClick={logout} className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl font-bold text-sm hover:bg-red-100 transition-colors border border-red-100">
            <LogOut className="w-4 h-4" /> Sign Out of Account
          </button>
        </motion.div>
      )}

    </motion.div>
  );
}

