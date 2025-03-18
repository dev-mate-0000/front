'use client';

import Image from "next/image";
import LoginGithubUrlApi from "../api/login/LoginGithubUrlApi";

export default function Home() {

  const loginGithub = () => {
    LoginGithubUrlApi()
    .then(rtn => {
        window.location.href = rtn;
    })
    .catch(err => {
        console.log(err);
    });
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="large-text font-extrabold text-white relative text-shadow">DEMEET</h1>
        <button className="text-white opacity-80 mb-10 cursor-pointer hover:opacity-100" onClick = {() => loginGithub()}>Github로 시작하기</button>
    </div>
  );
}
