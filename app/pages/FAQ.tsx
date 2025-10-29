"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]))
  }

  const faqs = [
    {
      question: "What does your warranty cover?",
      answer:
        "Our comprehensive two-year warranty covers manufacturing defects, structural issues, and normal wear and tear. This includes frame construction, springs, and hardware. The warranty does not cover damage from misuse, accidents, or normal fabric wear from daily use.",
    },
    {
      question: "Do you offer custom sizes for your furniture?",
      answer:
        "Yes, we specialize in custom furniture manufacturing. We can adjust dimensions, modify designs, and create completely custom pieces to fit your specific space requirements. Our design team will work with you to ensure the custom piece meets your exact specifications while maintaining structural integrity.",
    },
    {
      question: "What are your delivery timelines?",
      answer:
        "Standard furniture pieces are typically delivered within 7-10 days of order confirmation. Custom orders may take 2-3 weeks depending on the complexity of the design and current production schedule. We provide free delivery within Addis Ababa and can arrange delivery to other locations for an additional fee.",
    },
    {
      question: "What fabric and material options do you offer?",
      answer:
        "We offer a wide range of high-quality materials including genuine leather, premium fabrics, microfiber, and various upholstery options. Our material selection includes different colors, textures, and durability grades. We can also source specific materials upon request to match your interior design requirements.",
    },
    {
      question: "Can I mix different seat counts in a sofa set?",
      answer:
        "We offer flexible sofa configurations including single seats, two-seaters, three-seaters, and sectional combinations. You can mix and match different pieces from the same collection to create a custom seating arrangement that fits your living space perfectly.",
    },
    {
      question: "What are the conditions for free delivery?",
      answer:
        "We provide free delivery within Addis Ababa city limits for all furniture purchases. This includes ground floor delivery and basic assembly if required. For upper floor deliveries or locations outside Addis Ababa, additional charges may apply based on distance and accessibility.",
    },
    {
      question: "Do you provide assembly services?",
      answer:
        "Yes, we provide professional assembly services for all our furniture pieces. Our experienced team will assemble your furniture at your location and ensure everything is properly set up. This service is included with delivery for most items.",
    },
    {
      question: "Can I see the furniture before purchasing?",
      answer:
        "We encourage customers to visit our showrooms at Beklo Bet, Salete Mehret, or Gurd Shola to see and test our furniture in person. You can experience the quality, comfort, and craftsmanship firsthand before making your decision.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods including cash, bank transfers, and mobile money payments. For custom orders, we typically require a 50% deposit to begin production, with the balance due upon delivery.",
    },
    {
      question: "Do you offer interior design consultation?",
      answer:
        "Yes, our experienced design team can provide consultation services to help you choose the right furniture pieces for your space. We can advise on color coordination, space planning, and furniture arrangement to create a cohesive and functional interior design.",
    },
  ]

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our furniture, services, and policies
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                    {openItems.includes(index) ? (
                      <ChevronUp className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    )}
                  </div>
                </button>

                {openItems.includes(index) && (
                  <div className="px-6 pb-4 bg-gray-50">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center p-8 bg-amber-50 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
            <p className="text-gray-600 mb-6">
              Our team is here to help you with any additional questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0979426642"
                className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors duration-300"
              >
                Call Us: 0979 426642
              </a>
              <a
                href="mailto:info@alphafurniture.net"
                className="border-2 border-amber-600 text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 hover:text-white transition-all duration-300"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
