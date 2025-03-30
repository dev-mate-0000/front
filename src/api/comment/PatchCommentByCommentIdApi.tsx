import { PostCommentType } from "@/type/GetCommentType";
import axios from "axios";

export default async function PatchCommentByCommentId(
  commentId: string,
  dto: PostCommentType
): Promise<void> {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/members/comments/${commentId}`,
    dto,
    { withCredentials: true }
  );
  return response.data;
}
