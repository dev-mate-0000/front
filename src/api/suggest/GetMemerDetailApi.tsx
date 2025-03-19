import { MemberDetailType } from "@/type/MemberType";
import axios from "axios";

export default async function GetMemerDetailApi(id: number): Promise<MemberDetailType> {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/members/${id}`,
        { withCredentials: true }
    );
    return response.data;
}