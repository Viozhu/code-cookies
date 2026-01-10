import { createFileRoute } from '@tanstack/react-router'
import { LegalPageLayout } from '@/components/shared/LegalPageLayout'

export const Route = createFileRoute('/coppa')({
  component: COPPACompliancePage,
})

function COPPACompliancePage() {
  return (
    <LegalPageLayout
      title="COPPA Compliance Statement"
      lastUpdated="December 2024"
    >
      <h2>1. What is COPPA?</h2>
      <p>
        The Children's Online Privacy Protection Act (COPPA) is a U.S. federal law that requires websites and online services to obtain parental consent before collecting personal information from children under 13 years of age. CodeCookies is fully committed to complying with COPPA and protecting children's privacy online.
      </p>

      <h2>2. Our Commitment to Children's Privacy</h2>
      <p>
        CodeCookies is designed as an educational platform for children, and we take our responsibility to protect children's privacy very seriously. We have implemented comprehensive measures to ensure COPPA compliance and provide a safe, secure environment for young learners.
      </p>

      <h2>3. Information We Collect from Children</h2>
      <h3>3.1 Minimum Information Collection</h3>
      <p>
        We collect only the minimum amount of personal information necessary to provide our educational service. This includes:
      </p>
      <ul>
        <li>Username (which does not need to be the child's real name)</li>
        <li>Age or grade level (for educational personalization)</li>
        <li>Parent/guardian email address (for account creation and parental notifications)</li>
        <li>Progress data (puzzles completed, cookies earned) necessary for the educational experience</li>
      </ul>

      <h3>3.2 Information We Do NOT Collect</h3>
      <p>We do NOT collect from children:</p>
      <ul>
        <li>Full name or real name</li>
        <li>Physical address</li>
        <li>Phone number</li>
        <li>Social media information</li>
        <li>Photos or videos</li>
        <li>Location data</li>
        <li>Any information for advertising purposes</li>
      </ul>

      <h2>4. Parental Consent</h2>
      <h3>4.1 Verifiable Parental Consent</h3>
      <p>
        Before collecting any personal information from a child under 13, we obtain verifiable parental consent through:
      </p>
      <ul>
        <li>Email verification sent to the parent/guardian</li>
        <li>Parent account creation and verification</li>
        <li>Clear disclosure of what information we collect and how we use it</li>
        <li>Parental consent form that must be completed before the child's account is activated</li>
      </ul>

      <h3>4.2 Parental Rights</h3>
      <p>
        Parents have the right to:
      </p>
      <ul>
        <li>Review their child's personal information at any time</li>
        <li>Request deletion of their child's personal information</li>
        <li>Refuse further collection or use of their child's information</li>
        <li>Revoke consent at any time</li>
        <li>Request a copy of their child's data</li>
      </ul>
      <p>
        To exercise any of these rights, parents can contact us at support@codecookies.com or through their parent account dashboard.
      </p>

      <h2>5. How We Use Children's Information</h2>
      <p>
        We use information collected from children solely for:
      </p>
      <ul>
        <li>Providing educational services and personalized learning experiences</li>
        <li>Tracking learning progress and achievements</li>
        <li>Delivering cookie rewards and gamification features</li>
        <li>Improving our educational content and platform</li>
        <li>Ensuring platform security and preventing abuse</li>
      </ul>
      <p>
        <strong>We do NOT use children's information for:</strong>
      </p>
      <ul>
        <li>Behavioral advertising or targeted marketing</li>
        <li>Creating user profiles for commercial purposes</li>
        <li>Selling or sharing with third parties for marketing purposes</li>
      </ul>

      <h2>6. Information Disclosure</h2>
      <h3>6.1 Service Providers</h3>
      <p>
        We may share children's information only with trusted service providers who help us operate our platform (such as hosting services). These providers are:
      </p>
      <ul>
        <li>Contractually required to protect children's information</li>
        <li>Prohibited from using the information for any purpose other than providing services to us</li>
        <li>Required to delete the information when services are complete</li>
      </ul>

      <h3>6.2 Legal Requirements</h3>
      <p>
        We may disclose children's information only if required by law, such as to comply with a subpoena or court order, or to protect the safety and security of our users.
      </p>

      <h2>7. Data Security</h2>
      <p>
        We implement robust security measures to protect children's information, including:
      </p>
      <ul>
        <li>Encryption of all data in transit and at rest</li>
        <li>Secure authentication and access controls</li>
        <li>Regular security audits and assessments</li>
        <li>Limited access to children's data by employees and service providers</li>
        <li>Secure data storage and backup procedures</li>
      </ul>

      <h2>8. Data Retention and Deletion</h2>
      <p>
        We retain children's personal information only for as long as necessary to provide our educational services. Parents can request deletion of their child's information at any time, and we will promptly delete it unless we are required to retain it for legal purposes.
      </p>
      <p>
        When a child's account is deleted:
      </p>
      <ul>
        <li>All personal information is permanently deleted from our active systems</li>
        <li>Backup copies are securely deleted within 30 days</li>
        <li>A confirmation email is sent to the parent</li>
      </ul>

      <h2>9. Third-Party Services</h2>
      <p>
        CodeCookies may use third-party services for analytics, hosting, and other operational purposes. All third-party services we use are:
      </p>
      <ul>
        <li>COPPA-compliant or have appropriate safeguards for children's data</li>
        <li>Contractually obligated to protect children's information</li>
        <li>Regularly audited for compliance</li>
      </ul>
      <p>
        We do not allow third parties to collect personal information from children through our platform for their own purposes.
      </p>

      <h2>10. Parental Controls and Account Management</h2>
      <p>
        Parents have full control over their child's account through the parent dashboard, where they can:
      </p>
      <ul>
        <li>View their child's activity and progress</li>
        <li>Update account settings and preferences</li>
        <li>Manage privacy settings</li>
        <li>Delete the account and all associated data</li>
        <li>Contact support with questions or concerns</li>
      </ul>

      <h2>11. Changes to Our COPPA Practices</h2>
      <p>
        If we make material changes to how we collect, use, or disclose children's personal information, we will:
      </p>
      <ul>
        <li>Notify parents via email</li>
        <li>Obtain new parental consent if required by COPPA</li>
        <li>Update this compliance statement</li>
        <li>Provide clear information about what has changed</li>
      </ul>

      <h2>12. Contact Us</h2>
      <p>
        If you have questions about our COPPA compliance or children's privacy practices, please contact us:
      </p>
      <p>
        <strong>Email:</strong> support@codecookies.com
      </p>
      <p>
        <strong>COPPA Compliance Officer:</strong> coppa@codecookies.com
      </p>
      <p>
        <strong>Mail:</strong> CodeCookies Privacy Department<br />
        [Your Company Address]
      </p>

      <h2>13. Additional Resources</h2>
      <p>
        For more information about COPPA and children's online privacy, please visit:
      </p>
      <ul>
        <li>
          <a href="https://www.ftc.gov/enforcement/rules/rulemaking-regulatory-reform-proceedings/childrens-online-privacy-protection-rule" target="_blank" rel="noopener noreferrer">
            Federal Trade Commission - COPPA Rule
          </a>
        </li>
        <li>
          <a href="https://www.consumer.ftc.gov/articles/0031-protecting-your-childs-privacy-online" target="_blank" rel="noopener noreferrer">
            FTC Guide for Parents
          </a>
        </li>
      </ul>
    </LegalPageLayout>
  )
}

