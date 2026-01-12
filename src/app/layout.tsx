import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hardware NPI Planning",
  description: "Comprehensive hardware New Product Introduction planning and resource management",
  manifest: "/manifest.json",
  themeColor: "#0f172a",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Hardware NPI Planning",
    description: "Comprehensive hardware New Product Introduction planning and resource management",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
