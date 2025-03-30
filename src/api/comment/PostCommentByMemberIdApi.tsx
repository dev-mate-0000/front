import { PostCommentType } from "@/type/GetCommentType";
import axios from "axios";

export default async function PostCommentByMemberId(
  id: string,
  dto: PostCommentType
): Promise<void> {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/members/comments/${id}`,
    dto,
    { withCredentials: true }
  );
  return response.data;
}
