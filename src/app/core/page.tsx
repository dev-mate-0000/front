"use client";

import Link from "next/link";
import GetMembersSuggestApi from "@/api/suggest/GetMembersSuggestApi";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { MemberDetailType } from "@/type/GetMemberType";
import { JOBTYPE } from "@/type/MemberEnum";
import LoadingUnit from "@/config/LoadingUnit";

export default function Core() {
  const [members, setMembers] = useState<MemberDetailType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setLoading(true);
    GetMembersSuggestApi(page).then((data) => {
      setMembers((prevMembers) => [...prevMembers, ...data]);
      setLoading(false);
      setHasMore(data.length > 0);
    });
  }, [page]);

  const lastElementRef = (node: HTMLElement | null) => {
    if (loading || !node) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-white bg-gradient-to-b from-gray-700 to-black pt-30">
      {members.map((member, index) => (
        <div
          key={member.id}
          className="w-full max-w-6xl flex justify-center space-x-8 overflow-x-auto m-5"
          ref={members.length === index + 1 ? lastElementRef : null}
        >
          <div className="flex-none w-full max-w-3xl p-8 bg-gray-800 rounded-xl shadow-lg">
            <div className="flex items-center justify-center space-x-4">
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
              <h2 className="text-4xl font-extrabold text-center">
                <Link href={`/member-page/${member?.id}`}>
                  {member?.name.length > 15
                    ? `${member?.name.slice(0, 15)}...`
                    : member?.name}
                </Link>
              </h2>
            </div>

            <textarea
              className="mt-4 text-white text-2xl font-extrabold w-full bg-transparent border-none focus:outline-none overflow-y-auto resize-none scrollbar-hide"
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
          </div>
        </div>
      ))}
      {loading && LoadingUnit()}
      {!hasMore && <p className="text-blue-500">No more items</p>}
    </div>
  );
}
