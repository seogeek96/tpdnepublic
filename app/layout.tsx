"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import MainLayout from "./MainLayout";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { language: string };
}) {
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleError = (error: any) => {
      console.error("Unexpected error:", error);
      router.push("/"); // Redirect to homepage on error
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleError);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleError);
    };
  }, [router]);

  return (
    <html lang={params.language || "en"}>
      <body className={inter.className}>
        <MainLayout params={params}>{children}</MainLayout>
      </body>
    </html>
  );
}
