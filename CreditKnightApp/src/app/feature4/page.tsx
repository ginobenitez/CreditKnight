import React from 'react';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
export default async function Feature() {

    const {getUser } = getKindeServerSession();
    const user = await getUser();
    console.log(user);
    return (
      <div className="container">
        <div className="card hero">
          <h1>This is the page for feature 4.</h1>
          <p>Currently a work in progress. Apologies for the inconvenience.</p>
          
          {/* Smaller Box */}
          <div className="small-box" style = {{ backgroundColor: '#00ff00', color: '#ffffff'}}>
            <p>unknown territory...(example)</p>
          </div>
        </div>
        <section className="next-steps-section">
          <h2 className="text-heading-1">Next steps for you</h2>
        </section>
      </div>
    );
  }
