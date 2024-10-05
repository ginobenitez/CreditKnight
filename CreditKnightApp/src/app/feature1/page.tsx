import React from 'react';
import Link from 'next/link';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const features = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/feature1', label: 'Fraudulant Activity' },
  { href: '/feature2', label: 'Transactions' },
  { href: '/feature3', label: 'View Subscriptions' },
  { href: '/feature4', label: 'FAQs' },
];

const renderNavButtons = () => (
  <div className="nav-buttons-container">
    {features.map((feature) => (
      <Link key={feature.href} href={feature.href} legacyBehavior>
        <button className="nav-button">{feature.label}</button>
      </Link>
    ))}
  </div>
);

export default async function Feature() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  console.log(user);

  return (
    <div className="container">
      {/* Navigation Buttons */}
      {renderNavButtons()}

      <div className="card hero ">
        <h1>Fradulant Activity</h1>
          <div className = "flex-row">
          {/* Smaller Box */}
          <div className="small-box" style={{ backgroundColor: '#b8860b', color: 'white' }}>
            <p>(Display Fradulant History and Current Fradulant Activity)</p>
          </div>
          <div className="small-box" style={{ backgroundColor: '#b8860b', color: 'white' }}>
            <p>(Additional Information)</p>
          </div>
        </div>          
      </div>
      <section className="next-steps-section">
        <h2 className="text-heading-1">Next steps for you</h2>
      </section>
    </div>
  );
}