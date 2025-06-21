"use client"

import { useEffect } from "react"

/**
 * Silences the noisy MetaMask-related warning that appears when the
 * extension is not installed.  All other console output is untouched.
 */
export default function ConsoleFilter() {
  useEffect(() => {
    const originalErr = console.error.bind(console)
    const originalWarn = console.warn.bind(console)

    const shouldSkip = (arg: unknown) => typeof arg === "string" && arg.includes("MetaMask extension not found")

    console.error = (...args: unknown[]) => {
      if (!shouldSkip(args[0])) originalErr(...args)
    }

    console.warn = (...args: unknown[]) => {
      if (!shouldSkip(args[0])) originalWarn(...args)
    }

    // Restore on unmount (Dev HMR, etc.)
    return () => {
      console.error = originalErr
      console.warn = originalWarn
    }
  }, [])

  return null
}
