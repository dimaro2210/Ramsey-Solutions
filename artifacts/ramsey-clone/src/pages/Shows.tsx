import { Link } from "wouter";

export default function Shows() {
  const shows = [
    { name: "The Ramsey Show", href: "/shows/the-ramsey-show" },
    { name: "The Dr. John Delony Show", href: "/shows" },
    { name: "Smart Money Happy Hour", href: "/shows" },
    { name: "The Rachel Cruze Show", href: "/shows" },
    { name: "The Ken Coleman Show", href: "/shows" },
    { name: "EntreLeadership Podcast", href: "/shows" }
  ];

  return (
    <div className="w-full bg-black text-white min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <img src="https://cdn.ramseysolutions.net/media/b2c/broadcast/rs-com/shows/show-page/network-logo.png" alt="Ramsey Network" className="h-16 mx-auto mb-6" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Watch Dave Ramsey, Dr. John Delony, Rachel Cruze, Ken Coleman, EntreLeadership, and more of your favorite shows!
          </p>
        </div>

        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-6 text-gray-400 uppercase tracking-widest text-center">Featured Show</h2>
          <div className="bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 flex flex-col md:flex-row items-center max-w-5xl mx-auto shadow-2xl">
            <div className="w-full md:w-1/2 aspect-video bg-gray-800 relative group cursor-pointer">
               <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80" alt="The Ramsey Show Studio" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                   <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2"></div>
                 </div>
               </div>
            </div>
            <div className="p-10 w-full md:w-1/2">
              <h3 className="text-4xl font-bold mb-4">The Ramsey Show</h3>
              <p className="text-gray-400 mb-8 text-lg">Listen Live Weekdays at 2PM ET<br/>Watch Live Weekdays at 4PM ET</p>
              <Link href="/shows/the-ramsey-show" className="bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-gray-200 transition-colors inline-block">
                View Show Details
              </Link>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-8 text-gray-400 uppercase tracking-widest text-center">More Shows From Ramsey Network</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pb-20">
            {shows.map((show, i) => (
              <Link key={i} href={show.href} className="bg-gray-900 rounded-2xl p-6 text-center border border-gray-800 hover:border-gray-600 hover:bg-gray-800 transition-all cursor-pointer">
                <div className="w-full aspect-square bg-gray-800 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                  <span className="text-4xl opacity-20 font-black">SHOW</span>
                </div>
                <h4 className="font-bold text-lg">{show.name}</h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
