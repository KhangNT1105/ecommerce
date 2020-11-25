import React from 'react';
import { storiesOf } from '@storybook/react';

import CopyToClipboard from './CopyToClipboard';

const content = 'test';

storiesOf('CopyToClipboard', module).add('default', () => (
  <>
    <span id={'edit-licensors-id'} className="mt-2">
      {content}
    </span>
    <CopyToClipboard elementId={'edit-licensors-id'} />
  </>
));
