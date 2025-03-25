"use client";

import GetMemerDetailApi from "@/api/suggest/GetMemerDetailApi";
import { JobType, MemberDetailType } from "@/type/MemberType";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MemberPage() {
  const { id } = useParams();
  const [member, setMember] = useState<MemberDetailType>();

  useEffect(() => {
    if (id) {
      const memberId = Array.isArray(id) ? id[0] : id;
      GetMemerDetailApi(memberId).then((data) => {
        setMember(data);
      });
    }
  }, [id]);

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-8">
      {!member ? (
        <div className="text-xl font-bold text-gray-400">
          데이터가 없습니다.
        </div>
      ) : (
        <div className="flex flex-col justify-center w-full max-w-4xl">
          <div className="flex space-x-3">
            <Image
              className="hover:opacity-70 cursor-pointer"
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
          </div>

          <textarea
            className="mt-2 text-white text-4xl font-extrabold mt-7 mb-7 overflow-y-auto w-full bg-transparent border-none focus:outline-none scrollbar-hide"
            rows={3}
            value={member?.bio || ""}
            readOnly
          />

          <div className="flex items-end space-x-3">
            <h1 className="text-3xl font-bold">{member?.name}</h1>

            <span className="text-sm opacity-60">
              {Object.values(JobType).includes(member?.job as JobType)
                ? member?.job
                : "Unknown"}
            </span>
          </div>

          <hr className="border-white opacity-20 my-3" />
          <p className="text-white opacity-70">
            {member?.languages?.length
              ? member.languages.map((lang) => lang.language).join(", ")
              : "Unknown"}
          </p>
        </div>
      )}
    </div>
  );
}
