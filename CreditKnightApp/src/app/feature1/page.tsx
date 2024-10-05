import React from 'react';
import Link from 'next/link';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const features = [
  { href: '/feature1', label: 'Feature 1' },
  { href: '/feature2', label: 'Feature 2' },
  { href: '/feature3', label: 'Feature 3' },
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
        <h1>This is the page for feature 1.</h1>
        <p>Currently a work in progress. Apologies for the inconvenience.</p>
        
        {/* Smaller Box */}
        <div className="small-box" style={{ backgroundColor: '#b8860b', color: 'white' }}>
          <p>FRADUWATCH (example)</p>
        </div>
      </div>
      <section className="next-steps-section">
        <h2 className="text-heading-1">Next steps for you</h2>
      </section>
    </div>
  );
}