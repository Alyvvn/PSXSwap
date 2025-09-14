import Link from "next/link"

export default function WaitlistPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-white text-2xl md:text-4xl font-bold mb-4">waitlist is closed.</h1>
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 underline text-lg md:text-xl transition-colors">
          return to home page.
        </Link>
      </div>
    </div>
  )
}
