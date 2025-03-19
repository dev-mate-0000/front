"use client";

import GetMyInfoApi from "@/api/member/GetMyInfoApi";
import PatchMemberApi, { PatchMyInfoApiRequest } from "@/api/member/PatchMyInfoApi";
import { JobType } from "@/type/MemberDetailTypes";
import { MemberDetailType } from "@/type/MemberType";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Mypage() {
  const [member, setMember] = useState<MemberDetailType>();
  const { register, handleSubmit, setValue } = useForm<PatchMyInfoApiRequest>();

  useEffect(() => {
    GetMyInfoApi()
      .then((data) => {
        setValue("job", data.job);
        setValue("bio", data.bio);
        setMember(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit = (dto: PatchMyInfoApiRequest) => {
    if (!dto) return;
    console.log(dto);
    PatchMemberApi(dto).catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-8">
      <div className="flex flex-col justify-center w-full max-w-2xl">
        <Image
          className="hover:opacity-70 cursor-pointer"
          src="./github-mark-white.svg"
          alt="GitHub Logo"
          width={32}
          height={32}
          onClick={() => {
            if (member?.githubUrl) {
              window.open(member.githubUrl, "_blank");
            } else {
              alert("GitHub URL이 존재하지 않습니다.");
            }
          }}
        />

        <h1 className="mt-2 text-white text-4xl font-extrabold mb-7">{member?.bio}</h1>

        <div className="flex items-end space-x-3">
          <h1 className="text-3xl font-bold">{member?.name}</h1>

          {/* 드롭다운 추가 */}
          <select
            className="bg-gray-800 text-white px-2 py-1 rounded border border-gray-600"
            {...register("job")}
            defaultValue={member?.job}
          >
            {Object.entries(JobType).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <hr className="border-white opacity-20 my-3" />
        <p className="text-white opacity-70">
          {member?.languages?.length 
            ? member.languages
                .map(lang => lang.language)
                .join(", ")
            : "사용하는 언어 없음"}
        </p>


        {/* 폼 제출 버튼 추가 */}
        <button
          onClick={handleSubmit(onSubmit)}
        >
          저장하기
        </button>
      </div>
    </div>
  );
}
