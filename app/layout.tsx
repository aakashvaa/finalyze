import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Track xPenses",
  description: "This App will help you to visualize your expenses wrt your encome without storing your data.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Doto:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link type="image/svg+xml" rel="icon" href="XpenseLogo.svg" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
