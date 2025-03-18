import axios from "axios";
import { GetMembersSuggestApiResponse } from "./GetMembersSuggestType";

export default async function GetNextMembersSuggestApi(page: number): Promise<GetMembersSuggestApiResponse> {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/members/suggest/next?page=${page}`, {
        withCredentials: true,
    });
    return response.data;
}