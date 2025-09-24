// API
import { fetchCountries } from "@/lib/api";

// Components
import CountryList from "@/components/country/CountryList";
import NoItems from "@/components/common/NoItems";

// Util
import { createMetadata } from "@/utils/meta";

export const metadata = createMetadata({
  title: "하나루프 | 국가별 탄소 배출량 대시보드",
  description: "국가별 탄소 배출량을 확인할 수 있습니다.",
});

export default async function CountryPage() {
  const countries = await fetchCountries();

  return (
    <section className="p-6 h-full">
      <h1 className="text-2xl font-bold mb-4">국가 목록</h1>

      {countries?.length > 0 && <CountryList countries={countries} />}
      {countries?.length === 0 && <NoItems message="등록된 국가가 없습니다." />}
    </section>
  );
}
