import Link from "next/link";

export default function Header() {
    return (
      <header className="fixed top-0 left-0 right-0 w-full shadow-md text-xl font-bold text-white p-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
        <Link href="/"><span>DEMEET</span></Link>
          <nav className="flex space-x-4">
            <Link href="/core" className="text-sm hover:opacity-70 font-light">Core</Link>
          </nav>
        </div>
      </header>
    );
  }
  