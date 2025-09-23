// Types
import { Post } from "@/types";

// Seed Data
import { delay, jitter, maybeFail } from "@/utils";
import { companies, posts, countries } from "./data";

// Utils

const _countries = [...countries];
const _companies = [...companies];
let _posts = [...posts];

// 국가 데이터를 가져옵니다.
export async function fetchCountries() {
  await delay(jitter());
  return _countries;
}

// 회사 데이터를 가져옵니다.
export async function fetchCompanies() {
  await delay(jitter());
  return _companies;
}

// 포스트 데이터를 가져옵니다.
export async function fetchPosts() {
  await delay(jitter());
  return _posts;
}

// 파라미터 p 의 id 존재 여부에 따라 포스트를 생성하거나 수정합니다.
export async function createOrUpdatePost(p: Omit<Post, "id"> & { id?: string }): Promise<Post> {
  await delay(jitter());

  if (maybeFail()) throw new Error("Save failed");

  if (p?.id) {
    // update
    _posts = _posts.map((x) => (x.id === p.id ? (p as Post) : x));
    return p as Post;
  }

  // create
  const created = { ...p, id: crypto.randomUUID() };
  _posts = [..._posts, created];
  return created;
}
