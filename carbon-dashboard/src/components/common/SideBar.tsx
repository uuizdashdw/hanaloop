import Link from "next/link";

export default function SideBar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <h1 className="text-xl font-bold mb-6">🌍 Dashboard</h1>
      <nav className="flex flex-col gap-6">
        <Link href="/" className="hover:underline">
          통합 대시보드
        </Link>
        <Link href="/companies" className="hover:underline">
          회사별 상세
        </Link>
        <Link href="/countries" className="hover:underline">
          국가별 상세
        </Link>
        <Link href="/posts" className="hover:underline">
          보고서
        </Link>
      </nav>
    </aside>
  );
}
