// Components
import NoItems from "@/components/common/NoItems";
import DetailCompanyInfo from "@/components/company/DetailCompanyInfo";

// API
import { fetchCompanies } from "@/lib/api";

type CompanyDetailPageProps = {
  params: Promise<{ id: string }>;
};

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
