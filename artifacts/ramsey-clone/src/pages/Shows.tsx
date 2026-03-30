import { Link } from "react-router-dom";

export default function Shows() {
  const shows = [
    { name: "The Ramsey Show", desc: "America's trusted voice on life and money with Dave Ramsey and co-hosts.", href: "/shows/the-ramsey-show", img: "https://cdn.ramseysolutions.net/media/b2c/broadcast/rs-com/shows/TRS-2.0/TRS-Logo-Yellow-2.png", schedule: "Weekdays 2PM ET" },
    { name: "The Dr. John Delony Show", desc: "Mental health, relationships, and wellness with Dr. John Delony.", href: "/shows", img: "https://cdn.ramseysolutions.net/media/b2c/broadcast/rs-com/shows/show-page/DJDS-show-cover-art.jpg", schedule: "Weekdays 12PM ET" },
    { name: "Smart Money Happy Hour", desc: "Rachel Cruze and George Kamel talk money in a fun, relatable way.", href: "/shows", img: "https://cdn.ramseysolutions.net/media/b2c/broadcast/rs-com/shows/show-page/SMHH-show-cover-art.jpg", schedule: "Wednesdays" },
    { name: "The Rachel Cruze Show", desc: "Practical budgeting and lifestyle tips from Rachel Cruze.", href: "/shows", img: "https://cdn.ramseysolutions.net/media/b2c/broadcast/rs-com/shows/show-page/RCS-show-cover-art.jpg", schedule: "Tuesdays" },
    { name: "The Ken Coleman Show", desc: "Career advice to help you find work you love.", href: "/shows", img: "https://cdn.ramseysolutions.net/media/b2c/broadcast/rs-com/shows/show-page/KCS-show-cover-art.jpg", schedule: "Weekdays 1PM ET" },
    { name: "EntreLeadership Podcast", desc: "Business growth strategies from top leaders and entrepreneurs.", href: "/shows", img: "https://cdn.ramseysolutions.net/media/b2c/broadcast/rs-com/shows/show-page/EL-show-cover-art.jpg", schedule: "Weekly" },
  ];

  return (
    <div className="w-full bg-black text-white min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <img src="https://cdn.ramseysolutions.net/media/b2c/broadcast/rs-com/shows/show-page/network-logo.png" alt="Ramsey Network" className="h-16 mx-auto mb-6" />
          <h1 className="text-5xl font-black italic mb-4">Ramsey Network</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Watch Dave Ramsey, Dr. John Delony, Rachel Cruze, Ken Coleman, EntreLeadership, and more of your favorite shows!
          </p>
        </div>

        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-6 text-gray-400 uppercase tracking-widest text-center">Featured Show</h2>
          <div className="bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 flex flex-col md:flex-row items-center max-w-5xl mx-auto shadow-2xl">
            <div className="w-full md:w-1/2 aspect-video bg-gray-800 relative group cursor-pointer flex items-center justify-center">
              <img src="https://cdn.ramseysolutions.net/media/b2c/broadcast/rs-com/shows/TRS-2.0/TRS-Logo-Yellow-2.png" alt="The Ramsey Show" className="w-3/4 object-contain" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2"></div>
                </div>
              </div>
            </div>
            <div className="p-10 w-full md:w-1/2">
              <h3 className="text-4xl font-bold mb-4">The Ramsey Show</h3>
              <p className="text-gray-400 mb-4 text-lg">Listen Live Weekdays at 2PM ET<br />Watch Live Weekdays at 4PM ET</p>
              <p className="text-gray-500 mb-8">America's #1 personal finance show. Millions turn to Dave, Rachel Cruze, George Kamel, Jade Warshaw, and Dr. John Delony every day for real answers to real money questions.</p>
              <Link to="/shows/the-ramsey-show" className="bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-gray-200 transition-colors inline-block">
                View Show Details
              </Link>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-8 text-gray-400 uppercase tracking-widest text-center">More Shows From Ramsey Network</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pb-20">
            {shows.map((show, i) => (
              <Link key={i} to={show.href} className="bg-gray-900 rounded-2xl p-6 text-center border border-gray-800 hover:border-gray-600 hover:bg-gray-800 transition-all cursor-pointer group">
                <div className="w-full aspect-square bg-gray-800 rounded-xl mb-4 flex items-center justify-center overflow-hidden p-4">
                  <img src={show.img} alt={show.name} className="w-full h-full object-cover rounded-lg opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="font-bold text-lg mb-2">{show.name}</h4>
                <p className="text-gray-500 text-sm mb-2">{show.desc}</p>
                <span className="text-xs text-gray-600 uppercase tracking-wider">{show.schedule}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
