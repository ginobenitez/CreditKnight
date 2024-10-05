import { getSession } from "next-session";

export default async function handler(req, res) {
  const session = await getSession(req);
  if (session.access_token) {
    return res.json({ status: true });
  }
  return res.json({ status: false });
}
