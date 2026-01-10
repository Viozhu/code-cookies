import { createFileRoute } from '@tanstack/react-router'
import { LegalPageLayout } from '@/components/shared/LegalPageLayout'

export const Route = createFileRoute('/gdpr')({
  component: GDPRCompliancePage,
})

function GDPRCompliancePage() {
  return (
    <LegalPageLayout
      title="GDPR Compliance Statement"
      lastUpdated="December 2024"
    >
      <h2>1. What is GDPR?</h2>
      <p>
        The General Data Protection Regulation (GDPR) is a European Union regulation that provides data protection and privacy for individuals within the EU and EEA. GDPR gives individuals greater control over their personal data and requires organizations to be transparent about how they collect, use, and protect personal information.
      </p>

      <h2>2. Our Commitment to GDPR Compliance</h2>
      <p>
        CodeCookies is committed to full compliance with GDPR. We recognize the importance of data protection and privacy rights, and we have implemented comprehensive measures to ensure that we meet or exceed GDPR requirements in how we handle personal data.
      </p>

      <h2>3. Legal Basis for Processing</h2>
      <p>
        We process personal data based on the following legal bases under GDPR:
      </p>
      <ul>
        <li><strong>Consent:</strong> Where you have given clear consent for us to process your personal data for specific purposes</li>
        <li><strong>Contract Performance:</strong> Where processing is necessary for the performance of a contract (providing our educational services)</li>
        <li><strong>Legal Obligation:</strong> Where we need to comply with legal obligations</li>
        <li><strong>Legitimate Interests:</strong> Where processing is necessary for our legitimate interests (such as improving our services), balanced against your rights and interests</li>
      </ul>

      <h2>4. Your GDPR Rights</h2>
      <p>
        Under GDPR, you have the following rights regarding your personal data:
      </p>

      <h3>4.1 Right to Access</h3>
      <p>
        You have the right to request copies of your personal data. We will provide you with:
      </p>
      <ul>
        <li>Confirmation of whether we process your personal data</li>
        <li>Access to your personal data</li>
        <li>Information about how we process your data</li>
        <li>Copies of the personal data we hold about you</li>
      </ul>

      <h3>4.2 Right to Rectification</h3>
      <p>
        You have the right to request correction of inaccurate personal data or completion of incomplete personal data.
      </p>

      <h3>4.3 Right to Erasure ("Right to be Forgotten")</h3>
      <p>
        You have the right to request deletion of your personal data when:
      </p>
      <ul>
        <li>The data is no longer necessary for the original purpose</li>
        <li>You withdraw consent and there is no other legal basis for processing</li>
        <li>You object to processing and there are no overriding legitimate grounds</li>
        <li>The data has been unlawfully processed</li>
      </ul>

      <h3>4.4 Right to Restrict Processing</h3>
      <p>
        You have the right to request that we restrict the processing of your personal data in certain circumstances, such as when you contest the accuracy of the data or object to processing.
      </p>

      <h3>4.5 Right to Data Portability</h3>
      <p>
        You have the right to receive your personal data in a structured, commonly used, and machine-readable format, and to transmit that data to another controller where technically feasible.
      </p>

      <h3>4.6 Right to Object</h3>
      <p>
        You have the right to object to processing of your personal data based on legitimate interests or for direct marketing purposes. We will stop processing unless we can demonstrate compelling legitimate grounds.
      </p>

      <h3>4.7 Rights Related to Automated Decision-Making</h3>
      <p>
        You have the right not to be subject to decisions based solely on automated processing, including profiling, that produce legal effects or similarly significantly affect you. CodeCookies does not use automated decision-making that produces legal effects.
      </p>

      <h3>4.8 Right to Withdraw Consent</h3>
      <p>
        Where we process your data based on consent, you have the right to withdraw your consent at any time. Withdrawal does not affect the lawfulness of processing before withdrawal.
      </p>

      <h2>5. How to Exercise Your Rights</h2>
      <p>
        To exercise any of your GDPR rights, please contact us at:
      </p>
      <ul>
        <li><strong>Email:</strong> support@codecookies.com</li>
        <li><strong>Data Protection Officer:</strong> privacy@codecookies.com</li>
      </ul>
      <p>
        We will respond to your request within one month (or inform you if we need additional time). We may ask you to verify your identity before processing your request.
      </p>

      <h2>6. Personal Data We Collect and Process</h2>
      <h3>6.1 Categories of Data</h3>
      <p>We collect and process the following categories of personal data:</p>
      <ul>
        <li><strong>Identity Data:</strong> Username, email address</li>
        <li><strong>Profile Data:</strong> Age, grade level, learning preferences</li>
        <li><strong>Usage Data:</strong> Information about how you use our platform</li>
        <li><strong>Technical Data:</strong> IP address, device information, browser type</li>
        <li><strong>Progress Data:</strong> Learning achievements, puzzles completed, cookies earned</li>
      </ul>

      <h3>6.2 Purpose of Processing</h3>
      <p>We process your personal data for the following purposes:</p>
      <ul>
        <li>Providing and maintaining our educational services</li>
        <li>Personalizing your learning experience</li>
        <li>Tracking and displaying your progress</li>
        <li>Communicating with you about the service</li>
        <li>Improving our platform and services</li>
        <li>Ensuring security and preventing fraud</li>
        <li>Complying with legal obligations</li>
      </ul>

      <h2>7. Data Sharing and Transfers</h2>
      <h3>7.1 International Transfers</h3>
      <p>
        Your personal data may be transferred to and processed in countries outside the EEA. When we transfer data outside the EEA, we ensure appropriate safeguards are in place, such as:
      </p>
      <ul>
        <li>Standard Contractual Clauses approved by the European Commission</li>
        <li>Adequacy decisions by the European Commission</li>
        <li>Other legally recognized transfer mechanisms</li>
      </ul>

      <h3>7.2 Data Sharing</h3>
      <p>
        We do not sell your personal data. We may share your data with:
      </p>
      <ul>
        <li><strong>Service Providers:</strong> Trusted partners who help us operate our platform (hosting, analytics, support), all bound by strict data protection agreements</li>
        <li><strong>Legal Authorities:</strong> When required by law or to protect rights and safety</li>
      </ul>

      <h2>8. Data Security Measures</h2>
      <p>
        We implement appropriate technical and organizational measures to protect your personal data, including:
      </p>
      <ul>
        <li>Encryption of data in transit (SSL/TLS) and at rest</li>
        <li>Regular security assessments and penetration testing</li>
        <li>Access controls and authentication mechanisms</li>
        <li>Employee training on data protection</li>
        <li>Secure data storage and backup procedures</li>
        <li>Incident response procedures</li>
      </ul>

      <h2>9. Data Retention</h2>
      <p>
        We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including:
      </p>
      <ul>
        <li>Providing our educational services while your account is active</li>
        <li>Complying with legal, regulatory, or accounting requirements</li>
        <li>Resolving disputes and enforcing our agreements</li>
      </ul>
      <p>
        When personal data is no longer needed, we securely delete or anonymize it.
      </p>

      <h2>10. Children's Data</h2>
      <p>
        For users under the age of 16 in the EU, we obtain parental consent before processing personal data, in accordance with GDPR Article 8. Parents have the right to access, modify, or delete their child's data at any time.
      </p>

      <h2>11. Data Breach Notification</h2>
      <p>
        In the event of a personal data breach that is likely to result in a high risk to your rights and freedoms, we will:
      </p>
      <ul>
        <li>Notify the relevant supervisory authority within 72 hours</li>
        <li>Notify affected individuals without undue delay</li>
        <li>Provide clear information about the nature of the breach and steps we're taking</li>
      </ul>

      <h2>12. Data Protection Officer</h2>
      <p>
        CodeCookies has designated a Data Protection Officer (DPO) to oversee GDPR compliance. You can contact our DPO at:
      </p>
      <p>
        <strong>Email:</strong> privacy@codecookies.com
      </p>

      <h2>13. Supervisory Authority</h2>
      <p>
        If you believe we have not addressed your concerns regarding data protection, you have the right to lodge a complaint with your local supervisory authority. You can find your supervisory authority at:
      </p>
      <p>
        <a href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" target="_blank" rel="noopener noreferrer">
          European Data Protection Board - List of Supervisory Authorities
        </a>
      </p>

      <h2>14. Updates to This Statement</h2>
      <p>
        We may update this GDPR Compliance Statement from time to time to reflect changes in our practices or applicable laws. We will notify you of material changes via email and update the "Last updated" date on this page.
      </p>

      <h2>15. Contact Us</h2>
      <p>
        If you have any questions about our GDPR compliance or wish to exercise your rights, please contact us:
      </p>
      <p>
        <strong>Email:</strong> support@codecookies.com<br />
        <strong>Data Protection Officer:</strong> privacy@codecookies.com
      </p>
      <p>
        <strong>Mail:</strong> CodeCookies Data Protection Officer<br />
        [Your Company Address]
      </p>
    </LegalPageLayout>
  )
}

