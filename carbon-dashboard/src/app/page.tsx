// APIs
import CompanyChart from "@/components/company/CompanyChart";
import { fetchCompanies, fetchCountries } from "@/lib/api";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default async function Home() {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-2xl font-bold mb-6">🌍 탄소 배출량 대시보드</h1>
        <p className="text-gray-600 text-md">전체 회사별 배출량 추세를 한눈에 확인할 수 있습니다.</p>
      </section>

      {/* 회사별 차트 */}
      <CompanyChart />
    </div>
  );
}
