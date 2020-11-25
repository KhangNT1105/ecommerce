import React, { useState, useRef } from 'react';
import { Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import './VideoAsset.scss';
import Button from 'components/button/Button';

export type InputType = 'text' | undefined;
export type BtnType = 'button' | 'submit' | undefined;
export type VideoTag = 'video' | 'iframe';

interface inputProps {
  name: string;
  placeholder?: string;
  inputType?: InputType;
}

interface buttonProps {
  children: React.ReactNode;
  color?: string;
  btnType?: BtnType;
  onClick: (url: string) => void;
}

interface videoProps {
  src?: string;
  width?: string;
  height?: string;
  videoTag: VideoTag;
  titleVideo: string;
}

interface VideoAssetProps {
  inputProps: inputProps;
  buttonProps: buttonProps;
  titleChildren: React.ReactNode;
  videoProps: videoProps;
}

const VideoAsset: React.FC<VideoAssetProps> = ({ inputProps, buttonProps, titleChildren, videoProps }) => {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const { name, placeholder, inputType } = inputProps;
  const { children, color, btnType, onClick } = buttonProps;
  const { src, width, height, videoTag, titleVideo } = videoProps;
  const hasVideo = src ? true : false;
  const videoRef = useRef(null);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setUrl(value);
  };

  const handleOnClick = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Need to check url
    onClick(url);
  };

  return (
    <>
      <div className="video-asset-block">
        <div className="header" children={titleChildren} />
        <div className="content">
          <div className="content-header">
            <InputGroup>
              <Input name={name} placeholder={placeholder} type={inputType} onChange={handleChange} value={url} />
              <InputGroupAddon addonType="prepend">
                <Button children={children} color={color} type={btnType} onClick={handleOnClick} />
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="content-body">
            <div className="content-wrapper">
              {hasVideo ? (
                videoTag === 'iframe' ? (
                  <iframe src={src} width={width} height={height} title={titleVideo} ref={videoRef} />
                ) : (
                  <video
                    title={titleVideo}
                    width={width}
                    height={height}
                    controls={true}
                    autoPlay={true}
                    src={src}
                    ref={videoRef}
                  />
                )
              ) : (
                <span>{t('VIDEO_PREVIEW')}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoAsset;
