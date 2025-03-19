import { MemberDetailType, PatchMyInfoApiRequest } from "@/type/MemberType";
import axios from "axios";

export default async function PatchMyInfoApi(dto: PatchMyInfoApiRequest): Promise<MemberDetailType> {
    const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/members/self`,
        dto,
        { withCredentials: true }
    );
    return response.data;
}