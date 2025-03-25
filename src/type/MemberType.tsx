export const JOBTYPE = {
  BACKEND: "Backend Developer",
  FRONTEND: "Frontend Developer",
  FULLSTACK: "Fullstack Developer",
}

export const SHOWSTATUS = {
  PUBLIC: "Public",
  PRIVATE: "Private",
}

export type MemberDetailType = {
  id: string;
  name: string;
  githubUrl: string;
  job: keyof typeof JOBTYPE;
  bio: string;
  languages: Language[];
};

export type MemberDetailSelfType = {
  id: string;
  name: string;
  githubUrl: string;
  job: keyof typeof JOBTYPE;
  bio: string;
  status: keyof typeof SHOWSTATUS;
  languages: Language[];
};

export type Language = {
  language: string;
};

export type GetMembersSuggestApiResponse = {
  id: string;
  name: string;
};

export type PatchMyInfoApiRequest = {
  job: keyof typeof JOBTYPE;
  bio: string;
  status: keyof typeof SHOWSTATUS;
};
