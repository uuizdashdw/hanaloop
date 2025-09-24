export default function ListItemSkeleton() {
  return (
    <li>
      <div
        className="block rounded-xl border border-gray-200 bg-white p-6 shadow-sm
                   animate-pulse"
      >
        <div className="h-5 w-2/3 bg-gray-200 rounded mb-4" />

        <div className="h-4 w-1/3 bg-gray-200 rounded" />
      </div>
    </li>
  );
}
