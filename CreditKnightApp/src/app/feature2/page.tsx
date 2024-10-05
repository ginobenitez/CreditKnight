import React from 'react';
import Link from 'next/link';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
export default async function Feature() {

    const {getUser } = getKindeServerSession();
    const user = await getUser();
    console.log(user);
    return (
      <div className="container">
        {/* Navigation Buttons */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Link href="/feature1">
          <button style={{ margin: '0 10px' }}>Feature 1</button>
        </Link>
        <Link href="/feature2">
          <button style={{ margin: '0 10px' }}>Feature 2</button>
        </Link>
        <Link href="/feature3">
          <button style={{ margin: '0 10px' }}>Feature 3</button>
        </Link>
      </div>
        <div className="card hero">
          <h1>This is the page for feature 2.</h1>
          <p>Currently a work in progress. Apologies for the inconvenience.</p>
          
          {/* Smaller Box */}
          <div className="small-box" style = {{ backgroundColor: '#b8860b', color: 'white'}}>
            <p>Transaction??? maybe!1!?(example)</p>
          </div>
        </div>
        <section className="next-steps-section">
          <h2 className="text-heading-1">Next steps for you</h2>
        </section>
      </div>
    );
  }
