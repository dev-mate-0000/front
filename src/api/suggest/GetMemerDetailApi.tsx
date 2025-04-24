import UnauthorizedError from "@/config/UnauthorizedError";
import { MemberDetailType } from "@/type/GetMemberType";
import axios from "axios";

export default async function GetMemerDetailApi(
  id: string
): Promise<MemberDetailType> {
  try {
    if (!id) {
      throw new Error("ID is required");
    }
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/members/${id}`,
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
