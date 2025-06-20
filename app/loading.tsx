export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="relative h-16 w-16 animate-spin rounded-full border-4 border-solid border-cyan-400 border-t-transparent">
        <div className="absolute inset-0 h-10 w-10 animate-pulse rounded-full border-4 border-solid border-purple-500 border-t-transparent" />
      </div>
    </div>
  )
}
