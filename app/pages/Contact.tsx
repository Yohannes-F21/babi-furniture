"use client";

import type React from "react";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import Toast from "@/app/components/Toast";
import publicApi from "@/lib/publicApi";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const sendMessage = async (data: typeof formData) => {
    // Simulate sending message
    const response = await publicApi.post("/contact-us", data);
    return response.data;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    sendMessage(formData);
    setIsSubmitting(false);

    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
    setToast({ type: "success", message: "Message sent successfully!" });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="pt-16">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get in touch with us for quotes, custom orders, or any questions
            about our furniture
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-colors duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-colors duration-200"
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-colors duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-colors duration-200 resize-vertical"
                    placeholder="Tell us about your furniture needs, custom requirements, or any questions you have..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-amber-700 transition-colors duration-300 flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Phone Numbers
                    </h3>
                    <p className="text-gray-600">0920244062</p>
                    <p className="text-gray-600">0983835555</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">
                      hailegebralefantahun@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Business Hours
                    </h3>
                    <p className="text-gray-600">
                      Monday - Saturday: 8:00 AM - 6:00 PM
                    </p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Showroom Locations */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Visit Our Showrooms
                </h3>
                <div className="space-y-6">
                  <div className="p-6 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-4">
                      <MapPin className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Gerji Jakros Showroom
                        </h4>
                        <p className="text-gray-600 mb-2">
                          Opposite Mebrathail
                        </p>
                        <p className="text-sm text-gray-500">
                          Our main showroom featuring the complete furniture
                          collection
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* <div className="p-6 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-4">
                      <MapPin className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Salete Mehret Showroom
                        </h4>
                        <p className="text-gray-600 mb-2">Behind 3F</p>
                        <p className="text-sm text-gray-500">
                          Specialized in bedroom and dining room furniture
                        </p>
                      </div>
                    </div>
                  </div> */}

                  {/* <div className="p-6 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-4">
                      <MapPin className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Gurd Shola Showroom
                        </h4>
                        <p className="text-gray-600 mb-2">
                          Opposite Ethio Telecom
                        </p>
                        <p className="text-sm text-gray-500">
                          Focus on living room furniture and custom orders
                        </p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Us</h2>
            <p className="text-xl text-gray-600">
              Visit any of our convenient locations in Addis Ababa
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-6">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-amber-600 mx-auto mb-2" />
                <p className="text-gray-600">Interactive map coming soon</p>
                <p className="text-sm text-gray-500">
                  Call us for detailed directions to any of our showrooms
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0920244062"
                className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors duration-300"
              >
                Call for Directions
              </a>
              <a
                href="mailto:hailegebralefantahun@gmail.com"
                className="border-2 border-amber-600 text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 hover:text-white transition-all duration-300"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
