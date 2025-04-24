"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-gray-800 shadow-md text-white py-2 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-4">
        <Link href="/">
          <span className="text-2xl font-semibold tracking-wide hover:opacity-80 cursor-pointer">
            DEMEET
          </span>
        </Link>

        <nav className="flex space-x-6">
          <Link
            href="/core"
            className="text-base hover:text-blue-400 transition duration-300"
          >
            Core
          </Link>
          <Link
              href="/my-page"
              className="text-base hover:text-blue-400 transition duration-300"
            >
              MyPage
          </Link>
        </nav>
      </div>
    </header>
  );
}
