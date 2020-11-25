import React from 'react';
import { storiesOf } from '@storybook/react';
import ShowResults from './ShowResults';

storiesOf('Show Results', module).add('default', () => <ShowResults page={1} size={25} />);
