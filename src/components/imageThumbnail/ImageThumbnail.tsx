import React from 'react';

import { ValidateExtensionImgFromSrc } from 'utils/validation';
import { ImageThumbnailProps } from './ImageThumbnail.d';
import ACEXIS_LOGO from './../../assets/images/default-image.svg';

const ImageThumbnail: React.FC<ImageThumbnailProps> = ({ src, width = 'auto', height = 'auto', alt = '' }) => {
  const defaultImg = ACEXIS_LOGO;
  const isValidImg = ValidateExtensionImgFromSrc({
    src,
    acceptTypeFile: ''
  });
  const imageSrc = isValidImg ? src : defaultImg;

  return (
    <>
      <img src={imageSrc} alt={alt} width={width} height={height} />
    </>
  );
};

export default ImageThumbnail;
