import { ReactNode, useState } from "react";
import { Link } from "wouter";
import { Search, Menu, X, ChevronDown, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Layout({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Money", href: "/money/everydollar" },
    { name: "Investing & Retirement", href: "/retirement/smartvestor" },
    { name: "Real Estate", href: "/real-estate/residential-real-estate" },
    { name: "Insurance", href: "/insurance" },
    { name: "Life & Career", href: "/dave-ramsey-7-baby-steps" },
    { name: "Shows", href: "/shows" },
    { name: "Free Tools", href: "/debt/debt-101" },
    { name: "For Businesses", href: "/trusted" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex-shrink-0 flex items-center group">
                <img
                  className="h-10 w-auto group-hover:opacity-90 transition-opacity"
                  src="https://cdn.ramseysolutions.net/media/rscom/logos/flat-blue-50-ramsey-logo.svg"
                  alt="Ramsey Solutions"
                />
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-1">
              <div className="relative group px-3 py-2">
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 border border-transparent focus-within:border-secondary transition-colors">
                  <Search className="w-4 h-4 text-muted-foreground mr-2" />
                  <input 
                    type="text" 
                    placeholder="What are you looking for?" 
                    className="bg-transparent border-none focus:outline-none text-sm w-48"
                  />
                </div>
              </div>
              <Link href="/sign-in" className="ml-4 font-semibold text-secondary border-2 border-secondary rounded-lg px-6 py-2 hover:bg-secondary hover:text-white transition-colors">
                Sign In
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-primary p-2 hover:bg-muted rounded-md transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Desktop Sub Nav */}
          <div className="hidden lg:flex items-center justify-between py-3 border-t border-gray-100">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center text-sm font-semibold text-secondary hover:underline px-2 py-1"
                >
                  {item.name}
                  <ChevronDown className="w-4 h-4 ml-1 opacity-50 group-hover:rotate-180 transition-transform" />
                </Link>
              </div>
            ))}
            <a href="#" className="flex items-center text-sm font-semibold text-secondary hover:underline px-2 py-1">
              Store
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
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
                <div className="grid grid-cols-1 gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-3 text-base font-semibold text-primary hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    href="/sign-in"
                    className="mt-4 block w-full text-center font-bold text-primary border-2 border-primary rounded-lg px-6 py-3 hover:bg-primary hover:text-white transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow w-full">
        {children}
      </main>

      {/* FOOTER */}
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
                <li><a href="#" className="hover:text-accent transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Shows</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link href="/shows/the-ramsey-show" className="hover:text-accent transition-colors">The Ramsey Show</Link></li>
                <li><Link href="/shows" className="hover:text-accent transition-colors">Dr. John Delony</Link></li>
                <li><Link href="/shows" className="hover:text-accent transition-colors">Rachel Cruze</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Tools</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link href="/money/everydollar" className="hover:text-accent transition-colors">EveryDollar</Link></li>
                <li><Link href="/debt/debt-101" className="hover:text-accent transition-colors">Debt Calculator</Link></li>
                <li><Link href="/dave-ramsey-7-baby-steps" className="hover:text-accent transition-colors">Baby Steps</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Get Help</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link href="/trusted" className="hover:text-accent transition-colors">Find a Pro</Link></li>
                <li><Link href="/insurance" className="hover:text-accent transition-colors">Insurance</Link></li>
                <li><Link href="/taxes" className="hover:text-accent transition-colors">Taxes</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} Ramsey Solutions. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
