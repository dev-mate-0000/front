"use client";

import getLoginGithubUrl from "@/config/getLoginUrl";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [loginUrl, setLoginUrl] = useState("");

  useEffect(() => {
    getLoginGithubUrl().then((data) => {
      if (data) {
        setLoginUrl(data);
        return;
      }
      setLoginUrl("");
    });
  }, []);

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
          {loginUrl ? (
            <Link
              href={loginUrl}
              className="text-base hover:text-blue-400 transition duration-300"
            >
              Login
            </Link>
          ) : (
            <Link
              href="/my-page"
              className="text-base hover:text-blue-400 transition duration-300"
            >
              MyPage
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
