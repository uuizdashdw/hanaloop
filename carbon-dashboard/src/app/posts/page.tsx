// API
import { fetchPosts, fetchCompanies } from "@/lib/api";

// Components
import PostList from "@/components/posts/PostList";
import PostPageFilter from "@/components/posts/PostPageFilter";

// Util
import { createMetadata } from "@/utils/meta";

export const metadata = createMetadata({
  title: "하나루프 | 보고서 목록",
  description: "탄소 배출량에 관해 작성된 보고서 목록을 확인할 수 있습니다.",
});

export default async function PostsPage() {
  const [posts, companies] = await Promise.all([fetchPosts(), fetchCompanies()]);

  const companyMap = Object.fromEntries(companies.map((c) => [c.id, c.name]));

  return (
    <section className="p-6 h-full">
      <h1 className="text-2xl font-bold mb-4">보고서 목록</h1>

      {/* 보고서 리스트 필터 영역 */}
      <PostPageFilter companies={companies} companyMap={companyMap} />

      {/* 보고서 리스트 영역 */}
      <PostList posts={posts} companyMap={companyMap} companies={companies} />
    </section>
  );
}

export const dynamic = "force-dynamic";
