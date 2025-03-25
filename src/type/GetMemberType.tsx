import { JOBTYPE, SHOWSTATUS } from "./MemberEnum";

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