"use client";

import Link from "next/link";
import GetMembersSuggestApi from "@/api/suggest/GetMembersSuggestApi";
import GetMemerDetailApi from "@/api/suggest/GetMemerDetailApi";
import GetNextMembersSuggestApi from "@/api/suggest/GetNextMembersSuggestApi";
import { GetMembersSuggestApiResponse, MemberDetailType } from "@/type/MemberType";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { JobType } from "@/type/MemberDetailTypes";
import {LoginGithub} from "@/config/GithubLogin";
import LoadingPage from "@/config/LoadingPage";

export default function Core() {
  const [members, setMembers] = useState<GetMembersSuggestApiResponse[]>([]);
  const [memberDetail, setMemberDetail] = useState<MemberDetailType>();
  const [index, setIndex] = useState(0);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);
  const prevIndex = useRef(index);

  useEffect(() => {
    if(members.length === 0) {
      GetMembersSuggestApi()
      .then((data) => {
        setId(data[0].id);
        setLoading(false);
        setMembers(data);
      })
      .catch((err) => {
          if(err?.response?.status === 403) {
              LoginGithub();
          }
      });
      return;
    }

    if(index < 0) setIndex(0);
    if (index <= prevIndex.current) return;

    GetNextMembersSuggestApi(index)
    .then(data => {
        setMembers((prev) => [...prev, data]);
    })
    .catch(err => {
        setIndex(prevIndex.current);
        if(err?.response?.status === 403) {
            LoginGithub();
        }
    });

    prevIndex.current = index;
  }, [index]);

  useEffect(() => {
    GetMemerDetailApi(id)
    .then(data => {
        setMemberDetail(data);
    })
    .catch(err => {
        if(err?.response?.status === 403) {
            LoginGithub();
        }
    })
  }, [id])

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-8">
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
              textOverflow: "ellipsis"
            }}
          >
            {memberDetail?.bio}
          </h1>

          <div className="flex items-end space-x-3">
            <h1 className="text-3xl font-bold">
              <Link href={`/member-page/${memberDetail?.id}`}>
                { memberDetail?.name }
              </Link>
            </h1>
            <span className="text-xm opacity-60">
              { JobType[memberDetail?.job as keyof typeof JobType] ?? "Unknown" }
            </span>
          </div>

          <hr className="border-white opacity-20 my-3" />
          <p className="text-white opacity-70">
            {memberDetail?.languages?.length
              ? memberDetail.languages
                  .map(lang => lang.language)
                  .join(", ")
              : "Unknown"}
          </p>

        </div>

        <div className="relative flex flex-col items-end justify-center h-48 md:h-auto text-right">
          <div className="absolute top-[-120px] flex flex-col items-end">
            {members
              .slice(Math.max(0, index - 2), index)
              .map((member, i) => (
                <span
                  className="sublarge-text stroke-text font-extrabold opacity-40 cursor-pointer transition-opacity hover:opacity-70"
                  key={i}
                  onClick={() => {
                    setIndex(index - (2 - i));
                    setId(member.id);
                  }}
                >
                  {member?.name}
                </span>
              ))}
          </div>

          <h1 className="large-text font-extrabold text-white relative z-10 text-shadow">
            {members[index]?.name}
          </h1>

          <div className="absolute bottom-[-120px] flex flex-col items-end">
            {members
              .slice(index + 1, index + 3)
              .map((member, i) => (
                <span
                  className="sublarge-text stroke-text font-extrabold opacity-40 cursor-pointer transition-opacity hover:opacity-70"
                  key={i}
                  onClick={() => {
                    setIndex(index + (i + 1));
                    setId(member.id);
                  }}
                >
                  {member?.name}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
