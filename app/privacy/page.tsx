import WhatsAppButton from '../../components/whatsapp-button/whatsapp-button'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-[#0B3D91] mb-8">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-6">
            <strong>Last updated:</strong> January 16, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#0B3D91] mb-4">Introduction</h2>
            <p className="text-gray-700 mb-4">
              Sleep R Us ("us", "we", or "our") operates the sleep-r-us.com website (the "Service").
            </p>
            <p className="text-gray-700">
              This page informs you of our policies regarding the collection, use, and disclosure of personal data
              when you use our Service and the choices you have associated with that data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#0B3D91] mb-4">Information Collection and Use</h2>
            <p className="text-gray-700 mb-4">
              We collect several different types of information for various purposes to provide and improve our
              Service to you.
            </p>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Types of Data Collected</h3>
            <h4 className="text-lg font-medium text-gray-800 mb-2">Personal Data</h4>
            <p className="text-gray-700 mb-4">
              While using our Service, we may ask you to provide us with certain personally identifiable
              information that can be used to contact or identify you ("Personal Data"). Personally
              identifiable information may include, but is not limited to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Email address</li>
              <li>First name and last name</li>
              <li>Phone number</li>
              <li>Address, State, Province, ZIP/Postal code</li>
              <li>Cookies and Usage Data</li>
            </ul>
            <h4 className="text-lg font-medium text-gray-800 mb-2">Usage Data</h4>
            <p className="text-gray-700">
              We may also collect information on how the Service is accessed and used ("Usage Data"). This
              Usage Data may include information such as your computer's Internet Protocol address (e.g. IP
              address), browser type, browser version, the pages of our Service that you visit, the time and
              date of your visit, the time spent on those pages, unique device identifiers and other
              diagnostic data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#0B3D91] mb-4">Use of Data</h2>
            <p className="text-gray-700 mb-4">
              Sleep R Us uses the collected data for various purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>To provide and maintain the Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
              <li>To provide customer care and support</li>
              <li>To provide analysis or valuable information so that we can improve the Service</li>
              <li>To monitor the usage of the Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#0B3D91] mb-4">Transfer Of Data</h2>
            <p className="text-gray-700">
              Your information, including Personal Data, may be transferred to — and maintained on — computers
              located outside of your state, province, country or other governmental jurisdiction where the
              data protection laws may differ than those from your jurisdiction. If you are located outside
              United States and choose to provide information to us, please note that we transfer the data,
              including Personal Data, to United States and process it there.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#0B3D91] mb-4">Disclosure Of Data</h2>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Legal Requirements</h3>
            <p className="text-gray-700">
              Sleep R Us may disclose your Personal Data in the good faith belief that such action is necessary
              to: comply with a legal obligation; protect and defend the rights or property of Sleep R Us;
              prevent or investigate possible wrongdoing in connection with the Service; protect the personal
              safety of users of the Service or the public; protect against legal liability.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#0B3D91] mb-4">Security Of Data</h2>
            <p className="text-gray-700">
              The security of your data is important to us, but remember that no method of transmission over
              the Internet, or method of electronic storage is 100% secure. While we strive to use commercially
              acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#0B3D91] mb-4">Service Providers</h2>
            <p className="text-gray-700">
              We may employ third party companies and individuals to facilitate our Service ("Service Providers"),
              to provide the Service on our behalf, to perform Service-related services or to assist us in
              analyzing how our Service is used. These third parties have access to your Personal Data only to
              perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#0B3D91] mb-4">Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mt-2">
              <li>By email: enquiries@sleeprus.co.uk</li>
              <li>By phone: +44 113 403 6673</li>
            </ul>
          </section>
        </div>
      </div>

      <WhatsAppButton message="Hello, I have questions about your privacy policy. Can you provide more information?" />
    </div>
  )
}