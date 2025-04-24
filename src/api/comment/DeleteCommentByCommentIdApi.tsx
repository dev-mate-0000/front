import UnauthorizedError from "@/config/UnauthorizedError";
import axios from "axios";

export default async function DeleteCommentApi(
  commentId: string
): Promise<void> {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/members/comments/${commentId}`,
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
