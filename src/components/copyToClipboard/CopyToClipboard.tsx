import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ICopyToClipboard } from './CopyToClipboard.d';

const CopyToClipboard: React.FC<ICopyToClipboard> = ({ elementId, buttonClassName = '', badgeClassName = '' }) => {
  const { t } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    setIsCopied(true);
    const range: any = document.createRange();
    range.selectNode(document.getElementById(elementId));
    window.getSelection()!.removeAllRanges(); // clear current selection
    window.getSelection()!.addRange(range); // to select text
    document.execCommand('copy');
    window.getSelection()!.removeAllRanges(); // to deselect
  };

  const renderComponent = () => {
    if (!isCopied) {
      return (
        <span className="mt-2 ml-2">
          <i
            className={`fa fa-fw fa-clipboard copy-clipboard ${buttonClassName}`}
            title={t('COPY_TO_CLIPBOARD')}
            onClick={handleCopyToClipboard}
          />
        </span>
      );
    }
    return <span className={`badge badge-pill badge-info mt-2 ml-2 ${badgeClassName}`}>{t('COPIED')}</span>;
  };

  return renderComponent();
};

export default CopyToClipboard;
