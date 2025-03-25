import axios from "axios";

export default async function DeleteMemberApi(): Promise<void> {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/members/self`,
    { withCredentials: true }
  );
  return response.data;
}
