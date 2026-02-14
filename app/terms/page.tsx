import WhatsAppButton from '../../components/whatsapp-button/whatsapp-button'

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-[#0B3D91] mb-8">Terms and Conditions</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-6">
            <strong>Last updated:</strong> January 16, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#0B3D91] mb-4">Introduction</h2>
            <p className="text-gray-700">
              Welcome to Sleep R Us. These terms and conditions outline the rules and regulations for the use
              of Sleep R Us's Website, located at www.sleep-r-us.com. By accessing this website, we assume
              you accept these terms and conditions. Do not continue to use Sleep R Us if you do not agree
              to take all of the terms and conditions stated on this page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#0B3D91] mb-4">License to Use</h2>
            <p className="text-gray-700 mb-4">
              Unless otherwise stated, Sleep R Us and/or its licensors own the intellectual property rights
              for all material on Sleep R Us. All intellectual property rights are reserved. You may access
              this from Sleep R Us for your own personal use subjected to restrictions set in these terms
              and conditions.
            </p>
            <p className="text-gray-700">
              You must not: Republish material from Sleep R Us; Sell, rent or sub-license material from
              Sleep R Us; Reproduce, duplicate or copy material from Sleep R Us; Redistribute content from
              Sleep R Us. Parts of this website offer an opportunity for users to post and exchange opinions
              and information in certain areas of the website. Sleep R Us does not filter, edit, publish
              or review Comments prior to their presence on the website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#0B3D91] mb-4">Disclaimer</h2>
            <p className="text-gray-700 mb-4">
              The materials on Sleep R Us are provided on an 'as is' basis. Sleep R Us makes no warranties,
              expressed or implied, and hereby disclaims and negates all other warranties including, without
              limitation, implied warranties or conditions of merchantability, fitness for a particular
              purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p className="text-gray-700">
              Further, Sleep R Us does not warrant or make any representations concerning the accuracy,
              likely results, or reliability of the use of the materials on its website or otherwise relating
              to such materials or on any sites linked to this site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#0B3D91] mb-4">Limitations</h2>
            <p className="text-gray-700">
              In no event shall Sleep R Us or its suppliers be liable for any damages (including, without
              limitation, damages for loss of data or profit, or due to business interruption) arising out
              of the use or inability to use the materials on Sleep R Us, even if Sleep R Us or a Sleep R Us
              authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#0B3D91] mb-4">Accuracy of Materials</h2>
            <p className="text-gray-700">
              The materials appearing on Sleep R Us website could include technical, typographical, or
              photographic errors. Sleep R Us does not warrant that any of the materials on its website
              are accurate, complete or current. Sleep R Us may make changes to the materials contained
              on its website at any time without notice. However Sleep R Us does not make any commitment
              to update the materials.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#0B3D91] mb-4">Links</h2>
            <p className="text-gray-700">
              Sleep R Us has not reviewed all of the sites linked to its website and is not responsible
              for the contents of any such linked site. The inclusion of any link does not imply endorsement
              by Sleep R Us of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#0B3D91] mb-4">Modifications</h2>
            <p className="text-gray-700">
              Sleep R Us may revise these terms of service at any time without notice. By using this
              website you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#0B3D91] mb-4">Governing Law</h2>
            <p className="text-gray-700">
              These terms and conditions are governed by and construed in accordance with the laws of
              the United States and you irrevocably submit to the exclusive jurisdiction of the courts
              in that State or location.
            </p>
          </section>
        </div>
      </div>

      <WhatsAppButton message="Hello, I have questions about your terms and conditions. Can you provide more information?" />
    </div>
  )
}