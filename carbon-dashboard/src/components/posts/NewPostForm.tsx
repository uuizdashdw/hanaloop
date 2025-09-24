"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// API
import { createOrUpdatePost } from "@/lib/api";

// Type
import { Company } from "@/types";
import Loading from "../common/Loading";
import { usePostsStore } from "@/store/post";

export default function NewPostForm({ companies }: { companies: Company[] }) {
  const [title, setTitle] = useState("");
  const [resourceUid, setResourceUid] = useState(companies[0]?.id ?? "");
  const [dateTime, setDateTime] = useState("2024-01");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { addPost, postList } = usePostsStore();

  const handleSubmit = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const post = await createOrUpdatePost({ title, resourceUid, dateTime, content });
      addPost(post);
    } catch (e: any) {
      setError(e.message || "저장 실패");
    } finally {
      setLoading(false);
      alert("작성 완료");
      router.push("/posts");
    }
  };

  return (
    <>
      <div className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}

        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목" className="w-full border p-2 rounded outline-0 right-0" />

        <select value={resourceUid} onChange={(e) => setResourceUid(e.target.value)} className="w-full border p-2 rounded outline-0 right-0">
          {companies.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input type="month" value={dateTime} onChange={(e) => setDateTime(e.target.value)} className="w-full border p-2 rounded outline-0 right-0" />

        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용" className="w-full border p-2 rounded h-40 outline-0 right-0" />

        <div className="text-right">
          <button onClick={handleSubmit} className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            저장
          </button>
        </div>
      </div>

      {loading && (
        <div className="w-full h-screen absolute top-0 left-0 right-0 bottom-0 z-10">
          <Loading message="저장 중..." />
        </div>
      )}
    </>
  );
}
