"use client";

import { LoginGithub } from "@/config/GithubLogin";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    LoginGithub();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen text-white">
      <h1 className="large-text font-extrabold relative text-shadow mb-6">
        DEMEET
      </h1>
      <p className="text-gray-300 leading-relaxed text-center">
        개발자들이 프로젝트나 스터디 팀원을 쉽게 찾을 수 있도록 돕는 서비스입니다.
        <br />
        개발자들의 간단한 소개와 Github Page로 원하는 개발자를 만나보세요.
      </p>
    </div>
  );
}