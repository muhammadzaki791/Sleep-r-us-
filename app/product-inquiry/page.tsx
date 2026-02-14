import { Suspense } from "react";
import ProductInquiryPageContent from "./ProductInquiryContent";

export default function ProductInquiryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center"><p>Loading...</p></div>}>
      <ProductInquiryPageContent />
    </Suspense>
  );
}
