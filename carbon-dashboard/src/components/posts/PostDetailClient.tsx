"use client";

import { useRouter } from "next/navigation";
import { usePostsStore } from "@/store/post";
import NoItems from "../common/NoItems";
import BackLink from "../common/BackLink";

type PostDetailClientProps = {
  id: string;
};

export default function PostDetailClient({ id }: PostDetailClientProps) {
  const router = useRouter();
  const { postList } = usePostsStore();

  const post = postList.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="p-6 text-center">
        <NoItems message="보고서를 찾을 수 없습니다." color="text-gray-400" />
        <BackLink href="/posts" message="← 목록으로 돌아가기" position="center" />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6">
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-md">
        <h1 className="text-2xl font-bold mb-3 text-gray-900">{post.title}</h1>

        <p className="text-sm text-gray-500 mb-6">
          회사 ID: {post.resourceUid} ・ {post.dateTime}
        </p>

        <hr className="my-4 border-t-2 border-gray-300" />

        <p className="text-gray-800 whitespace-pre-line leading-relaxed">{post.content}</p>

        <div className="mt-8">
          <BackLink href="/posts" message="← 보고서 목록으로" position="left" />
        </div>
      </div>
    </div>
  );
}
