"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FadeIn } from "../../lib/animations";
import WhatsAppButton from "@/components/whatsapp-button/whatsapp-button";

export default function ProductInquiryPageContent() {
  const searchParams = useSearchParams();
  const productName = searchParams.get("product");
  const productSlug = searchParams.get("slug");

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
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

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Name is required";
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = "Email is invalid";
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
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName,
          productSlug,
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
          customerPhone: formData.customerPhone,
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
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FadeIn>
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-[#0B3D91] mb-4">
              Product Inquiry
            </h1>
            <p className="text-lg text-gray-600">
              Interested in {productName || "this product"}? Send us a message and we'll get back
              to you soon.
            </p>
          </div>
        </FadeIn>

        {productName && (
          <FadeIn>
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Product Details
              </h2>
              <p className="text-gray-700">
                <span className="font-medium">Product:</span> {productName}
              </p>
            </div>
          </FadeIn>
        )}

        {submitSuccess ? (
          <FadeIn>
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center mb-8">
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                Thank You!
              </h3>
              <p className="text-green-700 mb-6">
                Your inquiry for{" "}
                <span className="font-semibold">{productName || "this product"}</span> has been
                sent successfully. We'll get back to you as soon as possible.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#0B3D91] to-[#1A5BB8] text-white font-semibold rounded-lg hover:from-[#082a69] hover:to-[#164a96] transition-all duration-300"
              >
                Back to Home
              </Link>
            </div>
          </FadeIn>
        ) : (
          <FadeIn>
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="customerName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0B3D91] focus:border-[#0B3D91] transition-colors ${
                      errors.customerName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.customerName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.customerName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="customerEmail"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="customerEmail"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0B3D91] focus:border-[#0B3D91] transition-colors ${
                      errors.customerEmail
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.customerEmail && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.customerEmail}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="customerPhone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="customerPhone"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B3D91] focus:border-[#0B3D91] transition-colors"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0B3D91] focus:border-[#0B3D91] transition-colors ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Tell us about your interest in this product..."
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              {submitError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700">{submitError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 bg-gradient-to-r from-[#0B3D91] to-[#1A5BB8] text-white font-semibold rounded-xl hover:from-[#082a69] hover:to-[#164a96] transition-all duration-300 ${
                  isSubmitting
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:scale-[1.02]"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    Sending...
                  </span>
                ) : (
                  "Send Inquiry"
                )}
              </button>
            </form>
          </FadeIn>
        )}

        <WhatsAppButton message="Hello, I'm interested in your products. Can you provide more information?" />
      </div>
    </div>
  );
}