// Util
import { createMetadata } from "@/utils/meta";

// Component
import PostDetailClient from "@/components/posts/PostDetailClient";

export const metadata = createMetadata({
  title: "하나루프 | 탄소 배출량 보고서 상세",
  description: "탄소 배출량 보고서 상세 정보를 확인할 수 있습니다.",
});

type PostDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;
  return <PostDetailClient id={id} />;
}
