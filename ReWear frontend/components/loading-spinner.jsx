export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-off-white to-soft-lilac-gray">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-electric-violet/30 border-t-electric-violet mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading ReWear...</p>
      </div>
    </div>
  )
}
