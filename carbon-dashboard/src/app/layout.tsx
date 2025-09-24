import type { ReactNode } from "react";

// Global CSS
import "./globals.css";

// Components
import SideBar from "@/components/common/SideBar";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

// Util
import { createMetadata } from "@/utils/meta";

export const metadata = createMetadata({
  title: "하나루프 | 탄소 배출량 대시보드",
  description: "전체 회사별 배출량 추세를 한눈에 확인할 수 있습니다.",
  path: "/",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen">
        <ReactQueryProvider>
          {/* 사이드바 영역*/}
          <SideBar />

          {/* 메인 영역 */}
          <main className="flex-1 p-6 bg-gray-50">{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
