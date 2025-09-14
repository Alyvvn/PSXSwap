"use client"

import { useEffect, useState } from "react"

interface TokenData {
  price: string
  marketCap: string
  volume24h: string
  liquidity: string
  totalSupply: string
  decimals: number
  holders: string
  isLive: boolean
  error: string | null
  isLoading: boolean
}

const INITIAL_STATE: TokenData = {
  price: "Loading…",
  marketCap: "Loading…",
  volume24h: "Loading…",
  liquidity: "Loading…",
  totalSupply: "Loading…",
  decimals: 18,
  holders: "Loading…",
  isLive: false,
  error: null,
  isLoading: true,
}

export function useTokenData() {
  const [data, setData] = useState<TokenData>(INITIAL_STATE)

  const fetchTokenData = async () => {
    try {
      const res = await fetch("/api/token", { cache: "no-store" })
      const json = (await res.json()) as Partial<TokenData> & { error?: string }

      if (!res.ok || json.error) {
        throw new Error(json.error || `Status ${res.status}`)
      }

      setData({ ...json, isLoading: false } as TokenData)
    } catch (err) {
      console.error("Error fetching token data:", err)
      setData((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Unknown error loading token",
      }))
    }
  }

  useEffect(() => {
    fetchTokenData()
    const id = setInterval(fetchTokenData, 30_000)
    return () => clearInterval(id)
  }, [])

  return data
}
