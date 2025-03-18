"use client";

import GetMyInfoApi, { GetMyInfoApiResponse } from "@/api/member/GetMyInfoApi";
import PatchMemberApi, { PatchMyInfoApiRequest } from "@/api/member/PatchMyInfoApi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Mypage() {
  const [member, setMember] = useState<GetMyInfoApiResponse>()
  const { register, handleSubmit, setValue } = useForm<PatchMyInfoApiRequest>();

  useEffect(() => {
    GetMyInfoApi()
    .then(data => {
        setValue("job", data.job);
        setValue("bio", data.bio);
        setMember(data);
    })
    .catch(err => {
        console.log(err)
    })
  }, [])

  const onSubmit = (dto: PatchMyInfoApiRequest) => {
    if(!dto) return;
    console.log(dto);
    PatchMemberApi(dto)
    .catch(err => console.log(err))
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="small fw-bold">닉네임</label>
          <input
            value={member?.name}
            readOnly
          />
        </div>

        <div>
            {member?.githubUrl}
        </div>

        <div>
          <label className="small fw-bold">직업</label>
          <input
            placeholder="Job"
            {...register("job")}
          />
        </div>

        <div>
          <label className="small fw-bold">자기소개</label>
          <input
            placeholder="Bio"
            {...register("bio")}
          />
        </div>

        <button
          type="submit"
        >
          저장
        </button>
      </form>
    </div>
  )
}