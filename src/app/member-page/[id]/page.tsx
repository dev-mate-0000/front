"use client";

import DeleteCommentApi from "@/api/comment/DeleteCommentByCommentIdApi";
import GetCommentByMemberId from "@/api/comment/GetCommentByMemberIdApi";
import PatchCommentByCommentId from "@/api/comment/PatchCommentByCommentIdApi";
import PostCommentByMemberId from "@/api/comment/PostCommentByMemberIdApi";
import GetMemerDetailApi from "@/api/suggest/GetMemerDetailApi";
import { CommentType, PostCommentType } from "@/type/GetCommentType";
import { MemberDetailType } from "@/type/GetMemberType";
import { JOBTYPE } from "@/type/MemberEnum";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function MemberPage() {
  const { id } = useParams();
  const [member, setMember] = useState<MemberDetailType>();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [selectedComment, setSelectedComment] = useState<string>("");

  const { register, handleSubmit, setValue } = useForm<PostCommentType>();

  useEffect(() => {
    if (!id) return;
    const memberId = Array.isArray(id) ? id[0] : id;
    GetMemerDetailApi(memberId).then((data) => {
      setMember(data);
    });
  }, [id]);

  const getComment = (memberId: string) => {
    GetCommentByMemberId(memberId).then((data) => {
      setComments(data);
    });
  };

  useEffect(() => {
    if (!member) return;
    const memberId = member.id;
    getComment(memberId);
  }, [member]);

  const onSubmit = (dto: PostCommentType) => {
    if (!dto) return;

    if (!member) return;
    const memberId = member.id;

    if (!selectedComment) {
      PostCommentByMemberId(memberId, dto).then(() => {
        getComment(memberId); // 댓글을 작성한 후 댓글 목록을 갱신
        setValue("review", ""); // 댓글 작성 후 입력 필드 초기화
      });
      return;
    }
    PatchCommentByCommentId(selectedComment, dto).then(() => {
      getComment(memberId);
      setValue("review", "");
      setSelectedComment("");
    });
  };

  const commentDeleteHandler = (commentId: string) => {
    if (!member) return;
    const memberId = member.id;

    DeleteCommentApi(commentId).then(() => {
      getComment(memberId);
      setValue("review", "");
      setSelectedComment("");
    });
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-8 text-white bg-gradient-to-b from-gray-700 to-black ${member ? "pt-30" : ""}`}
    >
      {!member ? (
        <div className="text-xl font-bold text-gray-500">
          데이터가 없습니다.
        </div>
      ) : (
        <div className="flex flex-col justify-center w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="mb-10">
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
                {member?.job && JOBTYPE[member.job]
                  ? JOBTYPE[member.job]
                  : "Unknown"}
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
              <div className="text-gray-500">등록된 언어가 없습니다.</div>
            )}
          </div>

          {/* Comments Section */}
          <h2 className="text-xl font-bold mb-4">Comment</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <textarea
              className="w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-lg resize-none mb-4"
              placeholder="댓글을 작성하세요."
              {...register("review")}
            />

            {selectedComment ? (
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="mb-4 px-3 py-2 w-full bg-gray-700 hover:scale-107 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-md transition duration-300 border border-gray-600 transform focus:outline-none"
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="mb-4 px-3 py-2 w-full bg-gray-700 hover:scale-107 hover:bg-red-500 text-white font-semibold rounded-lg shadow-md transition duration-300 border border-gray-600 transform focus:outline-none"
                  onClick={() => commentDeleteHandler(selectedComment)}
                >
                  Delete
                </button>

                <button
                  type="submit"
                  className="mb-4 px-3 py-2 w-full bg-gray-700 hover:scale-107 text-white font-semibold rounded-lg shadow-md transition duration-300 border border-gray-600 transform focus:outline-none"
                  onClick={() => {
                    setValue("review", "");
                    setSelectedComment("");
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              // 기본 "댓글 작성" 버튼만 표시
              <button
                type="submit"
                className="mb-4 px-3 py-2 w-full bg-gray-700 hover:scale-102 text-white font-semibold rounded-lg shadow-md transition duration-300 border border-gray-600 transform hover:bg-blue-500 focus:outline-none"
              >
                Submit
              </button>
            )}
          </form>

          {/* 댓글 리스트 */}
          <ul className="space-y-4 mt-6">
            {comments.map((comment) => {
              const createdAt = new Date(comment.createdAt);
              const updatedAt = new Date(comment.updatedAt);
              const isEdited = createdAt.getTime() !== updatedAt.getTime(); // 수정 여부 확인

              return (
                <li
                  key={comment.id}
                  className="bg-gray-800 p-5 rounded-xl shadow-md hover:bg-gray-700 transition cursor-pointer"
                  onClick={() => {
                    if (!comment.editable) return;
                    setValue("review", comment.review);
                    setSelectedComment(comment.id);
                  }}
                >
                  {/* 작성자 정보 */}
                  <div className="flex items-center justify-between mb-2 text-sm text-gray-300">
                    <p className="font-semibold">{comment.reviewerInfo.name}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <p>
                        {new Intl.DateTimeFormat("ko-KR", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(updatedAt)}
                      </p>
                      {isEdited && (
                        <span className="text-gray-500">(수정됨)</span>
                      )}
                    </div>
                  </div>

                  {/* 리뷰 내용 */}
                  <p className="text-base text-white leading-relaxed">
                    {comment.review}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
