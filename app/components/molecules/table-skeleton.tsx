import { Skeleton } from "~/components/ui/skeleton";

export default function TableSkeleton() {
  return (
    <div className="space-y-4">
      {/* Top controls */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-20" /> {/* Dropdown */}
        <Skeleton className="h-8 w-40 rounded-md" /> {/* Search */}
      </div>

      {/* Table Skeleton */}
      <div className="border rounded-md overflow-hidden">
      

        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-5 items-center border-t px-4 py-3 text-sm"
          >
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-28 rounded-full" /> {/* Level Badge */}
            <div className="flex justify-end">
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-between items-center pt-4">
        <Skeleton className="h-4 w-32" /> {/* "Show 10 of 100 Data" */}
        <div className="flex items-center space-x-2">
          {[1, 2, 10].map((n, i) => (
            <Skeleton key={i} className="h-8 w-8 rounded-md" />
          ))}
          <Skeleton className="h-8 w-8 rounded-md" /> {/* Next Arrow */}
        </div>
      </div>
    </div>
  );
}
