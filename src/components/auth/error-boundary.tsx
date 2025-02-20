"use client"

import type React from "react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"

export function ErrorBoundary({
  children,
}: {
  children: React.ReactNode
}) {
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const handleError = (error: Error) => {
      console.error("Caught error:", error)
      setError(error)
    }

    window.addEventListener("error", (e) => handleError(e.error))
    window.addEventListener("unhandledrejection", (e) => handleError(e.reason))

    return () => {
      window.removeEventListener("error", (e) => handleError(e.error))
      window.removeEventListener("unhandledrejection", (e) => handleError(e.reason))
    }
  }, [])

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-xl mx-auto my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-2">
          <p>There was a problem connecting to the authentication service.</p>
          <Button variant="outline" onClick={() => window.location.reload()} className="w-fit">
            Try again
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  return children
}

