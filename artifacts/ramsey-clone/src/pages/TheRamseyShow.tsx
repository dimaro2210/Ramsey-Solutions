export default function TheRamseyShow() {
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
          <div className="aspect-video relative bg-gray-900 flex flex-col items-center justify-center border-b border-gray-800 group cursor-pointer">
            {/* Using stock Unsplash for video thumbnail placeholder */}
            {/* radio broadcast mic audio setup */}
            <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1200&q=80" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity" />
            <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center shadow-2xl z-10 group-hover:scale-110 transition-transform">
              <div className="w-0 h-0 border-t-[16px] border-t-transparent border-l-[24px] border-l-white border-b-[16px] border-b-transparent ml-2"></div>
            </div>
            <h3 className="absolute top-6 left-6 text-2xl font-bold z-10 drop-shadow-md">Break The Cycle And Build Wealth | March 30, 2026</h3>
          </div>
          <div className="p-8 flex justify-between items-center bg-gray-900">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-bold">TRS</div>
              <div>
                <p className="font-bold text-lg">The Ramsey Show</p>
                <p className="text-gray-400 text-sm">1.15M subscribers</p>
              </div>
            </div>
            <button className="bg-white text-black font-bold px-6 py-2 rounded-full hover:bg-gray-200">Subscribe</button>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Helping People Win with Money</h2>
          <p className="text-xl text-gray-400 leading-relaxed mb-12">
            Dave Ramsey and his co-hosts offer straight talk on life and money. Millions listen in to get their questions answered, take control of their finances, and find hope for their future.
          </p>
        </div>
      </div>
    </div>
  );
}
