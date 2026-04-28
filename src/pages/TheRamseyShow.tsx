import { Link } from "react-router-dom";

export default function TheRamseyShow() {
  const platforms = [
    { name: "YouTube", icon: "https://cdn.ramseysolutions.net/media/b2c/broadcast/rs-com/shows/TRS-2.0/youtube-icon.svg", url: "https://www.youtube.com/@TheRamseyShow" },
    { name: "Apple Podcasts", icon: "https://cdn.ramseysolutions.net/media/b2c/broadcast/rs-com/shows/TRS-2.0/apple-podcasts-icon.svg", url: "https://podcasts.apple.com/us/podcast/the-ramsey-show/id77001367" },
    { name: "Spotify", icon: "https://cdn.ramseysolutions.net/media/b2c/broadcast/rs-com/shows/TRS-2.0/spotify-icon.svg", url: "https://open.spotify.com/show/3gzMsMemRaYFNHfXJJFiD3" },
  ];

  const hosts = [
    { name: "Dave Ramsey", role: "Host", img: "https://cdn.ramseysolutions.net/media/b2c/personalities/headshots/dave-ramsey.jpg" },
    { name: "Rachel Cruze", role: "Co-Host", img: "https://cdn.ramseysolutions.net/media/b2c/personalities/headshots/rachel-cruze.jpg" },
    { name: "George Kamel", role: "Co-Host", img: "https://cdn.ramseysolutions.net/media/b2c/personalities/headshots/george-kamel.jpg" },
    { name: "Jade Warshaw", role: "Co-Host", img: "https://cdn.ramseysolutions.net/media/b2c/personalities/headshots/jade-warshaw.jpg" },
    { name: "Dr. John Delony", role: "Co-Host", img: "https://cdn.ramseysolutions.net/media/b2c/personalities/headshots/john-delony.jpg" },
    { name: "Ken Coleman", role: "Co-Host", img: "https://cdn.ramseysolutions.net/media/b2c/personalities/headshots/ken-coleman.jpg" },
  ];

  return (
    <div className="w-full bg-[#111] text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <img src="https://cdn.ramseysolutions.net/media/b2c/broadcast/rs-com/shows/TRS-2.0/TRS-Logo-Yellow-2.png" alt="The Ramsey Show" className="h-24 md:h-32 object-contain" />
          <div className="mt-8 md:mt-0 text-center md:text-right">
            <p className="text-xl font-medium mb-2">Stream Audio <span className="text-gray-400 font-normal">Weekdays at 2 p.m. ET</span></p>
            <p className="text-xl font-medium">Stream Video <span className="text-gray-400 font-normal">Weekdays at 9 a.m. ET</span></p>
          </div>
        </div>

        <div className="bg-black rounded-3xl overflow-hidden border border-gray-800 shadow-2xl mb-16">
          <div className="aspect-video relative bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center group cursor-pointer">
            <img src="https://cdn.ramseysolutions.net/media/b2c/broadcast/rs-com/shows/TRS-2.0/TRS-Logo-Yellow-2.png" alt="The Ramsey Show" className="w-1/2 object-contain opacity-40 absolute" />
            <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center shadow-2xl z-10 group-hover:scale-110 transition-transform">
              <div className="w-0 h-0 border-t-[16px] border-t-transparent border-l-[24px] border-l-white border-b-[16px] border-b-transparent ml-2"></div>
            </div>
            <h3 className="absolute top-6 left-6 text-2xl font-bold z-10 drop-shadow-md">Break The Cycle And Build Wealth | March 30, 2026</h3>
          </div>
          <div className="p-8 flex flex-col sm:flex-row justify-between items-center bg-gray-900 gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-bold">TRS</div>
              <div>
                <p className="font-bold text-lg">The Ramsey Show</p>
                <p className="text-gray-400 text-sm">1.15M subscribers</p>
              </div>
            </div>
            <a href="https://www.youtube.com/@TheRamseyShow?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="bg-white text-black font-bold px-6 py-2 rounded-full hover:bg-gray-200 transition-colors">Subscribe</a>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">Helping People Win with Money</h2>
          <p className="text-xl text-gray-400 leading-relaxed mb-8">
            Dave Ramsey and his co-hosts offer straight talk on life and money. Millions listen in to get their questions answered, take control of their finances, and find hope for their future.
          </p>
          <p className="text-lg text-gray-500">
            The Ramsey Show is America's #1 personal finance radio program — reaching over 18 million listeners weekly across 600+ radio stations and digital platforms nationwide.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-400 uppercase tracking-widest">Listen & Watch On</h2>
          <div className="flex justify-center gap-8 flex-wrap">
            {platforms.map((p, i) => (
              <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-gray-600 transition-all flex flex-col items-center min-w-[140px]">
                <img src={p.icon} alt={p.name} className="w-12 h-12 mb-3 invert" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <span className="font-bold text-sm">{p.name}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-400 uppercase tracking-widest">Your Hosts</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {hosts.map((host, i) => (
              <div key={i} className="text-center">
                <div className="w-24 h-24 bg-gray-800 rounded-full mx-auto mb-3 overflow-hidden">
                  <img src={host.img} alt={host.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
                <p className="font-bold text-sm">{host.name}</p>
                <p className="text-gray-500 text-xs">{host.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { title: "Debt-Free Screams", desc: "Watch real people scream their way to freedom on the show. It's the most powerful moment of every episode." },
            { title: "Caller Highlights", desc: "Hear from callers tackling real money questions every day — from paying off debt to building wealth." },
            { title: "Expert Advice", desc: "Get wisdom from Dave, Rachel, George, Jade, Dr. John Delony, and Ken Coleman on money, career, and relationships." },
          ].map((item, i) => (
            <div key={i} className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 rounded-2xl p-10 border border-gray-800 text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Call In to the Show</h2>
          <p className="text-xl text-gray-400 mb-6">Have a question about money, career, or relationships? Call in live!</p>
          <p className="text-4xl font-black text-accent mb-4">1-888-825-5225</p>
          <p className="text-gray-500">Lines open weekdays during show hours</p>
        </div>

        <div className="text-center">
          <Link to="/shows" className="bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-gray-200 transition-colors inline-block">
            Browse All Shows
          </Link>
        </div>
      </div>
    </div>
  );
}
