export enum JobType {
  BACKEND = "Backend Developer",
  FRONTEND = "Frontend Developer",
  FULLSTACK = "Fullstack Developer",
}

export enum ShowStatus {
  PUBLIC = "Public",
  PRIVATE = "Private",
}

export type MemberDetailType = {
  id: string;
  name: string;
  githubUrl: string;
  job: JobType;
  bio: string;
  languages: Language[];
};

export type MemberDetailSelfType = {
  id: string;
  name: string;
  githubUrl: string;
  job: JobType;
  bio: string;
  status: ShowStatus;
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
  job: JobType;
  bio: string;
  status: ShowStatus;
};
