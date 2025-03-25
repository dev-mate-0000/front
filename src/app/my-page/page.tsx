"use client";

import GetMyInfoApi from "@/api/member/GetMyInfoApi";
import PatchMemberApi from "@/api/member/PatchMyInfoApi";
import { MemberDetailSelfType } from "@/type/GetMemberType";
import { JOBTYPE, SHOWSTATUS } from "@/type/MemberEnum";
import { PatchMyInfoApiRequest } from "@/type/GiveMemberType";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DeleteMemberApi from "@/api/member/DeleteMemberApi";
import { useRouter } from "next/navigation";

enum EditStatus {
  GOOD = "/good.svg",
  EDIT = "/edit.svg",
  ERR = "/err.svg",
}

export default function MyPage() {
  const [member, setMember] = useState<MemberDetailSelfType | undefined>();
  const { register, handleSubmit, setValue, watch } =
    useForm<PatchMyInfoApiRequest>();
  const [editStatus, setEditStatus] = useState<EditStatus>(EditStatus.GOOD);
  const router = useRouter();

  useEffect(() => {
    GetMyInfoApi()
      .then((data) => {
        setValue("job", data.job);
        setValue("bio", data.bio);
        setValue("status", data.status);
        setMember(data);
      })
      .catch(() => {
        setEditStatus(EditStatus.ERR);
      });
  }, []);

  useEffect(() => {
    const bio = watch("bio");
    const job = watch("job");
    const status = watch("status");
    if (
      bio !== member?.bio ||
      job !== member?.job ||
      status !== member?.status
    ) {
      setEditStatus(EditStatus.EDIT);
      return;
    }
    setEditStatus(EditStatus.GOOD);
  }, [watch("bio"), watch("job"), watch("status")]);

  const onSubmit = (dto: PatchMyInfoApiRequest) => {
    if (!dto) return;
    PatchMemberApi(dto)
      .then(() => {
        setValue("job", dto.job);
        setValue("bio", dto.bio);
        setValue("status", dto.status);
        setMember((prev) => {
          if (!prev) return undefined;
          return {
            ...prev,
            job: dto.job,
            bio: dto.bio,
          };
        });
        setEditStatus(EditStatus.GOOD);
      })
      .catch(() => {
        setEditStatus(EditStatus.ERR);
      });
  };

  const deleteMember = () => {
    if (!confirm("정말로 탈퇴하시겠습니까?")) return;
    DeleteMemberApi().then(() => {
      router.push("/");
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen text-white bg-gradient-to-b from-gray-700 to-black">
      {!member ? (
        <div className="text-xl font-bold text-gray-500">
          데이터가 없습니다.
        </div>
      ) : (
        <div className="flex flex-col justify-center w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between items-center">
              <select
                className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 w-48"
                {...register("status")}
                defaultValue={member?.status}
              >
                {Object.entries(SHOWSTATUS).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>

              <div className="flex space-x-3">
                <Image
                  className="cursor-pointer hover:opacity-80"
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
                  className="cursor-pointer hover:opacity-80"
                  src={editStatus}
                  alt="Status Logo"
                  width={32}
                  height={32}
                />
              </div>
            </div>

            <textarea
              {...register("bio")}
              className="mt-5 text-white text-lg font-semibold bg-transparent border-none focus:outline-none w-full p-4 rounded-lg resize-none h-32"
              placeholder="자기소개를 입력해주세요."
              rows={4}
            />

            <div className="flex justify-between items-center mt-4">
              <h1 className="text-3xl font-bold">{member?.name}</h1>
              <select
                className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
                {...register("job")}
                defaultValue={member?.job || ""}
              >
                <option value="">직업 선택...</option>
                {Object.entries(JOBTYPE).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <hr className="border-white opacity-30 my-6" />

            {member?.languages?.length ? (
              <table className="w-full border-collapse text-white text-left text-sm">
                <thead>
                  <tr className="bg-gray-700 text-gray-200">
                    <th className="px-4 py-3 border border-gray-600 rounded-tl-lg">
                      Language
                    </th>
                    <th className="px-4 py-3 border border-gray-600 rounded-tr-lg">
                      Codes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {member.languages.map((lang, index) => (
                    <tr key={index} className="transition">
                      <td className="px-4 py-3 border border-gray-600">
                        <strong>{lang.language}</strong>
                      </td>
                      <td className="px-4 py-3 border border-gray-600">
                        <p className="text-gray-400">
                          {lang.codes.toLocaleString()}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-400">Unknown</p>
            )}

            <button
              type="submit"
              className="mt-6 px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300 border border-gray-600"
            >
              저장하기
            </button>
            <button
              onClick={deleteMember}
              className="ml-3 mt-6 px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md transition duration-300 border border-gray-600
             hover:bg-red-500 transition duration-300 transform hover:scale-105 
             focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              탈퇴하기
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
