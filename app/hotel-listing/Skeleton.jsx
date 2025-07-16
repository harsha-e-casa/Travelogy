export default function Skeleton() {
  return (
    <div className="mt-20 col-span-12 w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-6 animate-pulse">
      <div className="md:col-span-8 space-y-6">
        {/* Header block */}
        <div className="h-6 w-1/3 bg-gray-300 rounded" />
        <div className="space-y-4">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-2/4 bg-gray-200 rounded" />
        </div>

        {/* Form fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>

        <div className="h-24 bg-gray-200 rounded mt-6" />

        <div className="h-12 bg-gray-300 rounded mt-6 w-48" />
      </div>

      {/* Sidebar skeleton */}
      <div className="md:col-span-4 space-y-4">
        <div className="h-5 w-1/2 bg-gray-300 rounded" />
        <div className="flex justify-between">
          <div className="h-4 w-1/3 bg-gray-200 rounded" />
          <div className="h-4 w-1/4 bg-gray-200 rounded" />
        </div>
        <div className="flex justify-between">
          <div className="h-4 w-1/3 bg-gray-200 rounded" />
          <div className="h-4 w-1/4 bg-gray-200 rounded" />
        </div>
        <div className="flex justify-between font-semibold">
          <div className="h-5 w-1/2 bg-gray-300 rounded" />
          <div className="h-5 w-1/3 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
}
