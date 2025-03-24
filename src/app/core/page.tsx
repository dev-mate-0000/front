"use client";

import Link from "next/link";
import GetMembersSuggestApi from "@/api/suggest/GetMembersSuggestApi";
import GetMemberDetailApi from "@/api/suggest/GetMemerDetailApi";
import GetNextMembersSuggestApi from "@/api/suggest/GetNextMembersSuggestApi";
import {
  GetMembersSuggestApiResponse,
  JobType,
  MemberDetailType,
} from "@/type/MemberType";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LoginGithub } from "@/config/GithubLogin";

export default function Core() {
  const [members, setMembers] = useState<GetMembersSuggestApiResponse[]>([]);
  const [memberDetail, setMemberDetail] = useState<MemberDetailType>();
  const [index, setIndex] = useState(0);
  const [id, setId] = useState("");
  const prevIndex = useRef(index);

  useEffect(() => {
    if (members.length === 0) {
      GetMembersSuggestApi()
        .then((data) => {
          setId(data[0].id);
          setMembers(data);
        })
        .catch((err) => {
          if (err?.response?.status === 403) {
            LoginGithub();
          }
        });
      return;
    }

    if (index < 0) setIndex(0);
    if (index <= prevIndex.current) return;

    GetNextMembersSuggestApi(index)
      .then((data) => {
        setMembers((prev) => [...prev, data]);
      })
      .catch((err) => {
        setIndex(prevIndex.current);
        if (err?.response?.status === 403) {
          LoginGithub();
        }
      });

    prevIndex.current = index;
  }, [index]);

  useEffect(() => {
    GetMemberDetailApi(id)
      .then((data) => {
        setMemberDetail(data);
      })
      .catch((err) => {
        if (err?.response?.status === 403) {
          LoginGithub();
        }
      });
  }, [id]);

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-8">
      {members.length === 0 || !memberDetail ? (
        <div className="text-xl font-bold text-gray-400">
          데이터가 없습니다.
        </div>
      ) : (
        <div className="w-full max-w-4xl grid grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <Image
              className="hover:opacity-70 cursor-pointer mb-3"
              src="/github-mark-white.svg"
              alt="GitHub Logo"
              width={32}
              height={32}
              onClick={() => {
                if (memberDetail?.githubUrl) {
                  window.open(memberDetail.githubUrl, "_blank");
                } else {
                  alert("GitHub URL이 존재하지 않습니다.");
                }
              }}
            />

<h1
  className="mt-2 text-white text-4xl font-extrabold mb-7"
  style={{
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
    height: "4.5rem", // 3줄 높이 고정
    lineHeight: "1.5rem", // 줄 간격 조절 (16px 기준)
  }}
>
  {memberDetail?.bio}
</h1>


            <div className="flex items-end space-x-3">
              <h1 className="text-3xl font-bold hover:opacity-70">
                <Link href={`/member-page/${memberDetail?.id}`}>
                  {memberDetail?.name.length > 10
                    ? `${memberDetail?.name.slice(0, 10)}...`
                    : memberDetail?.name}
                </Link>
              </h1>
              <span className="text-sm opacity-60">
                {Object.values(JobType).includes(memberDetail?.job as JobType)
                  ? memberDetail?.job
                  : "Unknown"}
              </span>
            </div>

            <hr className="border-white opacity-20 my-3" />
            <p className="text-white opacity-70">
              {memberDetail?.languages?.length
                ? memberDetail.languages.map((lang) => lang.language).join(", ")
                : "Unknown"}
            </p>
          </div>

          <div className="relative flex flex-col items-end justify-center h-48 md:h-auto text-right">
            <div className="absolute top-[-120px] flex flex-col items-end">
              {members.slice(Math.max(0, index - 2), index).map((member, i) => (
                <span
                  className={`sublarge-text stroke-text font-extrabold opacity-40 cursor-pointer transition-opacity hover:opacity-70 ${
                    member?.name.length > 10 ? "text-sm" : "text-base"
                  }`}
                  key={i}
                  onClick={() => {
                    setIndex(index - (2 - i));
                    setId(member.id);
                  }}
                >
                  {member?.name.length > 10
                    ? `${member?.name.slice(0, 10)}...`
                    : member?.name}
                </span>
              ))}
            </div>

            <h1
              className={`sublarge-text font-extrabold text-white relative z-10 text-shadow ${
                members[index]?.name.length > 10 ? "text-xl" : "text-2xl"
              }`}
            >
              {members[index]?.name.length > 10
                ? `${members[index]?.name.slice(0, 10)}...`
                : members[index]?.name}
            </h1>

            <div className="absolute bottom-[-120px] flex flex-col items-end">
              {members.slice(index + 1, index + 3).map((member, i) => (
                <span
                  className={`sublarge-text stroke-text font-extrabold opacity-40 cursor-pointer transition-opacity hover:opacity-70 ${
                    member?.name.length > 10 ? "text-sm" : "text-base"
                  }`}
                  key={i}
                  onClick={() => {
                    setIndex(index + (i + 1));
                    setId(member.id);
                  }}
                >
                  {member?.name.length > 10
                    ? `${member?.name.slice(0, 10)}...`
                    : member?.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
