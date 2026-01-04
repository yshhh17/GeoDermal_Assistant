import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { FaShieldAlt, FaLock, FaUserSecret, FaDatabase } from 'react-icons/fa';

function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-secondary to-bg-accent">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-primary-green rounded-full mb-4">
            <FaShieldAlt className="text-5xl text-white" />
          </div>
          <h1 className="text-5xl font-bold text-text-primary mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-text-secondary">
            Last updated: January 2026
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-8">
          {/* Introduction */}
          <section>
            <p className="text-lg text-text-secondary leading-relaxed">
              At GeoDermal Assistant, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our service.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-text-primary">Information We Collect</h2>
            </div>
            <div className="space-y-4 ml-12">
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">Information You Provide</h3>
                <ul className="list-disc list-inside space-y-2 text-text-secondary">
                  <li>Travel details (home city, destination city, duration)</li>
                  <li>Personal care preferences (skin type, hair type, concerns)</li>
                  <li>Analysis request data (date, time, analysis type)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">Automatically Collected Information</h3>
                <ul className="list-disc list-inside space-y-2 text-text-secondary">
                  <li>IP address (for rate limiting and abuse prevention)</li>
                  <li>Browser type and version</li>
                  <li>Device information</li>
                  <li>Usage statistics (page views, analysis requests)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-text-primary">How We Use Your Information</h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-text-secondary ml-12">
              <li>To provide personalized skin and hair care recommendations</li>
              <li>To analyze environmental conditions at your destination</li>
              <li>To improve our AI models and service quality</li>
              <li>To prevent abuse and enforce rate limits</li>
              <li>To generate anonymous usage statistics</li>
              <li>To communicate service updates (if you opt-in)</li>
            </ul>
          </section>

          {/* Data Storage and Security */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-text-primary">Data Storage and Security</h2>
            </div>
            <div className="space-y-4 ml-12 text-text-secondary">
              <p>
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Encrypted data transmission (HTTPS/TLS)</li>
                <li>Secure database storage with PostgreSQL</li>
                <li>Rate limiting to prevent unauthorized access</li>
                <li>Regular security audits and updates</li>
                <li>No storage of sensitive payment information</li>
              </ul>
              <p className="mt-4">
                Your analysis data is stored temporarily in your browser's localStorage and is never transmitted to third parties.
              </p>
            </div>
          </section>

          {/* What We DON'T Do */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-text-primary">What We DON'T Do</h2>
            </div>
            <div className="bg-status-success/10 border-2 border-status-success rounded-xl p-6 ml-12">
              <ul className="space-y-3 text-text-primary font-semibold">
                <li className="flex items-center">
                  We DO NOT sell your personal information
                </li>
                <li className="flex items-center">
                  We DO NOT share your data with advertisers
                </li>
                <li className="flex items-center">
                  We DO NOT track you across other websites
                </li>
                <li className="flex items-center">
                  We DO NOT require account creation to use basic features
                </li>
                <li className="flex items-center">
                  We DO NOT store payment card information
                </li>
              </ul>
            </div>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Third-Party Services</h2>
            <p className="text-text-secondary mb-4 ml-0">
              We use the following third-party services to provide our functionality:
            </p>
            <div className="space-y-3 ml-0">
              <div className="bg-bg-secondary p-4 rounded-lg">
                <h3 className="font-semibold text-text-primary mb-1">Open-Meteo API</h3>
                <p className="text-sm text-text-secondary">For weather and UV index data.  No personal data shared.</p>
              </div>
              <div className="bg-bg-secondary p-4 rounded-lg">
                <h3 className="font-semibold text-text-primary mb-1">OpenAQ API</h3>
                <p className="text-sm text-text-secondary">For air quality data. No personal data shared.</p>
              </div>
              <div className="bg-bg-secondary p-4 rounded-lg">
                <h3 className="font-semibold text-text-primary mb-1">Groq AI</h3>
                <p className="text-sm text-text-secondary">For AI-powered analysis. Only anonymous environmental data shared.</p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Your Rights</h2>
            <div className="text-text-secondary space-y-3 ml-0">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Access your data stored on our servers</li>
                <li>Request deletion of your analysis history</li>
                <li>Opt-out of analytics and tracking</li>
                <li>Clear your browser's localStorage at any time</li>
                <li>Request a copy of your data</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us at <a href="mailto: yshhh173@gmail.com" className="text-primary-green font-semibold hover:underline">yshhh173@gmail.com</a>
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Cookies and Local Storage</h2>
            <p className="text-text-secondary ml-0">
              We use browser localStorage to temporarily store your analysis data for the session.  This data remains on your device and is never automatically transmitted to our servers.  You can clear this data at any time through your browser settings.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Children's Privacy</h2>
            <p className="text-text-secondary ml-0">
              Our service is not directed to children under 13 years of age. We do not knowingly collect personal information from children.  If you believe we have collected information from a child, please contact us immediately.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Changes to This Policy</h2>
            <p className="text-text-secondary ml-0">
              We may update this Privacy Policy from time to time. We will notify users of any material changes by updating the "Last updated" date at the top of this policy.  Continued use of the service after changes constitutes acceptance of the updated policy. 
            </p>
          </section>

          {/* Contact */}
          <section className="border-t-2 border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Contact Us</h2>
            <p className="text-text-secondary mb-4">
              If you have any questions about this Privacy Policy, please contact us: 
            </p>
            <div className="bg-bg-accent p-6 rounded-xl">
              <p className="text-text-primary"><strong>Email:</strong> <a href="mailto:yshhh173@gmail.com" className="text-primary-green hover: underline">yshhh173@gmail.com</a></p>
              <p className="text-text-primary mt-2"><strong>GitHub:</strong> <a href="https://github.com/yshhh17/GeoDermal_Assistant" target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline">yshhh17/GeoDermal_Assistant</a></p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Privacy;