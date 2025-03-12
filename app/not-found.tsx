import Link from "next/link";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>404 - Page Not Found</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
        The page you are looking for does not exist.
      </p>
      <Link href="/" style={{ color: "white", textDecoration: "underline" }}>
        Go back to the homepage
      </Link>
    </div>
  );
}