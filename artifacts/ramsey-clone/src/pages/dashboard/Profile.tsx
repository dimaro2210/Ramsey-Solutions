import { useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Camera,
  CheckCircle2,
  Mail,
  Phone,
  Calendar,
  BadgeCheck,
  CreditCard,
  Shield,
  Pencil,
  Settings,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function Profile() {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [profileSaved, setProfileSaved] = useState(false);
  const [editingInfo, setEditingInfo] = useState(false);

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
    reader.onloadend = () => {
      const result = reader.result as string;
      updateUser({ profilePicture: result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.div initial="initial" animate="animate" variants={stagger} className="max-w-3xl mx-auto pb-8">
      <style>{`
        @keyframes liquidFloat {
          0%, 100% { transform: translate(0, 0) scale(1); border-radius: 40% 60% 50% 50%; }
          33% { transform: translate(10px, -10px) scale(1.05); border-radius: 50% 40% 60% 50%; }
          66% { transform: translate(-5px, 5px) scale(0.95); border-radius: 60% 50% 40% 60%; }
        }
      `}</style>

      <motion.div {...fadeUp} className="relative overflow-hidden rounded-2xl mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-[#003561] via-[#004d8a] to-[#0073B9]">
          <div className="absolute w-64 h-64 -top-20 -right-20 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #0073B9 0%, transparent 70%)", animation: "liquidFloat 8s ease-in-out infinite" }} />
          <div className="absolute w-48 h-48 -bottom-10 -left-10 rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #FCD214 0%, transparent 70%)", animation: "liquidFloat 6s ease-in-out infinite reverse" }} />
        </div>

        <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="relative group flex-shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-4 ring-white/20 shadow-xl">
                {user?.profilePicture ? (
                  <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <User className="w-12 h-12 text-white/70" />
                  </div>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 w-9 h-9 bg-[#FCD214] rounded-full flex items-center justify-center text-[#003561] shadow-lg hover:scale-110 transition-transform duration-200"
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

            <Link
              to="/dashboard/settings"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-xs rounded-lg transition-colors"
            >
              <Settings className="w-3.5 h-3.5" /> Settings
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div {...fadeUp} className="lg:col-span-2">
          <form onSubmit={handleProfileSave} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0073B9]/10 to-[#003561]/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-[#0073B9]" />
                </div>
                <h3 className="font-semibold text-[#003561]">Personal Information</h3>
              </div>
              {!editingInfo && (
                <button type="button" onClick={() => setEditingInfo(true)} className="flex items-center gap-1.5 text-xs text-[#0073B9] font-medium hover:text-[#005a94] transition-colors">
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
              )}
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">First Name</label>
                  {editingInfo ? (
                    <input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-[#003561] outline-none focus:border-[#0073B9] focus:ring-2 focus:ring-[#0073B9]/10 transition-all text-sm"
                    />
                  ) : (
                    <p className="px-4 py-3 text-[#003561] text-sm font-medium">{firstName || "-"}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Last Name</label>
                  {editingInfo ? (
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-[#003561] outline-none focus:border-[#0073B9] focus:ring-2 focus:ring-[#0073B9]/10 transition-all text-sm"
                    />
                  ) : (
                    <p className="px-4 py-3 text-[#003561] text-sm font-medium">{lastName || "-"}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Email Address</label>
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
                  <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-400">{user?.email}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Phone Number</label>
                {editingInfo ? (
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-[#003561] outline-none focus:border-[#0073B9] focus:ring-2 focus:ring-[#0073B9]/10 transition-all text-sm"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-3 px-4 py-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-[#003561] font-medium">{phone || "Not set"}</span>
                  </div>
                )}
              </div>

              {editingInfo && (
                <div className="flex items-center gap-3 pt-2">
                  <button type="submit" className="px-6 py-2.5 bg-[#0073B9] hover:bg-[#005a94] text-white rounded-xl font-medium transition-colors text-sm">
                    Save Changes
                  </button>
                  <button type="button" onClick={() => { setEditingInfo(false); setFirstName(user?.firstName || ""); setLastName(user?.lastName || ""); setPhone(user?.phone || ""); }} className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-medium transition-colors text-sm">
                    Cancel
                  </button>
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

        <motion.div {...fadeUp} className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
                <BadgeCheck className="w-4 h-4 text-green-600" />
              </div>
              <h3 className="font-semibold text-[#003561] text-sm">Account Details</h3>
            </div>
            <div className="p-5 space-y-0 divide-y divide-gray-100">
              {[
                { label: "Account Type", value: user?.accountType || "Individual", icon: <CreditCard className="w-4 h-4 text-gray-400" /> },
                { label: "Member Since", value: "March 2026", icon: <Calendar className="w-4 h-4 text-gray-400" /> },
                { label: "Status", value: "Active", valueColor: "text-green-600", icon: <BadgeCheck className="w-4 h-4 text-green-500" /> },
                { label: "KYC", value: "Verified", valueColor: "text-green-600", icon: <Shield className="w-4 h-4 text-green-500" /> },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span className="text-xs text-gray-500">{item.label}</span>
                  </div>
                  <span className={`text-xs font-medium ${(item as any).valueColor || "text-[#003561]"}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/dashboard/settings"
            className="flex items-center gap-3 px-5 py-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-sm hover:border-[#0073B9]/30 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Settings className="w-5 h-5 text-gray-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#003561]">Account Settings</p>
              <p className="text-xs text-gray-400">Password, notifications, preferences</p>
            </div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
