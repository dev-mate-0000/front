export type CommentType = {
  id: string;
  review: string;
  editable: boolean;
  reviewerInfo: CommentMemberInfo;
  memberInfo: CommentMemberInfo;
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
