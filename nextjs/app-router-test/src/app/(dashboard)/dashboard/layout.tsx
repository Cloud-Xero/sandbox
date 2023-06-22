import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <div className="bg-blue-200">
        <nav className="flex h-screen flex-col gap-y-8 p-10">
          <Link href="/">Top</Link>
          <Link href="/about">About</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard" className="mt-auto">
            Login
          </Link>
        </nav>
      </div>
      <div>{children}</div>
      <div>子レイアウト</div>
    </div>
  );
}
