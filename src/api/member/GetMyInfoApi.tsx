import { MemberDetailSelfType } from "@/type/MemberType";
import axios from "axios";

export default async function GetMyInfoApi(): Promise<MemberDetailSelfType> {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/members/self`,
    { withCredentials: true }
  );
  return response.data;
}
