import { client } from "../../utils/plaid"; // Plaid client setup

export default async function handler(req, res) {
  const session = await getSession(req);
  try {
    const tokenResponse = await client.linkTokenCreate({
      user: { client_user_id: session.id },
      client_name: "Vanilla JavaScript Sample",
      language: "en",
      products: ["transactions"],
      country_codes: ["US"],
      redirect_uri: "http://localhost:8000/oauth-return.html",
    });

    res.json(tokenResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating link token." });
  }
}
