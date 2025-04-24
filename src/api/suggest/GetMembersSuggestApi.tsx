import UnauthorizedError from "@/config/UnauthorizedError";
import { MemberDetailType } from "@/type/GetMemberType";
import axios from "axios";

export default async function GetMembersSuggestApi(): Promise<
  MemberDetailType[]
> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/members/suggest`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        throw new UnauthorizedError();
      }
    }
    throw error;
  }
}
