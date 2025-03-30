import axios from "axios";

export default async function DeleteCommentApi(commentId: string): Promise<void> {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/members/comments/${commentId}`,
    { withCredentials: true }
  );
  return response.data;
}