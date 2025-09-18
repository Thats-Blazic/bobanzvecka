import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { Facebook } from "lucide-react"

export const metadata: Metadata = {
  title: "Zvečanska Hronika - Radio Stanica",
  description: "Moderna radio stanica sa live streamom i najnovijim vestima",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sr" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        {/* Facebook link - top-right */}
        <a
          href="https://www.facebook.com/zvecanska.hronika"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook stranica Zvečanska Hronika"
          className="fixed top-4 right-4 z-50 inline-flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-800/90 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors shadow"
        >
          <Facebook className="w-5 h-5" />
        </a>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
