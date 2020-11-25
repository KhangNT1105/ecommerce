import { CommentValue } from 'stores/CommentStore/commentStore.d';

export interface CommentFormProps {
  avatar: string;
  username: string;
  handleComment: (content: string) => void;
}
export interface CommentProps {
  defaultComments?: CommentValue[];
  handleSubmit: (values: PostCommentValues) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}
export interface AccumulatorCommentProps {
  comments: CommentValue[];
  replyComments: CommentValue[];
}
export interface ListCommentsProps {
  comments: CommentValue[];
  replyComments: CommentValue[];
  handleReplyComment: (values: PostCommentValues) => void;
  handleDelete: (id: string) => Promise<void>;
  userId: string;
  username: string;
}
export interface PostCommentValues {
  content: string;
  replyTo?: string;
}
