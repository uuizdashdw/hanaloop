import type { Metadata } from "next";

const SITE_NAME = "하나루프 | 탄소 배출량 대시보드";
const BASE_URL = "https:/localhost:3000";

// 정적 페이지 메타 데이터를 생성합니다.
export const createMetadata = ({ title, description, path = "/" }: { title: string; description: string; path?: string }): Metadata => {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = `${BASE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
};
