import React from "react";

const PricingPage = () => {
  const plans = [
    {
      title: "Basic Plan",
      price: "$25",
      description: "Unverified Institutional",
      features: [
        "Unverified Institutional",
        "Zero-Knowledge Proof Integration",
        "Basic Submission (up to 1000 verifications/month)"
      ],
      button: "Get Started",
      highlight: false,
    },
    {
      title: "Standard Plan",
      price: "$49",
      description: "Verified Institutional",
      features: [
        "Verified Institutional",
        "24/7 Support",
        "Unlimited Document Verifications"
      ],
      button: "Subscribe Now",
      highlight: true,
    },
    {
      title: "Enterprise Plan",
      price: "Custom",
      description: "Enterprise Verifier",
      features: [
        "Institutional Branding",
        "Zero-Knowledge Proof Integration",
        "Certificate Issuance Module",
        "Real-time Verification Analytics"
      ],
      button: "Contact Sales",
      highlight: false,
    },
  ];

  return (
    <section id="pricing-section">
        <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 dark:from-black dark:to-gray-900 py-16 px-4">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Choose Your Verification Tier
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
            Scalable plans for every organization.
            </p>
        </div>

        <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-3">
            {plans.map((plan, index) => (
            <div
                key={index}
                className={`rounded-xl p-6 shadow-lg border bg-white dark:bg-gray-800 transition hover:scale-105 duration-300 ${
                plan.highlight ? "border-blue-500 ring-2 ring-blue-400" : "border-gray-200 dark:border-gray-700"
                }`}
            >
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{plan.title}</h3>
                <p className="text-3xl font-bold mb-2 text-blue-600 dark:text-blue-400">{plan.price}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{plan.description}</p>
                <ul className="text-sm space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                    <li key={i} className="text-gray-700 dark:text-gray-200">
                    • {feature}
                    </li>
                ))}
                </ul>
                <button className="w-full py-2 px-4 rounded-lg text-white font-medium bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90">
                {plan.button}
                </button>
            </div>
            ))}
        </div>
        </div>
    </section>
  );
};

export default PricingPage;
