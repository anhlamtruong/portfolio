import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/contexts/user_page/ThemeContext";
import ToasterContext from "@/contexts/user_page/ToasterContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cookit",
  description:
    "Watch tutorials of cooking, or find the chief near by to others",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToasterContext></ToasterContext>
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
