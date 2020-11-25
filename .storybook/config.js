import { configure } from '@storybook/react';
import '../src/styles/fonts/fontello/font/fontello.svg';
import '../src/styles/styles.scss';
configure(require.context('../src', true, /\.stories\.tsx$/), module);
