"use client";

import getLoginGithubUrl from "@/config/getLoginUrl";
import { useEffect, useState } from "react";

export default function Login() {
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

  const handleLogin = () => {
    if (loginUrl) {
      window.location.href = loginUrl;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-16 bg-gray-900">
      <div className="w-full max-w-md flex justify-center m-5 transform transition-all duration-300 ease-out">
        <div className="flex-none w-full p-12 bg-gray-800 rounded-xl shadow-xl">
          <img src="github-mark-white.svg" alt="GitHub Logo" className="w-24 h-24 mb-8 mx-auto" />
          
          <button 
            onClick={handleLogin}
            className="flex items-center justify-center bg-black text-white text-lg font-semibold py-3 px-6 rounded-md hover:bg-gray-700 transition-all shadow-lg transform hover:scale-105 focus:outline-none w-full"
          >
            <img src="github-mark-white.svg" alt="GitHub Logo" className="w-6 h-6 mr-3" />
            GitHub로 로그인
          </button>
        </div>
      </div>
    </div>
  );
}