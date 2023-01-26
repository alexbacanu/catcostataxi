import Footer from "@/ui/Layout/Footer"
import Header from "@/ui/Layout/Header"
import { Inter } from "@next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body className="flex flex-col bg-white text-neutral-800 antialiased transition dark:bg-neutral-800 dark:text-neutral-200">
        <Header />
        <main className="mx-auto min-h-screen w-full">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
