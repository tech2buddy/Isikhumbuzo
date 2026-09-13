import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | Isikhumbulo Memorial",
  description: "The terms that govern your use of the Isikhumbulo Memorial website.",
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

export default function TermsOfServicePage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms of Service" updated="19 August 2026">
      <Section heading="Acceptance of Terms">
        <p>
          By accessing this website, you agree to these Terms of Service. If you do
          not agree with any part of these terms, please discontinue use of the site.
        </p>
      </Section>

      <Section heading="Purpose of This Website">
        <p>
          This website is provided as a showcase of Isikhumbulo Memorial&rsquo;s
          craftsmanship and services, and as a way for visitors to reach us to book a
          consultation. It does not offer online purchasing, pricing, or checkout
          functionality. All memorial designs, materials and pricing are discussed and
          confirmed directly with our team during consultation.
        </p>
      </Section>

      <Section heading="Intellectual Property">
        <p>
          All text, photography, designs and graphics on this website are the property
          of Isikhumbulo Memorial unless otherwise credited, and may not be reproduced
          without our written permission.
        </p>
      </Section>

      <Section heading="Accuracy of Information">
        <p>
          We take care to ensure the information on this site is accurate, but
          craftsmanship, materials and finished memorials are ultimately confirmed on a
          case-by-case basis through direct consultation.
        </p>
      </Section>

      <Section heading="Limitation of Liability">
        <p>
          Isikhumbulo Memorial is not liable for any indirect or incidental damages
          arising from the use of this website. This website is provided &ldquo;as
          is&rdquo; without warranties of any kind.
        </p>
      </Section>

      <Section heading="Changes to These Terms">
        <p>
          We may update these Terms of Service from time to time. Continued use of the
          website after changes are posted constitutes acceptance of the revised
          terms.
        </p>
      </Section>

      <Section heading="Contact Us">
        <p>
          Questions about these terms can be sent to{" "}
          <a href="mailto:isikhumbulomemorial@gmail.com" className="text-gold hover:text-gold-light">
            isikhumbulomemorial@gmail.com
          </a>{" "}
          or 076 099 0333.
        </p>
      </Section>
    </LegalPage>
  );
}
