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
      <body className="flex flex-col bg-white antialiased transition dark:bg-zinc-900">
        <Header />
        <main className="mx-auto min-h-screen w-full">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
