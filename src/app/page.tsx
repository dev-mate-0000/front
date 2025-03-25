"use client";

import { LoginGithub } from "@/config/GithubLogin";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    LoginGithub();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen text-white bg-gradient-to-b from-gray-700 to-black">
      <h1 className="text-6xl font-extrabold relative text-shadow-lg mb-6 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500 animate-fade-in">
        DEMEET
      </h1>
      <p className="text-gray-300 text-lg text-center leading-relaxed max-w-2xl px-4 animate-fade-in delay-200">
        개발자들이 <span className="text-blue-400 font-semibold">프로젝트</span>
        나<span className="text-blue-400 font-semibold"> 스터디 팀원</span>을
        쉽게 찾을 수 있도록 돕는 서비스입니다.
        <br />
        개발자들의{" "}
        <span className="text-blue-400 font-semibold">간단한 소개</span>와
        <span className="text-blue-400 font-semibold"> Github Page</span>로
        원하는 개발자를 만나보세요.
      </p>
    </div>
  );
}
