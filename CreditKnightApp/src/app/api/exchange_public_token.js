import { client } from "../../utils/plaid";
import { getSession } from "next-session";

export default async function handler(req, res) {
  const session = await getSession(req);

  try {
    const exchangeResponse = await client.itemPublicTokenExchange({
      public_token: req.body.public_token,
    });

    // Store access_token in the session
    session.access_token = exchangeResponse.data.access_token;
    res.json(true);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error exchanging public token." });
  }
}
