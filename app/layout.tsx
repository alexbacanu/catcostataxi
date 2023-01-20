import { Inter } from "@next/font/google";
import UIFooter from "ui/UIFooter";
import UIHeader from "ui/UIHeader";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head />
      <body className="dark:bg-zinc-900 flex flex-col bg-white antialiased transition">
        <UIHeader />
        <main className="mx-auto min-h-screen w-full">{children}</main>
        <UIFooter />
      </body>
    </html>
  );
}
