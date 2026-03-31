import { useState } from "react";
import { Headphones, Mail, Phone, MessageSquare, Send, CheckCircle2 } from "lucide-react";

export default function Support() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <Headphones className="w-7 h-7 text-[#0073B9]" />
          Contact Support
        </h1>
        <p className="text-white/50 text-sm mt-1">
          We're here to help with any questions or issues
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#111827] rounded-2xl border border-white/5 p-5 text-center">
          <Phone className="w-8 h-8 text-[#0073B9] mx-auto mb-3" />
          <p className="font-medium text-sm">Phone</p>
          <p className="text-white/50 text-xs mt-1">1-888-825-5225</p>
          <p className="text-white/30 text-xs">Mon-Fri 8am-8pm CT</p>
        </div>
        <div className="bg-[#111827] rounded-2xl border border-white/5 p-5 text-center">
          <Mail className="w-8 h-8 text-[#FCD214] mx-auto mb-3" />
          <p className="font-medium text-sm">Email</p>
          <p className="text-white/50 text-xs mt-1">support@ramsey.com</p>
          <p className="text-white/30 text-xs">24-48hr response time</p>
        </div>
        <div className="bg-[#111827] rounded-2xl border border-white/5 p-5 text-center">
          <MessageSquare className="w-8 h-8 text-green-400 mx-auto mb-3" />
          <p className="font-medium text-sm">Live Chat</p>
          <p className="text-white/50 text-xs mt-1">Available now</p>
          <p className="text-white/30 text-xs">Avg. wait: 2 min</p>
        </div>
      </div>

      <div className="bg-[#111827] rounded-2xl border border-white/5 p-6">
        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Message Sent</h3>
            <p className="text-white/50 text-sm mb-6">
              Our support team will get back to you within 24 hours.
            </p>
            <button
              onClick={() => { setSubmitted(false); setSubject(""); setMessage(""); }}
              className="px-5 py-2.5 bg-[#0073B9] hover:bg-[#005a94] rounded-xl text-sm font-medium transition-colors"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <h3 className="font-semibold mb-4">Send Us a Message</h3>
            <div>
              <label className="block text-sm text-white/60 mb-2">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 bg-[#0a0e17] rounded-xl border border-white/10 text-white outline-none focus:border-[#0073B9] transition-colors"
              >
                <option value="">Select a topic</option>
                <option value="account">Account Issues</option>
                <option value="deposit">Deposit & Withdrawal</option>
                <option value="trading">Trading Questions</option>
                <option value="technical">Technical Support</option>
                <option value="security">Security Concerns</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-2">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="Describe your issue or question..."
                className="w-full px-4 py-3 bg-[#0a0e17] rounded-xl border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-[#0073B9] transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={!subject || !message.trim()}
              className="flex items-center gap-2 px-6 py-3 bg-[#0073B9] hover:bg-[#005a94] disabled:bg-white/10 disabled:text-white/30 rounded-xl font-medium transition-colors"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
