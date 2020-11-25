import React, { useEffect, useState } from 'react';
import { AccumulatorCommentProps, CommentProps } from './Comment.d';
import './Comment.scss';
import CommentForm from './form/CommentForm';
import defaultAvatar from 'assets/images/avatar.svg';
import { CommentValue } from 'stores/CommentStore/commentStore.d';
import ListComments from './list/ListComments';
import useAuthentication from 'stores/AuthenticationStore/authentication';
import { useTranslation } from 'react-i18next';

const Comment: React.FC<CommentProps> = ({ handleDelete, defaultComments, handleSubmit }) => {
  const { t } = useTranslation();
  const [authenticationState] = useAuthentication();
  const [comments, setComments] = useState<CommentValue[]>([]);
  const [replyComments, setReplyComments] = useState<CommentValue[]>([]);
  const username = `${authenticationState.user.firstName} ${authenticationState.user.lastName}`;
  const handleComment = async (content: string) => {
    await handleSubmit({
      content
    });
  };
  useEffect(() => {
    if (defaultComments) {
      const updatedComments = defaultComments.reduce(
        (accumulator: AccumulatorCommentProps, item: any, index: number) => {
          if (item && item.replyTo) {
            return {
              comments: [...accumulator.comments],
              replyComments: [...accumulator.replyComments, item]
            };
          }
          return {
            comments: [...accumulator.comments, item],
            replyComments: [...accumulator.replyComments]
          };
        },
        { comments: [], replyComments: [] }
      );
      setComments(updatedComments.comments);
      setReplyComments(updatedComments.replyComments);
    }
  }, [defaultComments]);
  return (
    <div className="comment">
      {authenticationState.loggedIn ? (
        <CommentForm username={username} handleComment={handleComment} avatar={defaultAvatar} />
      ) : (
        <div className="comment__unauthentication">
          <span>{t('UNAUTHENTICATION')}</span>
        </div>
      )}
      <ListComments
        handleDelete={handleDelete}
        username={username}
        comments={comments}
        userId={authenticationState.user.id}
        replyComments={replyComments}
        handleReplyComment={handleSubmit}
      />
    </div>
  );
};
export default Comment;
