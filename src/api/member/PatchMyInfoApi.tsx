import UnauthorizedError from "@/config/UnauthorizedError";
import { PatchMyInfoApiRequest } from "@/type/GiveMemberType";
import axios from "axios";

export default async function PatchMyInfoApi(
  dto: PatchMyInfoApiRequest
): Promise<void> {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/members/self`,
      dto,
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
