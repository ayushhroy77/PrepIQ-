import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import prepiqLogo from "@/assets/prepiq-logo.jpg";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-hero py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 sm:p-12 glass-card">
          {/* Header */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
              <img src={prepiqLogo} alt="PrepIQ Logo" className="w-10 h-10 rounded-lg" />
              <span className="text-xl font-bold">PrepIQ</span>
            </Link>
            <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: November 2025</p>
          </div>

          {/* Content */}
          <div className="space-y-6 text-foreground/90">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p>
                At PrepIQ, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
                AI-powered exam preparation platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
              <h3 className="text-lg font-medium mt-4 mb-2">2.1 Personal Information</h3>
              <p>When you register for PrepIQ, we collect:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li>Full name and email address</li>
                <li>Phone number (optional)</li>
                <li>Target examination preferences</li>
                <li>Education level and preferred language</li>
                <li>Password (encrypted and securely stored)</li>
              </ul>

              <h3 className="text-lg font-medium mt-4 mb-2">2.2 Usage Data</h3>
              <p>We automatically collect information about your interaction with our platform:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li>Study session duration and frequency</li>
                <li>Questions attempted and performance metrics</li>
                <li>Areas of strength and weakness</li>
                <li>Device information and browser type</li>
                <li>IP address and location data</li>
                <li>Pages visited and features used</li>
              </ul>

              <h3 className="text-lg font-medium mt-4 mb-2">2.3 AI Interaction Data</h3>
              <p>
                Conversations with our AI study buddy and generated content are stored to improve personalization and 
                service quality.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
              <p>We use the collected information to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li>Provide personalized study plans and recommendations</li>
                <li>Track your progress and generate performance analytics</li>
                <li>Improve our AI algorithms and content quality</li>
                <li>Send important updates about your account and studies</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Detect and prevent fraudulent activities</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Data Sharing and Disclosure</h2>
              <p>
                We do not sell your personal information. We may share your data only in the following circumstances:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li><strong>Service Providers:</strong> Third-party services that help us operate the platform (hosting, analytics, payment processing)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
                <li><strong>With Your Consent:</strong> When you explicitly authorize us to share specific information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Secure authentication and password hashing</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and monitoring</li>
                <li>Secure cloud infrastructure</li>
              </ul>
              <p className="mt-2">
                However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security 
                but strive to protect your information to the best of our ability.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Your Privacy Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
                <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Objection:</strong> Object to certain data processing activities</li>
              </ul>
              <p className="mt-2">
                To exercise these rights, contact us at privacy@prepiq.com
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Data Retention</h2>
              <p>
                We retain your personal information for as long as your account is active or as needed to provide services. 
                After account deletion, we may retain certain data for legal, regulatory, or legitimate business purposes, 
                including backup copies for a limited period.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Children's Privacy</h2>
              <p>
                PrepIQ is designed for students aged 13 and above. If a user is under 18, we recommend parental guidance 
                and supervision. We do not knowingly collect information from children under 13 without parental consent. 
                If we discover such collection, we will promptly delete the information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar technologies to enhance your experience, remember your preferences, and analyze 
                platform usage. You can control cookie settings through your browser, but disabling cookies may affect 
                functionality.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Third-Party Services</h2>
              <p>
                Our platform may contain links to third-party websites or integrate with external services (e.g., Google 
                authentication). We are not responsible for the privacy practices of these third parties. Please review 
                their privacy policies separately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">11. International Data Transfers</h2>
              <p>
                Your data may be transferred to and processed in countries other than your country of residence. We ensure 
                appropriate safeguards are in place to protect your data in accordance with this Privacy Policy and 
                applicable laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">12. Changes to Privacy Policy</h2>
              <p>
                We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. 
                We will notify you of significant changes via email or platform notification. Continued use after changes 
                constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">13. Contact Us</h2>
              <p>
                For questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us at:
              </p>
              <p className="mt-2">
                Email: privacy@prepiq.com<br />
                Data Protection Officer: dpo@prepiq.com<br />
                Address: PrepIQ Education Services, India
              </p>
            </section>
          </div>

          {/* Back Button */}
          <div className="mt-8 pt-6 border-t border-border">
            <Link to="/register">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Registration
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
