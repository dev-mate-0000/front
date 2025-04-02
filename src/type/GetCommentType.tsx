export type CommentType = {
  id: string;
  review: string;

  createdAt: Date;
  updatedAt: Date;

  reviewerInfo: CommentMemberInfo;
  memberInfo: CommentMemberInfo;
  
  editable: boolean;
};

type CommentMemberInfo = {
  id: string;
  name: string;
};

export type PostCommentType = {
    review: string;
}

export type PatchCommentType = {
    review: string;
}
