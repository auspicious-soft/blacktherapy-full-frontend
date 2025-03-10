"use client";
import React, { useState } from "react";
import { DropDown } from "@/utils/svgicons";
import banner from "@/assets/images/banner-img1.png";
import BannerSection from "@/app/(website)/components/BannerSection";

const faqData = [
  {
    section: "General Questions",
    items: [
      {
        title: "What is The Black Therapy Network?",
        content:
          "<strong>The Black Therapy Network</strong> is an online therapy platform designed specifically for the <strong>Black community</strong> . We connect individuals, couples, and families with  <strong></strong>licensed, culturally competent therapists<strong></strong> who understand the unique challenges and experiences faced by Black clients.",
      },
      {
        title: "Who can use The Black Therapy Network?",
        content:
          "Our services are available to:<br />✔ <strong>Individuals</strong>seeking personal growth and healing<br />✔ <strong>Couples</strong> looking to strengthen relationships<br />✔ <strong>Families</strong> needing support<br />✔ <strong>Teenagers</strong> (ages 13-17) with parental consent<br />✔ <strong>College<strong> students looking for mental health support",
      },
      {
        title: "Is therapy confidential?",
        content:
          "Yes. <strong>All therapy sessions are confidential and HIPAA-compliant</strong>. Your personal health information is <strong>encrypted and securely stored</strong>, and we do not share your information without your consent, except as required by law.",
      },
    ],
  },
  {
    section: "Therapists & Treatment",
    items: [
      {
        title: "Who are the therapists at The Black Therapy Network?",
        content:
          "Our therapists are <strong>licensed professionals</strong> who specialize in:<br />✅ Anxiety, depression, and stress management<br />✅ Trauma and PTSD<br />✅ Relationships and family dynamics<br />✅ Grief and loss<br />✅ Racial identity and cultural experiences<br />They include:<br />✔ <strong>Licensed Clinical Social Workers (LCSW)</strong><br />✔ <strong>Licensed Professional Counselors (LPC)</strong><br />✔ <strong>Licensed Marriage & Family Therapists (LMFT)</strong><br />✔ <strong>Licensed Clinical Psychologists (PhD, PsyD)</strong>",
      },
      {
        title: "How do I get matched with a therapist?",
        content:
          "We match you with a therapist based on:<br />✔ <strong>Your concerns and goals</strong> (e.g., anxiety, relationships, trauma)<br />✔ <strong>Your preferences </strong>(therapist’s gender, background, or specialty)<br />✔<strong> Availability and state licensing</strong><br />You can <strong>request a new therapist at any time</strong> if your match doesn’t feel right.",
      },
      {
        title: "How do I communicate with my therapist?",
        content:
          "✅ <strong>Live weekly sessions </strong>(video, phone, or chat)<br />✅ <strong>Unlimited messaging add-on </strong>(optional for extra support)",
      },
    ],
  },
  {
    section: "Pricing & Subscription Plans",
    items: [
      {
        title: "How much does therapy cost?",
        content:
          "We offer <strong> flexible pricing options</strong> to make therapy accessible and affordable. <strong> All plans are billed every 4 weeks.</strong><br />Affordable Therapy Plans:<br />✅ <strong>Stay Rooted Plan</strong><br />💰 $85 per week (billed at $340 every 4 weeks)<br />One 45-minute session per week (video, phone, or chat)<br />Secure online platform access<br />✅ <strong>Glow Up Plan</strong><br />💰 $125 per week (billed at $500 every 4 weeks)<br />One extended 60-minute session per week (video, phone, or chat)<br />Priority therapist matching<br />Exclusive wellness resources",
      },
      {
        title: "Can I add unlimited messaging support?",
        content:
          "Yes! You can add<strong> unlimited messaging with a therapist </strong>for <strong> $49 per month</strong>. This allows you to send messages anytime and get responses within 24 hours.",
      },
      {
        title: "Do you accept insurance?",
        content:
          "We currently <strong>do not accept</strong> insurance, but you may use:<br />✔ <strong>HSA/FSA cards</strong> (Health Savings Account / Flexible Spending Account)",
      },
      {
        title: "Can I get financial assistance?",
        content:
          "Yes! <strong>Financial aid</strong> is available for those who qualify. Contact us to learn more.",
      },
      {
        title: "Can I switch or cancel my plan?",
        content:
          "Yes! You can <strong>switch plans or cancel anytime </strong>through Account Settings.",
      },
    ],
  },
  {
    section: "Confidentiality, HIPAA Compliance & Safety",
    items: [
      {
        title: "Is my therapy private and secure?",
        content:
          "Yes! <strong>Your privacy is our top priority</strong>.<br />✔ <strong>HIPAA-compliant platform</strong> (fully encrypted and secure)<br />✔<strong> No one has access to your records except you and your therapist</strong>",
      },
      {
        title: "Do you share my information with anyone?",
        content:
          "No. Your therapy records are <strong>never shared</strong> without your <strong>written consent</strong>, except in cases required by law (e.g., risk of harm to self or others, court orders).",
      },
      {
        title: "Can I request copies of my therapy records?",
        content:
          "Yes. You can <strong>request your therapy records</strong> by submitting a written request to our administrative office. Processing times vary based on state regulations.",
      },
      {
        title: "Are therapy sessions recorded?",
        content: "No, <strong>sessions are not recorded</strong> to protect confidentiality.",
      },
    ],
  },
  {
    section: "Platform & Accessibility",
    items: [
      {
        title: "Is there a mobile app for The Black Therapy Network?",
        content:
          "Yes! You can access <strong>The Black Therapy Network</strong> app on:<br />📱 <strong>Apple App Store</strong> (iOS)<br />📱 <strong>Google Play Store</strong> (Android)<br /><strong>The app allows you to schedule sessions, message your therapist, and access therapy resources on the go.</strong>",
      },
      {
        title: "Do I need to download the app to use therapy?",
        content:
          "No, you can also <strong>access therapy sessions directly through a web browser </strong>on your phone, tablet, or computer.",
      },
      {
        title: "Can I pause my therapy?",
        content:
          "Yes, you can <strong>pause your membership</trong> and resume therapy when you're ready.",
      },
      {
        title: "Can I use The Black Therapy Network outside the U.S.?",
        content:
          "Currently, <strong>our services are only available in the United States</strong> due to licensing laws.",
      },
    ],
  },
  {
    section: "College Students & Campus Partnerships",
    items: [
      {
        title: "Does The Black Therapy Network offer services for college students?",
        content:
          "Yes! We provide <strong>affordable therapy options for students</strong> to help with:<br />✔ Academic stress & anxiety<br />✔ Identity & self-confidence<br />✔ Relationship & family issues<br />✔ Adjusting to college life<br />✔ Navigating racial experiences on campus",
      },
      {
        title: "Can my college partner with The Black Therapy Network?",
        content:
          "Yes! We partner with <strong>colleges and universities </strong>to provide <strong>accessible mental health support</strong> for students. If your campus is interested, <strong>contact us to learn more.</strong>",
      },
    ],
  },
  {
    section: "Emergency & Crisis Support",
    items: [
      {
        title: "What should I do if I feel unsafe or in danger?",
        content:
          "If you’re in immediate danger, <strong>call 911 or visit the nearest hospital</strong>.<br />📞 <strong>988</strong> – Suicide & Crisis Lifeline<br />📞 <strong>Crisis Text Line</strong>: Text <strong>HOME </strong>to <strong>741741</strong>",
      },
      {
        title: "Can I talk to my therapist if I have suicidal thoughts?",
        content:
          "Yes. Our therapists provide<strong> <strong>support and safety</strong> </strong>planning for clients experiencing suicidal thoughts. However, for <strong>immediate crisis support</strong>, please call a <strong>crisis hotline.</strong>",
      },
    ],
  },
  {
    section: "Getting Started",
    items: [
      {
        title: "How do I get started with The Black Therapy Network?",
        content:
          "1️⃣ <strong>Download our app</strong> or click <strong>Sign Up</strong><br />2️⃣ <strong>Complete a short intake questionnaire</strong><br />3️⃣ <strong>Get matched with a therapist</strong> based on your needs<br />4️⃣ <strong>Schedule your first therapy session</strong>",
      },
      {
        title: "Still have questions?",
        content:
          "📩 Contact Us <strong> support@blacktherapy.net</strong> – We’re happy to help!<br />📌 <a style='text-decoration: underline;' href ='/getstarted' > <strong>Sign Up Today</strong></a>  and take the first step toward healing",
      },
    ],
  },
];

const Page: React.FC = () => {
  const breadcrumbs = [
    { label: "Home", url: "/" },
    { label: "FAQs", url: "/faq" },
  ];
  const heading = "Frequently Asked Questions";
  const imageUrl = banner;

  const [dropdownStates, setDropdownStates] = useState<boolean[]>(
    faqData.flatMap((section) => section.items.map((_, index) => index === 0))
  );

  const toggleDropdown = (sectionIndex: number, itemIndex: number) => {
    const flatIndex =
      faqData
        .slice(0, sectionIndex)
        .reduce((acc, section) => acc + section.items.length, 0) + itemIndex;
    setDropdownStates((prevState) =>
      prevState.map((isOpen, i) => (i === flatIndex ? !isOpen : isOpen))
    );
  };

  return (
    <>
      <BannerSection
        breadcrumbs={breadcrumbs}
        heading={heading}
        imageUrl={imageUrl}
      />
      <title>FAQ | Black Therapy Network (FAQ)</title>
      <div className="about-dropdown container py-[40px] md:py-[100px]">
        <div className="pb-[40px] md:pb-[100px]">
          <div className="text-gray-500 text-base md:leading-7">
            <p className="text-lg leading-relaxed mb-6">
              At <strong>The Black Therapy Network</strong>, we are committed to
              providing{" "}
              <strong>affordable, culturally responsive therapy</strong> in a
              secure and confidential space. Below, you&apos;ll find answers to
              common questions about our services, therapists, platform,
              pricing, confidentiality, and more.
            </p>
            <p className="text-lg font-medium">
              <strong>
                If you don&apos;t see your question here, please contact us—we&apos;re
                happy to help!
              </strong>
            </p>
          </div>
        </div>
        <div className="">
          <div className="md:pr-[55px]">
            {faqData.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-[#283C63] mb-4">
                  {section.section}
                </h2>
                {section.items.map((dropdown, itemIndex) => (
                  <div className="md:mb-[10px] mb-3" key={itemIndex}>
                    <h3
                      className={`md:text-lg text-base py-[10px] px-3 md:p-5 bg-[#283C63] rounded-[20px] !text-white cursor-pointer flex justify-between md:items-center ${dropdownStates[
                        faqData
                          .slice(0, sectionIndex)
                          .reduce(
                            (acc, sec) => acc + sec.items.length,
                            0
                          ) + itemIndex
                      ]
                        ? "active"
                        : ""
                        }`}
                      onClick={() => toggleDropdown(sectionIndex, itemIndex)}
                    >
                      <span className="flex md:items-center gap-[10px] md:gap-5">
                        {dropdown.title}
                      </span>
                      <span className="drop mt-1 md:mt-0">
                        <DropDown />
                      </span>
                    </h3>
                    <div
                      className={`transition-max-height duration-300 ease-in-out overflow-hidden ${dropdownStates[
                        faqData
                          .slice(0, sectionIndex)
                          .reduce(
                            (acc, sec) => acc + sec.items.length,
                            0
                          ) + itemIndex
                      ]
                        ? "max-h-screen"
                        : "max-h-0"
                        }`}
                    >
                      <div
                        className="text-base md:leading-7 mt-3 md:mt-5 text-[#686C78] px-3 pb-[20px] md:px-[62px]"
                        dangerouslySetInnerHTML={{ __html: dropdown.content }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;