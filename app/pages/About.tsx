import { Users, Award, Truck, Clock, MapPin, Phone } from "lucide-react"

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Alpha Furniture</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            19+ years of crafting quality furniture with dedication, expertise, and commitment to excellence
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Who We Are</h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  Alpha Furniture Ethiopia has been a trusted name in the furniture industry for over 19 years. We
                  specialize in creating high-quality, custom furniture that combines traditional craftsmanship with
                  modern design principles.
                </p>
                <p>
                  Our journey began with a simple mission: to provide Ethiopian families with beautiful, durable
                  furniture that enhances their living spaces. Today, we continue to uphold this commitment through our
                  extensive range of sofas, beds, dining sets, and custom pieces.
                </p>
                <p>
                  Every piece of furniture we create is a testament to our dedication to quality, attention to detail,
                  and understanding of our customers' needs.
                </p>
              </div>
            </div>
            <div>
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Alpha Furniture Workshop"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Depend on Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Depend on Us</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive services to ensure your complete satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <Award className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Two Year Warranty</h3>
              <p className="text-gray-600">
                Comprehensive warranty coverage on all our furniture pieces for your peace of mind.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <Truck className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Free Delivery</h3>
              <p className="text-gray-600">Complimentary delivery service within Addis Ababa for all our customers.</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <Clock className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">7-10 Days Lead Time</h3>
              <p className="text-gray-600">Quick turnaround time for custom orders and standard furniture pieces.</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <Users className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Craftsmanship</h3>
              <p className="text-gray-600">Skilled artisans with decades of experience in furniture making.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customize Your Home */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Custom Furniture Design"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Customize Your Home</h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  At Alpha Furniture, we understand that every home is unique. That's why we offer comprehensive
                  customization services to help you create furniture that perfectly fits your space and style
                  preferences.
                </p>
                <p>
                  Our design team works closely with you to understand your vision, space requirements, and functional
                  needs. Whether you need a specific size, color, or design modification, we can accommodate your
                  requests.
                </p>
                <p>
                  From selecting the right materials to choosing the perfect finish, we guide you through every step of
                  the customization process to ensure your furniture is exactly what you envisioned.
                </p>
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Custom sizes and dimensions</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Wide range of fabric and material options</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Color matching services</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Design consultation included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showroom Locations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Visit Our Showrooms</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience our furniture collections in person at our convenient locations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <MapPin className="w-8 h-8 text-amber-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Beklo Bet</h3>
              <p className="text-gray-600 mb-4">Opposite Alpha Building</p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>0979 426642</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <MapPin className="w-8 h-8 text-amber-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Salete Mehret</h3>
              <p className="text-gray-600 mb-4">Behind 3F</p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>0979420042</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <MapPin className="w-8 h-8 text-amber-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Gurd Shola</h3>
              <p className="text-gray-600 mb-4">Opposite Ethio Telecom</p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>0979 426642</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
