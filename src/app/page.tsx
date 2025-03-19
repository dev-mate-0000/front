'use client';

import { LoginGithub } from "@/config/GithubLogin";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="large-text font-extrabold text-white relative text-shadow">DEMEET</h1>
        <button className="text-white opacity-80 mb-10 cursor-pointer hover:opacity-100" onClick = {() => LoginGithub()}>Github로 시작하기</button>
    </div>
  );
}
