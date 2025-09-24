// API
import { fetchCompanies } from "@/lib/api";

// Components
import NoItems from "@/components/common/NoItems";
import CompanyList from "@/components/company/CompanyList";

// Utils
import { createMetadata } from "@/utils/meta";

export const metadata = createMetadata({
  title: "하나루프 | 회사별 탄소 배출량 대시보드",
  description: "회사별 탄소 배출량을 한 눈에 확인할 수 있습니다.",
  path: "/companies",
});

export default async function CompanyPage() {
  const companies = await fetchCompanies();

  return (
    <section className="p-6 h-full">
      {companies?.length > 0 && (
        <>
          <CompanyList companies={companies} />
        </>
      )}

      {companies?.length === 0 && <NoItems message="등록된 회사가 없습니다." />}
    </section>
  );
}

export const dynamic = "force-dynamic";
