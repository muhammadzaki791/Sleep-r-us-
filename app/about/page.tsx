import WhatsAppButton from "../../components/whatsapp-button/whatsapp-button";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Split Layout */}
      <section className="container mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Content */}
          <div className="space-y-8">
            <header>
              <span className="text-sm font-bold tracking-widest text-gray-400 uppercase">
                Discover Our Legacy
              </span>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-[#0B3D91] mt-2 leading-tight">
                About Sleep R Us
              </h1>
            </header>

            <div className="prose prose-lg text-gray-600 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-[#0B3D91]">
                  Our Story
                </h2>
                <p>
                  Founded with a passion for quality sleep,{" "}
                  <strong>Sleep R Us</strong> has been providing premium beds
                  and mattresses for over a decade. We believe that everyone
                  deserves a good night's rest, and we're dedicated to helping
                  you find the perfect sleep solution.
                </p>
                <p>
                  Our carefully curated product line features the finest
                  materials and craftsmanship, ensuring comfort and durability
                  for years to come.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#0B3D91]">
                  Our Mission
                </h2>
                <p>
                  At Sleep R Us, our mission is to improve your life through
                  better sleep. We achieve this by offering premium quality beds
                  and mattresses that meet the diverse needs of our customers.
                </p>
              </section>
            </div>
          </div>

          {/* Right Side: Elegant Image */}
          <div className="relative h-[500px] lg:h-[650px] w-full overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/about-pic.jpg"
              alt="Luxury Bed Showroom"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-[#0B3D91]/10 mix-blend-multiply"></div>
          </div>
        </div>
      </section>

      {/* Quality & Showroom Secondary Section */}
      <section className="py-20 border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Quality Promise - Minimalist Style */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#0B3D91]/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-[#0B3D91]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0B3D91] tracking-tight mb-2 uppercase">
                  Quality Promise
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  Every piece in our collection undergoes rigorous quality
                  testing. We partner exclusively with master craftsmen to
                  ensure your investment stands the test of time.
                </p>
              </div>
            </div>

            {/* Showroom - Minimalist Style */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#0B3D91]/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-[#0B3D91]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0B3D91] tracking-tight mb-2 uppercase">
                  The Showroom Experience
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  Visit our physical gallery to feel the textures and test the
                  support. Our sleep consultants are available for private
                  walkthroughs tailored to your comfort profile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppButton message="Hello, I'd like to learn more about your products and possibly visit your showroom." />
    </div>
  );
}
