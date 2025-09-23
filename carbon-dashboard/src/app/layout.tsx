import "./globals.css";
import type { ReactNode } from "react";

// Components
import SideBar from "@/components/common/SideBar";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

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
