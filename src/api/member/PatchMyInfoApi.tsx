import { PatchMyInfoApiRequest } from "@/type/GiveMemberType";
import axios from "axios";

export default async function PatchMyInfoApi(
  dto: PatchMyInfoApiRequest
): Promise<void> {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/members/self`,
    dto,
    { withCredentials: true }
  );
  return response.data;
}
