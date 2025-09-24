import ListItemSkeleton from "./ListItemSkeleton";

export default function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <ul className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <ListItemSkeleton key={i} />
      ))}
    </ul>
  );
}
