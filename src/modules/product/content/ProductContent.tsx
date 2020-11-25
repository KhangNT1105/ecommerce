import Comment from 'components/comment/Comment';
import Tabs from 'components/tabs/Tabs';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ProductLocationParams } from '../ProductWrapper.d';
import useComment from 'stores/CommentStore/commentStore';
import { SubmitCommentValues } from 'stores/CommentStore/commentStore.d';
import './ProductContent.scss';
import ProductSpecification from './tabs/ProductSpecification';
import { PostCommentValues } from 'components/comment/Comment.d';

const ProductContent: React.FC = () => {
  const { t } = useTranslation();
  const { id }: ProductLocationParams = useParams();
  const [commentState, commentActions] = useComment();
  const handleSubmit = async (commentValues: PostCommentValues) => {
    const values: SubmitCommentValues = {
      ...commentValues,
      product: id
    };
    await commentActions.postComment(values);
  };
  const handleDelete = async (id: string) => {
    await commentActions.deleteComment(id);
  };
  useEffect(() => {
    if (commentState.comment) {
      commentActions.getComments({ sort: 'updated_at,DESC', product: id });
    }
    // eslint-disable-next-line
  }, [commentState.comment]);

  const tabs = {
    active: 'specification',
    items: [
      {
        name: 'specification',
        textKey: <div>{t('THONG_SO_KY_THUAT')}</div>,
        component: <ProductSpecification />
      },
      {
        name: 'comment',
        textKey: <div>{t('BINH_LUAN')}</div>,
        component: (
          <div className="py-3">
            <Comment
              handleDelete={handleDelete}
              handleSubmit={handleSubmit}
              defaultComments={commentState.listComment}
            />
          </div>
        )
      }
    ]
  };
  return (
    <div className="productContent">
      <div className="container">
        <Tabs {...tabs} />
      </div>
    </div>
  );
};
export default ProductContent;
