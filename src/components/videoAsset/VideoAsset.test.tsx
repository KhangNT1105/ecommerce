import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import VideoAsset from './VideoAsset';

describe('Video Asset Block', () => {
  test('renders correctly', () => {
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

    const wrapper = shallow(
      <VideoAsset
        inputProps={inputProps}
        buttonProps={buttonProps}
        titleChildren={titleChildren}
        videoProps={videoProps}
      />
    );

    expect(wrapper.find('.video-asset-block').exists()).toEqual(true);
  });

  test('renders snapshot correctly', () => {
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

    const tree = renderer
      .create(
        <VideoAsset
          inputProps={inputProps}
          buttonProps={buttonProps}
          titleChildren={titleChildren}
          videoProps={videoProps}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
