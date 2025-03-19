export type MemberDetailType = {
    id: number,
    name: string,
    githubUrl: string,
    job: string,
    bio: string,
    languages: Language[]
}

export type Language = {
    language: string
}