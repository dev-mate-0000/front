import { JOBTYPE, SHOWSTATUS } from "./MemberEnum";

export type PatchMyInfoApiRequest = {
  job: keyof typeof JOBTYPE;
  bio: string;
  status: keyof typeof SHOWSTATUS;
};
