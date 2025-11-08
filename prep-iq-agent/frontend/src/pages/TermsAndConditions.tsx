import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import prepiqLogo from "@/assets/prepiq-logo.jpg";

const TermsAndConditions = () => {
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
            <h1 className="text-3xl font-bold mb-2">Terms and Conditions</h1>
            <p className="text-muted-foreground">Last updated: November 2025</p>
          </div>

          {/* Content */}
          <div className="space-y-6 text-foreground/90">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using PrepIQ, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to these terms, please do not use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Description of Service</h2>
              <p>
                PrepIQ provides an AI-powered exam preparation platform designed to help students prepare for competitive 
                examinations including JEE, NEET, UPSC, CAT, GATE, and others. Our services include:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li>Personalized study plans and scheduling</li>
                <li>AI-generated practice questions and mock exams</li>
                <li>Performance tracking and analytics</li>
                <li>AI study buddy for doubt resolution</li>
                <li>Comprehensive study materials and explanations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. User Accounts</h2>
              <p>To use PrepIQ, you must create an account by providing accurate and complete information. You are responsible for:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized access</li>
                <li>Ensuring you are at least 13 years of age (or have parental consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. User Responsibilities</h2>
              <p>When using PrepIQ, you agree to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li>Use the platform solely for lawful educational purposes</li>
                <li>Not share your account with others</li>
                <li>Not attempt to reverse engineer or hack the platform</li>
                <li>Not use the platform to cheat in actual examinations</li>
                <li>Not copy, distribute, or reproduce content without permission</li>
                <li>Respect intellectual property rights of all materials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Intellectual Property</h2>
              <p>
                All content, features, and functionality on PrepIQ, including but not limited to text, graphics, logos, 
                study materials, questions, and software, are owned by PrepIQ and are protected by international copyright, 
                trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. AI-Generated Content</h2>
              <p>
                PrepIQ uses artificial intelligence to generate personalized content, questions, and explanations. While we 
                strive for accuracy, AI-generated content may occasionally contain errors. We recommend cross-referencing 
                important information with official study materials and qualified educators.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Payment and Subscriptions</h2>
              <p>
                Certain features of PrepIQ may require payment. By subscribing to paid services, you agree to pay all 
                applicable fees. Subscription fees are non-refundable except as required by law. We reserve the right to 
                modify pricing with advance notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Limitation of Liability</h2>
              <p>
                PrepIQ is provided as an educational tool to assist in exam preparation. We do not guarantee specific exam 
                results or admission to educational institutions. PrepIQ shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages arising from your use of the platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Termination</h2>
              <p>
                We reserve the right to suspend or terminate your account if you violate these terms or engage in conduct 
                that we deem inappropriate or harmful to other users or the platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Changes to Terms</h2>
              <p>
                We may modify these terms at any time. Continued use of PrepIQ after changes constitutes acceptance of the 
                modified terms. We will notify users of significant changes via email or platform notification.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">11. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of India, without regard to its 
                conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">12. Contact Information</h2>
              <p>
                For questions about these Terms and Conditions, please contact us at:
              </p>
              <p className="mt-2">
                Email: support@prepiq.com<br />
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

export default TermsAndConditions;
