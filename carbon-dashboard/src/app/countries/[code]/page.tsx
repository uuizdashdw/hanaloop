// Components
import BackLink from "@/components/common/BackLink";
import NoItems from "@/components/common/NoItems";
import CompanyList from "@/components/company/CompanyList";

// API
import { fetchCompanies } from "@/lib/api";

// Util
import { createMetadata } from "@/utils/meta";

type DetailCountryItemProps = {
  params: Promise<{ code: string }>;
};

export const metadata = createMetadata({
  title: "하나루프 | 국가별 상세 탄소 배출량 대시보드",
  description: "국가별 상세 탄소 배출량을 확인할 수 있습니다.",
});

export default async function DetailCountryItem({ params }: DetailCountryItemProps) {
  const { code } = await params;
  const companies = await fetchCompanies();
  const filtered = companies.filter((c) => c.country === code);

  return (
    <div className="h-full">
      {filtered?.length > 0 && <CompanyList companies={filtered} />}

      {filtered?.length === 0 && (
        <div className="h-full">
          <NoItems message="회사를 찾을 수 없습니다." color="text-gray-400" />
          <BackLink href="/countries" message="← 목록으로 돌아가기" position="center" />
        </div>
      )}
    </div>
  );
}
