"use client";

import getLoginGithubUrl from "@/config/getLoginUrl";
import DefaultModal, { ModalProps } from "@/config/modal/defaultModal";
import { useEffect, useState } from "react";

export default function Home() {
  const [loginUrl, setLoginUrl] = useState("");

  const [modalData, setModalData] = useState<ModalProps>({
      title: "로그인",
      sub: "원할한 서비스 이용을 위해 로그인 하시겠습니까?",
      submitText: "로그인",
      isOpen: false
    });
  
    const modalCloser = () => {
      setModalData((prev: ModalProps) => ({
        ...prev,
        isOpen: false
      }))
    }

    const modalOkCloser = () => {
      setModalData((prev: ModalProps) => ({
        ...prev,
        isOpen: false
      }))
      window.location.href = loginUrl
    }

  useEffect(() => {
    getLoginGithubUrl()
    .then(data => {
      if(data) {
        setModalData(prev => ({
          ...prev,
          isOpen: true
        }))
        setLoginUrl(data);
      }
    })
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen text-white bg-gradient-to-b from-gray-700 to-black">
      <DefaultModal 
        isOpen={modalData.isOpen}
        submitText={modalData.submitText}
        title={modalData.title} 
        sub={modalData.sub}
        
        onClose={modalCloser}
        onOkClose={modalOkCloser}
      />
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
