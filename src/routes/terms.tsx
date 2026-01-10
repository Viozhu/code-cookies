import { createFileRoute } from '@tanstack/react-router'
import { LegalPageLayout } from '@/components/shared/LegalPageLayout'

export const Route = createFileRoute('/terms')({
  component: TermsOfServicePage,
})

function TermsOfServicePage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      lastUpdated="December 2024"
    >
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using CodeCookies, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
      </p>

      <h2>2. Description of Service</h2>
      <p>
        CodeCookies is an educational platform designed to teach children programming logic through interactive puzzles and gamified rewards. The service includes:
      </p>
      <ul>
        <li>Interactive programming puzzles</li>
        <li>Progress tracking and cookie rewards</li>
        <li>Educational content and tutorials</li>
        <li>Safe, child-friendly environment</li>
      </ul>

      <h2>3. User Accounts</h2>
      <h3>3.1 Account Creation</h3>
      <p>
        Users may be required to create an account to access certain features. You agree to:
      </p>
      <ul>
        <li>Provide accurate and complete information</li>
        <li>Maintain and update your information to keep it current</li>
        <li>Keep your account credentials secure</li>
        <li>Notify us immediately of any unauthorized use</li>
      </ul>

      <h3>3.2 Account Responsibility</h3>
      <p>
        You are responsible for all activities that occur under your account. CodeCookies is not liable for any loss or damage arising from unauthorized access to your account.
      </p>

      <h2>4. User Conduct</h2>
      <p>
        You agree to use CodeCookies only for lawful purposes and in a way that does not infringe the rights of others. You agree not to:
      </p>
      <ul>
        <li>Use the service for any illegal activity</li>
        <li>Attempt to gain unauthorized access to our systems</li>
        <li>Interfere with or disrupt the service</li>
        <li>Share your account with others</li>
        <li>Use automated systems to access the service</li>
      </ul>

      <h2>5. Intellectual Property</h2>
      <p>
        All content on CodeCookies, including but not limited to text, graphics, logos, images, and software, is the property of CodeCookies or its content suppliers and is protected by international copyright laws.
      </p>
      <p>
        You may not reproduce, distribute, modify, or create derivative works from any content without express written permission from CodeCookies.
      </p>

      <h2>6. Privacy and Data Protection</h2>
      <p>
        Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices. CodeCookies complies with COPPA and GDPR regulations to protect children's privacy.
      </p>

      <h2>7. Limitation of Liability</h2>
      <p>
        CodeCookies shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
      </p>
      <ul>
        <li>Your use or inability to use the service</li>
        <li>Any unauthorized access to or use of our servers</li>
        <li>Any interruption or cessation of transmission to or from our service</li>
        <li>Any bugs, viruses, or other harmful code</li>
      </ul>

      <h2>8. Modifications to Service</h2>
      <p>
        CodeCookies reserves the right to modify, suspend, or discontinue any part of the service at any time, with or without notice. We are not liable to you or any third party for any modification, suspension, or discontinuation of the service.
      </p>

      <h2>9. Termination</h2>
      <p>
        We may terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason, including if you breach these Terms of Service.
      </p>
      <p>
        Upon termination, your right to use the service will cease immediately. All provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.
      </p>

      <h2>10. Governing Law</h2>
      <p>
        These Terms shall be interpreted and governed by the laws of the jurisdiction in which CodeCookies operates, without regard to its conflict of law provisions.
      </p>

      <h2>11. Changes to Terms</h2>
      <p>
        We reserve the right to modify these Terms of Service at any time. We will notify users of any changes by posting the new Terms on this page and updating the "Last updated" date.
      </p>
      <p>
        Your continued use of the service after any changes constitutes acceptance of the new Terms.
      </p>

      <h2>12. Contact Information</h2>
      <p>
        If you have any questions about these Terms of Service, please contact us at:
      </p>
      <p>
        <strong>Email:</strong> support@codecookies.com
      </p>
    </LegalPageLayout>
  )
}

