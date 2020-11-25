import React, { useEffect, useState } from 'react';
import { CommentValue } from 'stores/CommentStore/commentStore.d';
import { ListCommentsProps } from '../Comment.d';
import './ListComments.scss';
import avatar from 'assets/images/avatar.svg';
import { useTranslation } from 'react-i18next';
import CommentForm from '../form/CommentForm';
import { BsTrash } from 'react-icons/bs';
import { Button } from 'reactstrap';
import ENUMS from 'constants/enum';
import useAuthentication from 'stores/AuthenticationStore/authentication';

const ListComments: React.FC<ListCommentsProps> = ({
  handleDelete,
  username,
  userId,
  replyComments,
  comments,
  handleReplyComment
}) => {
  const LIMIT_COMMENTS = 5;
  const [authenticationState] = useAuthentication();
  const [limitComments, setLimitComments] = useState(1);
  const [isShowAllReplyComments, setIsShowAllReplyComments] = useState(false);
  const [listComments, setListComments] = useState<CommentValue[]>([]);
  const [listReplyComments, setListReplyComments] = useState<CommentValue[]>([]);
  const [commentId, setCommentId] = useState<string>('');
  const { t } = useTranslation();
  const timeSince = (date: string) => {
    const remainDate = new Date().getTime() - new Date(date).getTime();

    const seconds = Math.floor(remainDate / 1000);

    let interval = seconds / ENUMS.SECONDS.YEAR;

    if (interval > 1) {
      return `${Math.floor(interval)} ${t('YEARS_AGO')}`;
    }
    interval = seconds / ENUMS.SECONDS.MONTH;
    if (interval > 1) {
      return `${Math.floor(interval)} ${t('MONTHS_AGO')}`;
    }
    interval = seconds / ENUMS.SECONDS.DAY;
    if (interval > 1) {
      return `${Math.floor(interval)} ${t('DAYS_AGO')}`;
    }
    interval = seconds / ENUMS.SECONDS.HOUR;
    if (interval > 1) {
      return `${Math.floor(interval)} ${t('HOURS_AGO')}`;
    }
    interval = seconds / ENUMS.SECONDS.MINUTE;
    if (interval > 1) {
      return `${Math.floor(interval)} ${t('MINUTES_AGO')}`;
    }
    return `${Math.floor(interval)} ${t('SECONDS_AGO')}`;
  };
  const handleClickSeeMoreComments = () => {
    setLimitComments((value) => {
      return value + 1;
    });
  };
  const handleClickShowMoreReplyComments = () => {
    setIsShowAllReplyComments(true);
  };
  const handleClickShowLessReplyComments = () => {
    setIsShowAllReplyComments(false);
  };
  const replyComment = (content: string) => {
    if (commentId) {
      handleReplyComment({
        content,
        replyTo: commentId
      });
    }
  };
  const handleClickReply = (id: string) => {
    setCommentId(id);
  };
  useEffect(() => {
    if (comments) {
      setListComments(comments);
    }
  }, [comments]);
  useEffect(() => {
    if (replyComments) {
      setListReplyComments(replyComments);
    }
  }, [replyComments]);
  const renderRepComments = (repComments: CommentValue[]) => {
    return repComments.slice(0, isShowAllReplyComments ? repComments.length : 1).map((item: CommentValue) => {
      const isUserComment = item.created_by?._id === userId;
      return (
        <div className="commentReplied" key={item._id}>
          <div className="commentReplied__avatar">
            <img src={avatar} alt="avatar" />
          </div>
          <div className="commentReplied__information">
            <div className="commentReplied__header">
              <h5>
                {`${item.updated_by?.firstName} ${item.updated_by?.lastName}`}
                <span>{timeSince(item?.updated_at || '')} </span>
              </h5>
              {isUserComment && (
                <div className="commentReplied__service">
                  <div className="deteleService" onClick={() => handleDelete(item._id)}>
                    {' '}
                    <BsTrash />{' '}
                  </div>
                </div>
              )}
            </div>
            <span className="commentReplied__content">{item.content} </span>
          </div>
        </div>
      );
    });
  };
  const renderListComments = () => {
    return listComments.slice(0, limitComments * LIMIT_COMMENTS).map((item: CommentValue, index: number) => {
      const isOpenCommentForm = item._id === commentId;
      const isUserComment = item.created_by?._id === userId;
      const repComments = listReplyComments.filter(
        (replyComment: CommentValue) => replyComment.replyTo && replyComment.replyTo === item._id
      );
      return (
        <div className="comment" key={item._id}>
          <div className="comment__content">
            <div className="comment__avatar">
              <img src={avatar} alt="avatar" />
            </div>
            <div className="comment__information">
              <div className="comment__header">
                <h5>
                  {`${item.updated_by?.firstName} ${item.updated_by?.lastName}`}
                  <span>{timeSince(item?.updated_at || '')} </span>
                </h5>
                {isUserComment && (
                  <div className="comment__service">
                    <div className="deleteService" onClick={() => handleDelete(item._id)}>
                      {' '}
                      <BsTrash />{' '}
                    </div>
                  </div>
                )}
              </div>
              <div className="comment__text">
                <span>{item.content}</span>
              </div>
              {authenticationState.loggedIn && (
                <span className="comment__reply" onClick={() => handleClickReply(item._id)}>
                  {t('TRA_LOI')}
                </span>
              )}
              {repComments.length > 0 && (
                <div className="comment__replied">
                  {repComments.length > 1 &&
                    (isShowAllReplyComments ? (
                      <div className="commentReplied__showLess" onClick={handleClickShowLessReplyComments}>
                        {t('RUT_GON')}
                      </div>
                    ) : (
                      <div className="commentReplied__showMore" onClick={handleClickShowMoreReplyComments}>
                        {`${t('XEM_THEM')} ${repComments.length - 1} ${t('BINH_LUAN').toLowerCase()}`}
                      </div>
                    ))}
                  {renderRepComments(repComments)}
                </div>
              )}
              {isOpenCommentForm && <CommentForm avatar={avatar} username={username} handleComment={replyComment} />}
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="listComments">
      {renderListComments()}
      {listComments.length > limitComments * LIMIT_COMMENTS && (
        <div className="listComments__showMore text-center">
          <Button onClick={handleClickSeeMoreComments} outline={true}>
            {t('HIEN_THI_THEM')}{' '}
          </Button>
        </div>
      )}
    </div>
  );
};
export default ListComments;
