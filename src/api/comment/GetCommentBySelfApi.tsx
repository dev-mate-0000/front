import UnauthorizedError from "@/config/UnauthorizedError";
import { CommentType } from "@/type/GetCommentType";
import axios from "axios";

export default async function GetCommentBySelf(): Promise<CommentType[]> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/members/comments/self`,
      { withCredentials: true }
    );
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
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
