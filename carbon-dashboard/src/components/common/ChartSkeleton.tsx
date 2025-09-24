export default function ChartSkeleton() {
  return (
    <div className="w-full h-[400px] animate-pulse bg-gray-100 rounded-lg p-4">
      {/* X축 영역 */}
      <div className="h-full flex flex-col justify-between">
        {/* 차트 내부 가짜 라인 영역 */}
        <div className="h-1/5 w-full bg-gray-200 rounded"></div>
        <div className="h-1/5 w-[90%] bg-gray-200 rounded"></div>
        <div className="h-1/5 w-[80%] bg-gray-200 rounded"></div>
        <div className="h-1/5 w-[70%] bg-gray-200 rounded"></div>
        <div className="h-1/5 w-[60%] bg-gray-200 rounded"></div>
      </div>

      {/* X축 라벨 영역 */}
      <div className="flex justify-between mt-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-8 h-3 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  );
}
