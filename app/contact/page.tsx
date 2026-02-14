"use client";

import React from "react"

import { useState, useEffect } from "react";
import WhatsAppButton from '../../components/whatsapp-button/whatsapp-button';
import { Mail, Phone } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Reset success/error states when form data changes
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setErrors({});
    }
    if (submitSuccess) {
      setSubmitSuccess(false);
    }
    if (submitError) {
      setSubmitError("");
    }
  }, [formData]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.error || "Failed to send email");
      }

      setSubmitSuccess(true);
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitError(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero Section */}
      <section className="px-4 pt-16 pb-16 md:pt-24 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-6xl font-serif leading-tight mb-8 text-slate-900">
                Let's Talk
              </h1>
              <p className="text-lg text-slate-600 mb-12 leading-relaxed">
                Have a question or ready to get started? We'd love to hear from you. Reach out to us and we'll respond as quickly as possible.
              </p>
              
              {/* Contact Info Cards */}
              <div className="space-y-8">
                {/* Phone */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#0B3D91]/10">
                      <Phone className="w-6 h-6 text-[#0B3D91]" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-1">Phone</p>
                    <a href="tel:+441134036673" className="text-[#0B3D91] font-medium hover:text-[#082a69] transition-colors">
                      +44 113 403 6673
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#0B3D91]/10">
                      <Mail className="w-6 h-6 text-[#0B3D91]" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-1">Email</p>
                    <a href="mailto:enquiries@sleeprus.co.uk" className="text-[#0B3D91] font-medium hover:text-[#082a69] transition-colors">
                      enquiries@sleeprus.co.uk
                    </a>
                  </div>
                </div>

                {/* Response Time */}
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    <span className="font-semibold text-slate-900">Response Time:</span> We typically respond within 24 business hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Form Section */}
            <div>
              {submitSuccess ? (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-8">
                    <svg className="w-8 h-8 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-4xl font-serif mb-4 text-slate-900">
                    Thank You
                  </h2>
                  <p className="text-slate-600 mb-8 max-w-sm mx-auto leading-relaxed">
                    We've received your message and will get back to you within 24 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="px-8 py-3 bg-[#0B3D91] text-white rounded-lg font-medium hover:bg-[#082a69] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg font-medium transition-all focus:outline-none ${
                        errors.name 
                          ? "border-red-500 bg-red-50/50 focus:border-red-600" 
                          : "border-slate-300 bg-white hover:border-slate-400 focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/10"
                      } text-slate-900 placeholder-slate-500`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600 font-medium">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg font-medium transition-all focus:outline-none ${
                        errors.email 
                          ? "border-red-500 bg-red-50/50 focus:border-red-600" 
                          : "border-slate-300 bg-white hover:border-slate-400 focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/10"
                      } text-slate-900 placeholder-slate-500`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600 font-medium">{errors.email}</p>
                    )}
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-slate-900 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg font-medium transition-all focus:outline-none ${
                        errors.subject 
                          ? "border-red-500 bg-red-50/50 focus:border-red-600" 
                          : "border-slate-300 bg-white hover:border-slate-400 focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/10"
                      } text-slate-900 placeholder-slate-500`}
                      placeholder="How can we help?"
                    />
                    {errors.subject && (
                      <p className="mt-2 text-sm text-red-600 font-medium">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg font-medium transition-all focus:outline-none resize-none ${
                        errors.message 
                          ? "border-red-500 bg-red-50/50 focus:border-red-600" 
                          : "border-slate-300 bg-white hover:border-slate-400 focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/10"
                      } text-slate-900 placeholder-slate-500`}
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-600 font-medium">{errors.message}</p>
                    )}
                  </div>

                  {/* Error Message */}
                  {submitError && (
                    <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                      <p className="text-red-700 font-medium">{submitError}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                      isSubmitting
                        ? "bg-slate-300 cursor-not-allowed opacity-70 text-slate-600"
                        : "bg-[#0B3D91] hover:bg-[#082a69] text-white shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending Message...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>



      <WhatsAppButton message="Hello, I'd like to get in touch with Sleep R Us. Can you help me with that?" />
    </div>
  )
}
