import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Isikhumbulo Memorial",
  description: "How Isikhumbulo Memorial collects, uses and protects your information.",
};

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-[22px] font-medium text-ivory">{heading}</h2>
      <div className="mt-3 space-y-4 font-body text-[14.5px] font-light leading-[1.9] text-grey">
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" updated="19 August 2026">
      <Section heading="Overview">
        <p>
          Isikhumbulo Memorial (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) respects
          your privacy. This policy explains what information we collect through this
          website, why we collect it, and how it is used and protected.
        </p>
      </Section>

      <Section heading="Information We Collect">
        <p>
          When you submit our consultation form, we collect the details you provide:
          your name, email address, phone number, area of interest, and any message you
          include. We do not collect payment or financial information through this
          website, as no purchases are made online.
        </p>
        <p>
          Like most websites, our hosting and analytics tools may automatically log
          basic technical information such as browser type, device type and general
          usage patterns, used only to keep the site running smoothly.
        </p>
      </Section>

      <Section heading="How We Use Your Information">
        <p>
          Information submitted through our consultation form is used solely to
          respond to your enquiry, discuss your memorial requirements, and arrange a
          consultation. We do not sell, rent or trade your personal information to
          third parties.
        </p>
      </Section>

      <Section heading="Data Retention">
        <p>
          We retain enquiry information only for as long as needed to assist you and
          maintain our business records, after which it is securely deleted upon
          request.
        </p>
      </Section>

      <Section heading="Your Rights">
        <p>
          You may request access to, correction of, or deletion of any personal
          information you have shared with us at any time by contacting us using the
          details below.
        </p>
      </Section>

      <Section heading="Contact Us">
        <p>
          For any privacy-related questions, please reach us at{" "}
          <a href="mailto:isikhumbulomemorial@gmail.com" className="text-gold hover:text-gold-light">
            isikhumbulomemorial@gmail.com
          </a>{" "}
          or 076 099 0333.
        </p>
      </Section>
    </LegalPage>
  );
}
