"use client";

import Link from "next/link";
import { memo, useEffect, useMemo } from "react";

// Type
import { Company, Post } from "@/types";

// Store
import { usePostsStore } from "@/store/post";
import ListSkeleton from "../common/ListSkeleton";
import NoItems from "../common/NoItems";

type PostListProps = {
  posts: Post[];
  companyMap: {
    [k: string]: string;
  };
  companies: Company[];
};

function PostListComponent({ posts, companyMap, companies }: PostListProps) {
  const { setPosts, getFilteredPosts } = usePostsStore();
  const filteredPosts = getFilteredPosts(companies);

  // 기본 보고서 데이터 세팅 및 보고서 추가 시, 데이터를 세팅합니다.
  useEffect(() => {
    if (!Array.isArray(posts) || posts.length === 0) return;

    setPosts([...posts]);
  }, [posts, setPosts]);

  return (
    <>
      {filteredPosts?.length > 0 && (
        <ul className="space-y-4">
          {filteredPosts?.map((post) => (
            <li key={post.id}>
              <Link
                href={`/posts/${post.id}`}
                className="block rounded-xl border border-gray-200 bg-white p-6 shadow-sm
                      transition-transform duration-200 ease-in-out
                      hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]"
              >
                <p className="font-semibold text-lg text-gray-900">{post.title}</p>
                <p className="mt-2 text-sm text-gray-600">
                  {companyMap[post.resourceUid]} ・ {post.dateTime}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {filteredPosts?.length === 0 && <NoItems message="결과가 없습니다." color="text-gray-400" />}
    </>
  );
}

const PostList = memo(PostListComponent);
export default PostList;
