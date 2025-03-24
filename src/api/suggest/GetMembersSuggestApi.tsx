import { GetMembersSuggestApiResponse } from "@/type/MemberType";
import axios from "axios";

export default async function GetMembersSuggestApi(): Promise<
  GetMembersSuggestApiResponse[]
> {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/members/suggest`,
    { withCredentials: true }
  );
  return response.data;
}
