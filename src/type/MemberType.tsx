export type MemberDetailType = {
    id: string,
    name: string,
    githubUrl: string,
    job: string,
    bio: string,
    languages: Language[]
}

export type Language = {
    language: string
}

export type GetMembersSuggestApiResponse = {
    id: string
    name: string
};

export type PatchMyInfoApiRequest = {
    job: string,
    bio: string
}