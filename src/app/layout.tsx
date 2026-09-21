import type { Metadata } from "next"
import { Manrope } from "next/font/google"

import "@/app/globals.css"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "ySpace — Move what matters, faster",
    template: "%s — ySpace",
  },
  description: "Autonomous drone delivery for people, and route intelligence for the businesses that move goods every day.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  )
}
