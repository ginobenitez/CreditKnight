import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Dashboard() {

  const {getUser } = getKindeServerSession();
  const user = await getUser();
  console.log(user);
  return (
    <div className="container">
      <div className="card start-hero">
        <p className=" text-pink-500" >Woohoo! {user.given_name}</p>
        <p className="text-display-2">
          Your authentication is all sorted.
          <br />
          Build the important stuff.
        </p>
      </div>
      <section className="next-steps-section">
        <h2 className="text-heading-1">Next steps for you</h2>
      </section>
    </div>
  );
}
