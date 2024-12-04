import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto prose dark:prose-invert">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <Separator className="my-6" />
      
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
        <p>We collect information that you provide directly to us, including when you create an account, update your profile, or communicate with us.</p>

        <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To provide, maintain, and improve our services</li>
          <li>To personalize your experience</li>
          <li>To communicate with you about our services</li>
          <li>To protect against fraud and abuse</li>
        </ul>

        <h2 className="text-2xl font-semibold">3. Information Sharing</h2>
        <p>We do not share your personal information with third parties except as described in this privacy policy or with your consent.</p>

        <h2 className="text-2xl font-semibold">4. Data Security</h2>
        <p>We implement appropriate technical and organizational measures to protect the security of your personal information.</p>

        <h2 className="text-2xl font-semibold">5. Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal information. You may also object to or restrict certain processing of your information.</p>

        <h2 className="text-2xl font-semibold">6. Cookies</h2>
        <p>We use cookies and similar tracking technologies to track activity on our service and hold certain information.</p>

        <h2 className="text-2xl font-semibold">7. Changes to This Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

        <h2 className="text-2xl font-semibold">8. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us.</p>
      </section>
    </div>
  );
}