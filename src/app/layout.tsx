import type React from "react"
import "@/app/globals.css";

import { Inter } from "next/font/google";

import { AuthProvider } from "@/components/auth/auth-provider";
import { Header } from "@/components/layout/header";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "R6 Tools - Advanced Tools for Rainbow Six Siege",
  description: "Enhance your Rainbow Six Siege gameplay with professional tools for serious players.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, "min-h-screen bg-background text-foreground antialiased")}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

