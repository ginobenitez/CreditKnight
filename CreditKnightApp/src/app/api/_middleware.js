import { withSession } from "next-session";

export const config = {
  matcher: "/api/:path*", // Apply middleware to all API routes
};

export default withSession({
  name: "sid",
  secret: process.env.SESSION_SECRET,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 24 hours
  },
});
