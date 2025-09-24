"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <section className="p-6">
      <h1 className="text-xl font-bold text-red-600">⚠️ 오류 발생</h1>
      <p className="mt-2 text-gray-700">{error.message}</p>
      <button onClick={() => reset()} className="mt-4 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
        다시 시도
      </button>
    </section>
  );
}
