import { getSession } from "next-session";
import { client } from "../../utils/plaid";
import moment from "moment";

export default async function handler(req, res) {
  const session = await getSession(req);
  const access_token = session.access_token;

  if (!access_token) {
    return res.status(400).json({ error: "No access token found." });
  }

  const startDate = moment().subtract(30, "days").format("YYYY-MM-DD");
  const endDate = moment().format("YYYY-MM-DD");

  try {
    const transactionResponse = await client.transactionsGet({
      access_token,
      start_date: startDate,
      end_date: endDate,
      options: { count: 10 },
    });

    res.json(transactionResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching transactions." });
  }
}
