import { MemberDetailType } from "@/type/GetMemberType";
import axios from "axios";

export default async function GetMembersSuggestApi(page: number): Promise<
  MemberDetailType[]
> {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/members/suggest?page=${page}`,
    { withCredentials: true }
  );
  return response.data;
}
