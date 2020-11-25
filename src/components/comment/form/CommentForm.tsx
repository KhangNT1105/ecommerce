import React, { ChangeEvent, useState } from 'react';
import './CommentForm.scss';
import { CommentFormProps } from '../Comment.d';
import { Button, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
const CommentForm: React.FC<CommentFormProps> = ({ username, handleComment, avatar }) => {
  const { t } = useTranslation();
  const [content, setContent] = useState<string>('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setContent(value);
  };
  const handleSubmit = (content: string) => {
    handleComment(content);
    setContent('');
  };
  return (
    <div className="commentForm">
      <div className="commentForm__avatar">
        <img src={avatar} alt="avatar" />
      </div>
      <div className="commentForm__form">
        <h5>{username}</h5>
        <Input
          value={content}
          placeholder={t('DANH_GIA_GI_DO_VE_SAN_PHAM')}
          type="textarea"
          onChange={handleChange}
          className="commentForm__textarea"
        />
        <div className="commentForm__submit">
          <Button className="button__animation" onClick={() => handleSubmit(content)}>
            {t('BINH_LUAN')}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CommentForm;
