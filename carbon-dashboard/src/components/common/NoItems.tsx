export default function NoItems({ message, color }: { message: string; color?: string }) {
  return (
    <div className="h-9/12 w-full flex justify-center items-center">
      <p className={`p-6 ${color ? color : "text-red-500"}`}>{message}</p>
    </div>
  );
}
