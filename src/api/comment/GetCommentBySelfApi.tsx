import { CommentType } from "@/type/GetCommentType";
import axios from "axios";

export default async function GetCommentBySelf(): Promise<CommentType[]> {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/members/comments/self`,
    { withCredentials: true }
  );
  return response.data;
}
