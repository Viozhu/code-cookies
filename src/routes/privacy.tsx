import { createFileRoute } from '@tanstack/react-router'
import { LegalPageLayout } from '@/components/shared/LegalPageLayout'

export const Route = createFileRoute('/privacy')({
  component: PrivacyPolicyPage,
})

function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="December 2024"
    >
      <h2>1. Introduction</h2>
      <p>
        CodeCookies is committed to protecting your privacy and the privacy of children who use our service. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our educational platform.
      </p>
      <p>
        We comply with the Children's Online Privacy Protection Act (COPPA) and the General Data Protection Regulation (GDPR). Please read this policy carefully to understand our practices regarding your personal data.
      </p>

      <h2>2. Information We Collect</h2>
      <h3>2.1 Information You Provide</h3>
      <p>We may collect information that you provide directly to us, including:</p>
      <ul>
        <li><strong>Account Information:</strong> Username, email address, and password</li>
        <li><strong>Profile Information:</strong> Age, grade level, and learning preferences</li>
        <li><strong>Parent/Guardian Information:</strong> If you are a parent creating an account for your child</li>
        <li><strong>Communications:</strong> Information you provide when contacting our support team</li>
      </ul>

      <h3>2.2 Information Automatically Collected</h3>
      <p>When you use CodeCookies, we automatically collect certain information, including:</p>
      <ul>
        <li><strong>Usage Data:</strong> Pages visited, features used, and time spent on the platform</li>
        <li><strong>Progress Data:</strong> Puzzles completed, cookies earned, and learning achievements</li>
        <li><strong>Device Information:</strong> Device type, operating system, and browser type</li>
        <li><strong>IP Address:</strong> For security and analytics purposes</li>
      </ul>

      <h3>2.3 Information from Children</h3>
      <p>
        For users under 13, we collect only the minimum information necessary to provide our educational service, in compliance with COPPA. We obtain verifiable parental consent before collecting personal information from children.
      </p>

      <h2>3. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide, maintain, and improve our educational services</li>
        <li>Track learning progress and personalize the educational experience</li>
        <li>Manage user accounts and authenticate users</li>
        <li>Send important updates about the service</li>
        <li>Respond to your inquiries and provide customer support</li>
        <li>Ensure the security and safety of our platform</li>
        <li>Comply with legal obligations and enforce our terms</li>
      </ul>

      <h2>4. Information Sharing and Disclosure</h2>
      <h3>4.1 We Do Not Sell Personal Information</h3>
      <p>
        CodeCookies does not sell, rent, or trade personal information, especially information from children, to third parties.
      </p>

      <h3>4.2 Service Providers</h3>
      <p>
        We may share information with trusted service providers who assist us in operating our platform, such as:
      </p>
      <ul>
        <li>Hosting and cloud storage services</li>
        <li>Analytics providers (with anonymized data)</li>
        <li>Customer support platforms</li>
      </ul>
      <p>
        These service providers are contractually obligated to protect your information and use it only for the purposes we specify.
      </p>

      <h3>4.3 Legal Requirements</h3>
      <p>
        We may disclose information if required by law or in response to valid requests by public authorities, or to protect the rights, property, or safety of CodeCookies, our users, or others.
      </p>

      <h2>5. Data Security</h2>
      <p>
        We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
      </p>
      <ul>
        <li>Encryption of data in transit and at rest</li>
        <li>Regular security assessments and updates</li>
        <li>Access controls and authentication mechanisms</li>
        <li>Secure data storage and backup procedures</li>
      </ul>
      <p>
        However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
      </p>

      <h2>6. Children's Privacy (COPPA Compliance)</h2>
      <p>
        CodeCookies is designed for children and complies with COPPA. Our practices include:
      </p>
      <ul>
        <li>Obtaining verifiable parental consent before collecting personal information from children under 13</li>
        <li>Collecting only the minimum information necessary to provide our educational service</li>
        <li>Providing parents with access to their child's information and the ability to delete it</li>
        <li>Not using children's information for behavioral advertising</li>
        <li>Implementing reasonable security measures to protect children's information</li>
      </ul>
      <p>
        Parents can review, delete, or refuse further collection of their child's information by contacting us at support@codecookies.com.
      </p>

      <h2>7. Your Rights (GDPR Compliance)</h2>
      <p>
        If you are located in the European Economic Area (EEA), you have certain data protection rights:
      </p>
      <ul>
        <li><strong>Right to Access:</strong> Request copies of your personal data</li>
        <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
        <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
        <li><strong>Right to Restrict Processing:</strong> Request limitation of data processing</li>
        <li><strong>Right to Data Portability:</strong> Request transfer of your data</li>
        <li><strong>Right to Object:</strong> Object to our processing of your personal data</li>
      </ul>
      <p>
        To exercise these rights, please contact us at support@codecookies.com.
      </p>

      <h2>8. Data Retention</h2>
      <p>
        We retain your personal information only for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When information is no longer needed, we securely delete or anonymize it.
      </p>

      <h2>9. Cookies and Tracking Technologies</h2>
      <p>
        We use cookies and similar tracking technologies to track activity on our platform and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
      </p>

      <h2>10. Third-Party Links</h2>
      <p>
        Our service may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read the privacy policies of any third-party sites you visit.
      </p>

      <h2>11. International Data Transfers</h2>
      <p>
        Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. We ensure appropriate safeguards are in place for such transfers in compliance with applicable data protection laws.
      </p>

      <h2>12. Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We will also notify users via email for material changes.
      </p>

      <h2>13. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy or our data practices, please contact us at:
      </p>
      <p>
        <strong>Email:</strong> support@codecookies.com
      </p>
      <p>
        <strong>Data Protection Officer:</strong> privacy@codecookies.com
      </p>
    </LegalPageLayout>
  )
}

