// app/not-found.tsx
export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
}

// Add this to prevent search indexing
export const metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};