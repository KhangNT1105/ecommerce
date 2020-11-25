import { storiesOf } from '@storybook/react';
import React from 'react';
import { Row, Col } from 'reactstrap';

import Tabs from './Tabs';

const defaultProps = {
  active: 'media',
  items: [
    {
      name: 'show_information',
      textKey: <Row>Row (reactstrap) Component</Row>,
      component: (
        <>
          <h1>SHOW INFORMATION</h1>
        </>
      )
    },
    {
      name: 'media',
      textKey: <div>Media Div</div>,
      component: (
        <>
          <h2>MEDIA</h2>
        </>
      )
    },
    {
      name: 'clip_playlists',
      textKey: 'CLIP_PLAYLISTS',
      component: (
        <>
          <h3>CLIP PLAYLISTS</h3>
        </>
      )
    },
    {
      name: 'setting',
      textKey: 'SETTING',
      component: (
        <>
          <h4>SETTING</h4>
        </>
      )
    },
    {
      name: 'summary',
      textKey: 'SUMMARY',
      component: <Col>Col (reactstrap) Component</Col>
    }
  ]
};

storiesOf('Tabs', module).add('default', () => <Tabs {...defaultProps} />);
