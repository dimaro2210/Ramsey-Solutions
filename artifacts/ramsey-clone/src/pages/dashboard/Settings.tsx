import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import {
  Shield,
  Eye,
  EyeOff,
  CheckCircle2,
  Lock,
  Bell,
  Globe,
  Moon,
  Sun,
  Smartphone,
  CreditCard,
  Trash2,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [tradeNotifs, setTradeNotifs] = useState(true);
  const [marketNews, setMarketNews] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("en");

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

  const passwordStrength = (() => {
    if (!newPassword) return 0;
    let s = 0;
    if (newPassword.length >= 8) s++;
    if (/[A-Z]/.test(newPassword)) s++;
    if (/[0-9]/.test(newPassword)) s++;
    if (/[^A-Za-z0-9]/.test(newPassword)) s++;
    return s;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][passwordStrength];
  const strengthColor = ["", "bg-red-400", "bg-orange-400", "bg-blue-400", "bg-green-500"][passwordStrength];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.div initial="initial" animate="animate" variants={stagger} className="max-w-4xl mx-auto pb-8">
      <motion.div {...fadeUp} className="mb-6">
        <h1 className="text-2xl font-bold text-[#0073B9]">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account preferences and security</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <motion.form {...fadeUp} onSubmit={handlePasswordSave} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-100 to-orange-50 flex items-center justify-center">
                <Shield className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-[#0073B9]">Password & Security</h3>
                <p className="text-xs text-gray-400">Update your password</p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Current Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showCurrentPw ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 bg-gray-50 rounded-xl border border-gray-200 text-[#0073B9] outline-none focus:border-[#0073B9] focus:ring-2 focus:ring-[#0073B9]/10 transition-all text-sm"
                    placeholder="Enter current password"
                    autoComplete="current-password"
                  />
                  <button type="button" onClick={() => setShowCurrentPw(!showCurrentPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1">
                    {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showNewPw ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 bg-gray-50 rounded-xl border border-gray-200 text-[#0073B9] outline-none focus:border-[#0073B9] focus:ring-2 focus:ring-[#0073B9]/10 transition-all text-sm"
                    placeholder="Min. 8 characters"
                    autoComplete="new-password"
                  />
                  <button type="button" onClick={() => setShowNewPw(!showNewPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1">
                    {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {newPassword && (
                  <div className="mt-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div key={level} className={`h-1 flex-1 rounded-full transition-colors ${passwordStrength >= level ? strengthColor : "bg-gray-200"}`} />
                      ))}
                    </div>
                    <p className={`text-xs mt-1 ${passwordStrength >= 3 ? "text-green-500" : passwordStrength >= 2 ? "text-orange-500" : "text-red-500"}`}>
                      {strengthLabel}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showConfirmPw ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 bg-gray-50 rounded-xl border border-gray-200 text-[#0073B9] outline-none focus:border-[#0073B9] focus:ring-2 focus:ring-[#0073B9]/10 transition-all text-sm"
                    placeholder="Re-enter new password"
                    autoComplete="new-password"
                  />
                  <button type="button" onClick={() => setShowConfirmPw(!showConfirmPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1">
                    {showConfirmPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {confirmPassword && newPassword && confirmPassword !== newPassword && (
                  <p className="text-xs text-red-500 mt-1">Passwords don't match</p>
                )}
                {confirmPassword && newPassword && confirmPassword === newPassword && confirmPassword.length >= 8 && (
                  <p className="text-xs text-green-500 mt-1 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Passwords match</p>
                )}
              </div>

              {passwordError && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm bg-red-50 px-4 py-2.5 rounded-xl">{passwordError}</motion.p>
              )}

              <button
                type="submit"
                disabled={!currentPassword || !newPassword || !confirmPassword}
                className="w-full py-3 bg-[#0073B9] hover:bg-[#002040] disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl font-medium transition-all duration-200 text-sm"
              >
                Update Password
              </button>

              {passwordSaved && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-green-600 text-sm font-medium bg-green-50 px-4 py-2.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4" /> Password updated successfully
                </motion.div>
              )}
            </div>
          </motion.form>

          <motion.div {...fadeUp} className="bg-gradient-to-br from-blue-50/80 to-white rounded-2xl border border-blue-100/60 p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0073B9]/10 flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-5 h-5 text-[#0073B9]" />
              </div>
              <div>
                <h4 className="font-semibold text-[#0073B9] text-sm">Two-Factor Authentication</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">Add an extra layer of security to your account. We recommend enabling 2FA for enhanced protection of your investment portfolio.</p>
                <button type="button" className="mt-3 px-4 py-2 bg-[#0073B9] hover:bg-[#005a94] text-white rounded-lg text-xs font-medium transition-colors">
                  Enable 2FA
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div {...fadeUp} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                <Bell className="w-4 h-4 text-[#0073B9]" />
              </div>
              <h3 className="font-semibold text-[#0073B9]">Notification Preferences</h3>
            </div>
            <div className="p-6 space-y-0 divide-y divide-gray-100">
              {[
                { label: "Email Notifications", desc: "Receive updates via email", value: emailNotifs, setter: setEmailNotifs },
                { label: "Push Notifications", desc: "Browser push notifications", value: pushNotifs, setter: setPushNotifs },
                { label: "Price Alerts", desc: "Get notified on price changes", value: priceAlerts, setter: setPriceAlerts },
                { label: "Trade Confirmations", desc: "Notifications for trades", value: tradeNotifs, setter: setTradeNotifs },
                { label: "Market News", desc: "Daily market summaries", value: marketNews, setter: setMarketNews },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-[#0073B9]">{item.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => item.setter(!item.value)}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${item.value ? "bg-[#0073B9]" : "bg-gray-200"}`}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${item.value ? "translate-x-5" : "translate-x-0"}`} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
                <Globe className="w-4 h-4 text-purple-500" />
              </div>
              <h3 className="font-semibold text-[#0073B9]">Preferences</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {darkMode ? <Moon className="w-4 h-4 text-gray-400" /> : <Sun className="w-4 h-4 text-yellow-500" />}
                  <div>
                    <p className="text-sm font-medium text-[#0073B9]">Dark Mode</p>
                    <p className="text-xs text-gray-400">Switch appearance</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${darkMode ? "bg-[#0073B9]" : "bg-gray-200"}`}
                >
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${darkMode ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-[#0073B9] outline-none focus:border-[#0073B9] focus:ring-2 focus:ring-[#0073B9]/10 transition-all text-sm"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-[#0073B9] outline-none focus:border-[#0073B9] focus:ring-2 focus:ring-[#0073B9]/10 transition-all text-sm"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-gray-500" />
              </div>
              <h3 className="font-semibold text-[#0073B9]">Account</h3>
            </div>
            <div className="p-6 space-y-0 divide-y divide-gray-100">
              <button type="button" className="flex items-center justify-between w-full py-3 first:pt-0 group">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-[#0073B9]">Payment Methods</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </button>
              <button type="button" className="flex items-center justify-between w-full py-3 group">
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-[#0073B9]">Privacy Policy</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </button>
              <button type="button" onClick={handleLogout} className="flex items-center justify-between w-full py-3 group">
                <div className="flex items-center gap-3">
                  <LogOut className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-red-500">Log Out</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </button>
              <button type="button" className="flex items-center justify-between w-full py-3 last:pb-0 group">
                <div className="flex items-center gap-3">
                  <Trash2 className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-red-500">Delete Account</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

