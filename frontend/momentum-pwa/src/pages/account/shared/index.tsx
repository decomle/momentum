export const ErrorSection = ({ title, error }: { title: string, error: string }) => {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      <p className="font-medium">
        {title}
      </p>
      <p className="text-red-600 mt-1">
        {error}
      </p>
    </div>
  )
}