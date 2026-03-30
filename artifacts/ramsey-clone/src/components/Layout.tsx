import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, ChevronDown, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  {
    name: "Money",
    links: [
      { label: "EveryDollar Budgeting", href: "/money/everydollar" },
      { label: "Debt", href: "/debt/debt-101" },
      { label: "Saving", href: "/dave-ramsey-7-baby-steps" },
      { label: "Taxes", href: "/taxes" },
    ],
  },
  {
    name: "Investing & Retirement",
    links: [
      { label: "SmartVestor", href: "/retirement/smartvestor" },
      { label: "401(k) & IRA", href: "/retirement/smartvestor" },
      { label: "Retirement Planning", href: "/retirement/smartvestor" },
    ],
  },
  {
    name: "Real Estate",
    links: [
      { label: "Find an Agent", href: "/real-estate/residential-real-estate" },
      { label: "Buying a Home", href: "/real-estate/residential-real-estate" },
      { label: "Selling a Home", href: "/real-estate/residential-real-estate" },
    ],
  },
  {
    name: "Insurance",
    links: [
      { label: "Coverage Checkup", href: "/insurance" },
      { label: "Term Life Insurance", href: "/insurance/term-life" },
      { label: "Home & Auto", href: "/insurance/home-auto" },
      { label: "Health Insurance", href: "/insurance/health" },
    ],
  },
  {
    name: "Life & Career",
    links: [
      { label: "7 Baby Steps", href: "/dave-ramsey-7-baby-steps" },
      { label: "Career Growth", href: "/dave-ramsey-7-baby-steps" },
    ],
  },
  {
    name: "Shows",
    links: [
      { label: "The Ramsey Show", href: "/shows/the-ramsey-show" },
      { label: "All Shows", href: "/shows" },
    ],
  },
  {
    name: "Free Tools",
    links: [
      { label: "Debt Calculator", href: "/debt/debt-101" },
      { label: "EveryDollar Budget", href: "/money/everydollar" },
      { label: "Baby Steps Quiz", href: "/dave-ramsey-7-baby-steps" },
    ],
  },
  {
    name: "For Businesses",
    links: [
      { label: "RamseyTrusted", href: "/trusted" },
      { label: "EntreLeadership", href: "/shows" },
    ],
  },
];

export function Layout({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex-shrink-0 flex items-center group">
                <img
                  className="h-10 w-auto group-hover:opacity-90 transition-opacity"
                  src="https://cdn.ramseysolutions.net/media/rscom/logos/flat-blue-50-ramsey-logo.svg"
                  alt="Ramsey Solutions"
                />
              </Link>
            </div>

            <nav className="hidden lg:flex items-center space-x-2">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 border border-transparent focus-within:border-secondary transition-colors">
                <Search className="w-4 h-4 text-muted-foreground mr-2" />
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="bg-transparent border-none focus:outline-none text-sm w-48"
                />
              </div>
              <Link to="/sign-in" className="ml-3 font-semibold text-secondary border-2 border-secondary rounded-lg px-5 py-2 hover:bg-secondary hover:text-white transition-colors">
                Sign In
              </Link>
              <Link to="/sign-up" className="font-semibold bg-accent text-primary rounded-lg px-5 py-2 hover:bg-yellow-300 transition-colors">
                Sign Up
              </Link>
            </nav>

            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-primary p-2 hover:bg-muted rounded-md transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-between py-3 border-t border-gray-100">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="flex items-center text-sm font-semibold text-secondary hover:underline px-2 py-1">
                  {item.name}
                  <ChevronDown className={`w-4 h-4 ml-1 opacity-50 transition-transform ${openDropdown === item.name ? "rotate-180" : ""}`} />
                </button>
                {openDropdown === item.name && (
                  <div className="absolute top-full left-0 bg-white rounded-xl shadow-xl border border-border py-3 min-w-[220px] z-50">
                    {item.links.map((link) => (
                      <Link
                        key={link.label}
                        to={link.href}
                        className="block px-5 py-2.5 text-sm font-medium text-primary hover:bg-gray-50 hover:text-secondary transition-colors"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a href="https://store.ramseysolutions.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-semibold text-secondary hover:underline px-2 py-1">
              Store
            </a>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-b border-border overflow-hidden"
            >
              <div className="px-4 py-4 space-y-4">
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-3">
                  <Search className="w-5 h-5 text-muted-foreground mr-2" />
                  <input type="text" placeholder="Search..." className="bg-transparent border-none focus:outline-none w-full" />
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {navItems.map((item) => (
                    <div key={item.name}>
                      <p className="px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">{item.name}</p>
                      {item.links.map((link) => (
                        <Link
                          key={link.label}
                          to={link.href}
                          className="block px-6 py-2.5 text-base font-medium text-primary hover:bg-gray-50 rounded-md"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                  <div className="flex gap-3 mt-4">
                    <Link
                      to="/sign-in"
                      className="flex-1 text-center font-bold text-primary border-2 border-primary rounded-lg px-6 py-3 hover:bg-primary hover:text-white transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/sign-up"
                      className="flex-1 text-center font-bold bg-accent text-primary rounded-lg px-6 py-3 hover:bg-yellow-300 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow w-full">
        {children}
      </main>

      <footer className="bg-primary text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-1">
              <img
                className="h-10 w-auto mb-6 brightness-0 invert"
                src="https://cdn.ramseysolutions.net/media/rscom/logos/flat-blue-50-ramsey-logo.svg"
                alt="Ramsey Solutions"
              />
              <p className="text-sm text-gray-300">
                Helping you manage your finances, work, and relationships.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 text-white">About</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link to="/" className="hover:text-accent transition-colors">Our Story</Link></li>
                <li><Link to="/" className="hover:text-accent transition-colors">Careers</Link></li>
                <li><Link to="/" className="hover:text-accent transition-colors">Contact Us</Link></li>
                <li><Link to="/" className="hover:text-accent transition-colors">Newsroom</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Shows</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link to="/shows/the-ramsey-show" className="hover:text-accent transition-colors">The Ramsey Show</Link></li>
                <li><Link to="/shows" className="hover:text-accent transition-colors">Dr. John Delony Show</Link></li>
                <li><Link to="/shows" className="hover:text-accent transition-colors">Rachel Cruze Show</Link></li>
                <li><Link to="/shows" className="hover:text-accent transition-colors">Ken Coleman Show</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Tools</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link to="/money/everydollar" className="hover:text-accent transition-colors">EveryDollar</Link></li>
                <li><Link to="/debt/debt-101" className="hover:text-accent transition-colors">Debt Calculator</Link></li>
                <li><Link to="/dave-ramsey-7-baby-steps" className="hover:text-accent transition-colors">Baby Steps</Link></li>
                <li><Link to="/retirement/smartvestor" className="hover:text-accent transition-colors">Investment Calculator</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Get Help</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link to="/trusted" className="hover:text-accent transition-colors">Find a Pro</Link></li>
                <li><Link to="/insurance" className="hover:text-accent transition-colors">Insurance</Link></li>
                <li><Link to="/taxes" className="hover:text-accent transition-colors">Taxes</Link></li>
                <li><Link to="/real-estate/residential-real-estate" className="hover:text-accent transition-colors">Real Estate</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div className="flex space-x-6 mb-4 md:mb-0">
                <a href="https://facebook.com/daveramsey" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="https://twitter.com/daveramsey" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="https://instagram.com/daveramsey" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="https://youtube.com/daveramsey" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
              <p>&copy; {new Date().getFullYear()} Lampo Licensing, LLC. All rights reserved.</p>
              <div className="flex flex-wrap gap-4 mt-2 md:mt-0">
                <Link to="/" className="hover:text-gray-300">Terms of Use</Link>
                <Link to="/" className="hover:text-gray-300">Privacy Policy</Link>
                <Link to="/" className="hover:text-gray-300">Accessibility</Link>
                <Link to="/" className="hover:text-gray-300">Editorial Guidelines</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
