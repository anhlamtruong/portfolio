import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/contexts/user_page/ThemeContext";
import ToasterContext from "@/contexts/user_page/ToasterContext";
import AuthContext from "@/contexts/authentication/AuthContext";
import { LoadingProvider } from "@/contexts/app_loading/app_loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anh Portfolio",
  description: "Crazy Enough",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoadingProvider>
      <ThemeProvider>
        <html lang="en">
          <body className={inter.className}>
            <AuthContext>
              <ToasterContext></ToasterContext>
              {children}
            </AuthContext>
          </body>
        </html>
      </ThemeProvider>
    </LoadingProvider>
  );
}
