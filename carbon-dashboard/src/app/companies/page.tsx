// API
import { fetchCompanies } from "@/lib/api";

// Components
import NoItems from "@/components/common/NoItems";
import CompanyList from "@/components/company/CompanyList";

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
