// API
import { fetchCompanies } from "@/lib/api";

// Component
import NewPostForm from "@/components/posts/NewPostForm";

// Utils
import { createMetadata } from "@/utils/meta";

export const metadata = createMetadata({
  title: "하나루프 | 탄소 배출량 보고서 작성",
  description: "탄소 배출량 보고서를 작성할 수 있습니다.",
});

export default async function NewPostPage() {
  const companies = await fetchCompanies();

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-6">새 보고서 작성</h1>

      <NewPostForm companies={companies} />
    </section>
  );
}

export const dynamic = "force-dynamic";
