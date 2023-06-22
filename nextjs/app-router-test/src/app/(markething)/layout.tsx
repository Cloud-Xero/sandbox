import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="bg-green-200">
        <nav className="flex gap-x-8">
          <Link href="/">Top</Link>
          <Link href="/about">About</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>
      </header>
      <div>{children}</div>
      <div>子レイアウト</div>
    </div>
  );
}
