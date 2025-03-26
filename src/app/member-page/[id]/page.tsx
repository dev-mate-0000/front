"use client";

import GetMemerDetailApi from "@/api/suggest/GetMemerDetailApi";
import { MemberDetailType } from "@/type/GetMemberType";
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
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-gray-700 to-black text-white p-6">
      {!member ? (
        <div className="text-xl font-bold text-gray-500">
          데이터가 없습니다.
        </div>
      ) : (
        <div className="flex flex-col justify-center w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
          {/* GitHub Logo Section */}
          <div className="flex justify-between items-center">
            <Image
              className="cursor-pointer hover:opacity-80"
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

          {/* Bio Section */}
          <textarea
            className={`mt-5 text-white text-2xl font-semibold bg-transparent border-none focus:outline-none w-full p-4 rounded-lg resize-none h-32 ${!member?.bio ? "opacity-70" : ""}`}
            value={member?.bio || ""}
            readOnly
            placeholder="소개가 없습니다."
            rows={4}
          />

          {/* Member Name and Job Section */}
          <div className="flex justify-between items-center mt-4">
            <h1 className="text-2xl font-extrabold">{member?.name}</h1>
            <span className="text-1xl opacity-60">
              {member?.job || "Unknown Job"}
            </span>
          </div>

          <hr className="border-white opacity-30 my-6" />

          {/* Language Section */}
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
                  <tr key={index} className="transition hover:bg-gray-700">
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
        </div>
      )}
    </div>
  );
}
