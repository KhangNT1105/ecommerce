import React, { useEffect } from 'react';
import { Media } from 'reactstrap';
import { ToastContainer, TypeOptions, ToastPosition, toast, ToastContent, ToastOptions } from 'react-toastify';

import { TOAST_TYPE, POSITION } from '../../constants/enum';
import { classConcat } from '../../utils/common';
import i18n from 'i18n/i18n';

type Props = {
  type?: TypeOptions;
  message: string;
  position?: ToastPosition;
  duration?: number | false;
  handleClose?: () => void;
};

const Toast: React.FC<Props> = (props) => {
  // props
  const { type, duration, message, handleClose } = props;
  const position = props.position || POSITION.TOP_CENTER;

  const content: ToastContent = getContentToast(message, type);

  // states

  // on change type
  useEffect(() => {
    switch (type) {
      case TOAST_TYPE.ERROR:
        toast.error(content, { onClose: handleClose });
        break;
      case TOAST_TYPE.SUCCESS:
        toast.success(content, { onClose: handleClose });
        break;
      default:
        toast(content, { onClose: handleClose });
    }
  }, [type, content, handleClose]);

  return <ToastContainer position={position} autoClose={duration} draggable={false} hideProgressBar={true} />;
};

export const getIcon = (type?: string) => {
  let icon = 'fa-question';
  switch (type) {
    case TOAST_TYPE.ERROR:
      icon = 'fa-close';
      break;
    case TOAST_TYPE.SUCCESS:
      icon = 'fa-check';
      break;
  }
  return icon;
};
export const getTitle = (type?: string) => {
  let title = i18n.t('ATTENTION!');
  switch (type) {
    case TOAST_TYPE.ERROR:
      title = i18n.t('ERROR!');
      break;
    case TOAST_TYPE.SUCCESS:
      title = i18n.t('SUCCESS!');
      break;
    default:
      break;
  }
  return title;
};

export const getContentToast = (message: string, type?: TypeOptions) => ({
  closeToast
}: {
  closeToast: () => void;
}) => {
  return (
    <Media>
      <Media middle={true} left={true} className="mr-3">
        <i className={classConcat(['fa fa-fw fa-2x', `${getIcon(type)}`])} onClick={closeToast} />
      </Media>
      <Media body={true}>
        <Media heading={true} tag="h6">
          {getTitle(type)}
        </Media>
        <p>{message}</p>
      </Media>
    </Media>
  );
};

export const notify = {
  error: (message: string, options?: ToastOptions) => {
    return toast.error(getContentToast(message, TOAST_TYPE.ERROR), options);
  },
  success: (message: string, options?: ToastOptions) => {
    return toast.success(getContentToast(message, TOAST_TYPE.SUCCESS), options);
  }
};

export default Toast;
