export default function PartnersSection() {
  return (
    <section className="py-16 px-4" id="partners">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-orange-500 text-center mb-12">
          Our Partners
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Top Row */}
          <div className="flex justify-center">
            <div className="text-white text-2xl font-bold tracking-wide">
              BITMAIN
            </div>
          </div>
          <div className="flex justify-center">
            <div className="text-white text-xl font-light flex items-center">
              <svg className="w-8 h-8 mr-3" viewBox="0 0 32 32" fill="currentColor">
                <path d="M8 4L16 12L24 4L28 8L20 16L28 24L24 28L16 20L8 28L4 24L12 16L4 8Z"/>
              </svg>
              whatsminer
            </div>
          </div>
          
          {/* Bottom Row */}
          <div className="flex justify-center">
            <div className="text-white text-2xl font-bold flex items-center">
              <div className="w-8 h-8 mr-3 bg-white rounded"></div>
              Hiveon
            </div>
          </div>
          <div className="flex justify-center">
            <div className="text-white text-xl font-bold flex items-center">
              <svg className="w-8 h-8 mr-3" viewBox="0 0 32 32" fill="currentColor">
                <path d="M4 8L12 4L20 8L16 12L8 16L4 12Z"/>
                <path d="M12 16L20 12L28 16L24 20L16 24L12 20Z"/>
              </svg>
              CIPHERTECH
              <div className="text-xs ml-2 opacity-75">MINING SOLUTIONS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}