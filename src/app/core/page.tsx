"use client";

import Link from "next/link";
import GetMembersSuggestApi from "@/api/suggest/GetMembersSuggestApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MemberDetailType } from "@/type/GetMemberType";
import { JOBTYPE } from "@/type/MemberEnum";
import { useRouter } from 'next/navigation';
import UnauthorizedError from "@/config/UnauthorizedError";

export default function Core() {
  const [members, setMembers] = useState<MemberDetailType[]>([]);
  const router = useRouter();

  useEffect(() => {
    GetMembersSuggestApi()
    .then((data) => {
      setMembers(data);
    })
    .catch((error) => {
      if(error instanceof UnauthorizedError) {
        router.push("/login");
      }
    })
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-8 text-white bg-gradient-to-b from-gray-700 to-black ${members.length > 0 ? "pt-30" : ""}`}
    >
      {members.length === 0 ? (
        <div className="text-xl font-bold text-gray-500">
          데이터가 없습니다.
        </div>
      ) : (
        members.map((member) => (
          <div
            key={member.id}
            className="w-full max-w-6xl flex justify-center space-x-8 overflow-x-auto m-5 transform transition-all duration-300 ease-out hover:scale-105"
          >
            <Link
              href={`/member-page/${member?.id}`}
              className="flex-none w-full max-w-3xl p-8 bg-gray-800 rounded-xl shadow-lg"
            >
              <div className="flex items-center justify-start space-x-4">
                <Image
                  className="hover:opacity-80 cursor-pointer mb-3"
                  src="/github-mark-white.svg"
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
                <h2 className="text-4xl font-extrabold text-center w-full">
                  {member?.name.length > 15
                    ? `${member?.name.slice(0, 15)}...`
                    : member?.name}
                </h2>
              </div>

              <textarea
                className={`mt-4 text-white text-2xl font-extrabold w-full bg-transparent border-none focus:outline-none overflow-y-auto resize-none scrollbar-hide ${!member?.bio ? "opacity-70" : ""}`}
                rows={4}
                value={member?.bio || "소개가 없습니다."}
                readOnly
                style={{ resize: "none" }}
              />

              <div className="flex justify-between items-center space-x-6 mt-6">
                <span className="text-lg opacity-80">
                  {member?.job && JOBTYPE[member.job]
                    ? JOBTYPE[member.job]
                    : "Unknown"}
                </span>

                <p className="text-lg opacity-60">
                  {member?.languages?.length
                    ? member.languages.map((lang) => lang.language).join(", ")
                    : "Unknown"}
                </p>
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
