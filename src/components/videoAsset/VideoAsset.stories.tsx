import React from 'react';
import { Row, Col } from 'reactstrap';
import { storiesOf } from '@storybook/react';
import withFormik from 'storybook-formik';

import VideoAsset from './VideoAsset';

const handleOnClick = (url: string) => {};

const inputProps = {
  name: 'video-url',
  placeholder: 'Enter URL here',
  inputType: 'text' as 'text'
};

const buttonProps = {
  children: 'Regenerate',
  color: 'success',
  btnType: 'button' as 'button',
  onClick: handleOnClick
};

const titleChildren = <span className="title">Asset 1 URL*:</span>;

const videoProps = {
  src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  width: '100%',
  height: '100%',
  videoTag: 'video' as 'video',
  titleVideo: 'Big Buck Bunny'
};

const videoPropsIframe = {
  src: 'https://www.youtube.com/embed/aqz-KE-bpKQ',
  width: '100%',
  height: '100%',
  videoTag: 'iframe' as 'iframe',
  titleVideo: 'Big Buck Bunny'
};

const videoPropsWithoutSrc = {
  width: '100%',
  height: '100%',
  videoTag: 'video' as 'video',
  titleVideo: ''
};

storiesOf('Video Asset', module)
  .addDecorator(withFormik)
  .add('default', () => {
    return (
      <div>
        <VideoAsset
          inputProps={inputProps}
          buttonProps={buttonProps}
          titleChildren={titleChildren}
          videoProps={videoProps}
        />
      </div>
    );
  })
  .add('Inside another wrapper', () => {
    return (
      <Row>
        <Col xs={4}>
          <VideoAsset
            inputProps={inputProps}
            buttonProps={buttonProps}
            titleChildren="Asset 1 URL*:"
            videoProps={videoProps}
          />
        </Col>

        <Col xs={4}>
          <VideoAsset
            inputProps={inputProps}
            buttonProps={buttonProps}
            titleChildren="Asset 1 URL*:"
            videoProps={videoPropsIframe}
          />
        </Col>

        <Col xs={4}>
          <VideoAsset
            inputProps={inputProps}
            buttonProps={buttonProps}
            titleChildren="Asset 1 URL*:"
            videoProps={videoPropsWithoutSrc}
          />
        </Col>
      </Row>
    );
  });
