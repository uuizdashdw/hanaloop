// Components
import NoItems from "@/components/common/NoItems";
import DetailCompanyInfo from "@/components/company/DetailCompanyInfo";

// API
import { fetchCompanies } from "@/lib/api";
import { createMetadata } from "@/utils/meta";

type CompanyDetailPageProps = {
  params: Promise<{ id: string }>;
};

export const metadata = createMetadata({
  title: "하나루프 | 회사별 상세 탄소배출량 대시보드",
  description: "회사별 상세 탄소 배출량을 확인할 수 있습니다.",
});

export default async function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  const { id } = await params;
  const companies = await fetchCompanies();
  const company = companies.find((c) => c.id === id);

  return (
    <section className="p-6">
      {!company && <NoItems message="회사를 찾을 수 없습니다." />}

      {company && <DetailCompanyInfo company={company} />}
    </section>
  );
}

export const dynamic = "force-dynamic";
