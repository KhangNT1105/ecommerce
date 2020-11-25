export interface CommentState {
  message: string;
  listComment: CommentValue[];
  comment?: CommentValue;
  initiated?: boolean;
  success: boolean;
  isLoading: boolean;
}
export interface CommentValue {
  _id: string;
  is_active?: boolean;
  is_deleted?: boolean;
  content: string;
  replyTo?: string;
  product: string;
  created_by?: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  updated_by?: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  created_at?: string;
  updated_at?: string;
  __v?: boolean;
}
export interface SubmitCommentValues {
  content: string;
  product: string;
  replyTo?: string;
}
