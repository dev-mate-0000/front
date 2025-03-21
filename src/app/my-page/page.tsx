"use client";

import GetMyInfoApi from "@/api/member/GetMyInfoApi";
import PatchMemberApi from "@/api/member/PatchMyInfoApi";
import { LoginGithub } from "@/config/GithubLogin";
import { JobType } from "@/type/MemberDetailTypes";
import { MemberDetailType, PatchMyInfoApiRequest } from "@/type/MemberType";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LoadingPage from "@/config/LoadingPage";

enum EditStatus {
  GOOD = "/good.svg",
  EDIT = "/edit.svg",
  ERR = "/err.svg"
}
export default function MyPage() {
  const [member, setMember] = useState<MemberDetailType>();
  const { register, handleSubmit, setValue, watch } = useForm<PatchMyInfoApiRequest>();
  const [editStatus, setEditStatus] = useState<EditStatus>(EditStatus.GOOD);

  useEffect(() => {
    GetMyInfoApi()
      .then((data) => {
        setValue("job", data.job);
        setValue("bio", data.bio);
        setMember(data);
      })
      .catch((err) => {
        if(err?.response?.status === 403) {
          LoginGithub();
        }
        setEditStatus(EditStatus.ERR);
      });
  }, []);

  useEffect(() => {
    const bio = watch("bio");
    const job = watch("job");
    if(bio !== member?.bio || job !== member?.job) {
      setEditStatus(EditStatus.EDIT);
      return;
    }
    setEditStatus(EditStatus.GOOD);
  }, [watch("bio"), watch("job")])

  const onSubmit = (dto: PatchMyInfoApiRequest) => {
    if (!dto) return;
    console.log(dto);
    PatchMemberApi(dto)
    .then((data) => {
      setValue("job", data.job);
      setValue("bio", data.bio);
      setMember(data);
      setEditStatus(EditStatus.GOOD);
    })
    .catch((err) => {
      setEditStatus(EditStatus.ERR);
      console.log(err);
    })
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-8">
        <div className="flex flex-col justify-center w-full max-w-4xl">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex space-x-3">
                    <Image
                        className="hover:opacity-70 cursor-pointer"
                        src="/github-mark-white.svg"
                        alt="GitHub Logo"
                        width={32}
                        height={32}
                        onClick={() => {
                            if (member?.githubUrl) {
                                window.open(member?.githubUrl, "_blank");
                            } else {
                                alert("GitHub URL이 존재하지 않습니다.");
                            }
                        }}
                    />
                    <Image
                        className="ml-3"
                        src={editStatus}
                        alt="Status Logo"
                        width={32}
                        height={32}
                    />
                </div>

                <textarea
                    {...register("bio")}
                    className="mt-2 text-white text-4xl font-extrabold mt-7 mb-7 overflow-y-auto w-full bg-transparent border-none focus:outline-none scrollbar-hide"
                    rows={3}
                    placeholder="자기소개를 입력해주세요."
                />

                <div className="flex items-end space-x-3">
                    <h1 className="text-3xl font-bold">{member?.name}</h1>

                    <select
                        className="bg-gray-800 text-white px-2 py-1 rounded border border-gray-600"
                        {...register("job")}
                        defaultValue={member?.job}
                    >
                        <option value="" disabled hidden>
                            Select a job...
                        </option>
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
                        ? member.languages.map(lang => lang.language).join(", ")
                        : "Unknown"}
                </p>

                <button type="submit">저장하기</button>
            </form>
        </div>
    </div>
  );
}
