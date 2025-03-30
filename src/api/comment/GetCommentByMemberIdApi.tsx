import { CommentType } from "@/type/GetCommentType";
import axios from "axios";

export default async function GetCommentByMemberId(
  id: string
): Promise<CommentType[]> {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/members/comments/${id}`,
    { withCredentials: true }
  );
  return response.data;
}
