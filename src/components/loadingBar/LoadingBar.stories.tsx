import React from 'react';
import LoadingBar from './LoadingBar';

export default { title: 'LoadingBar' };

export const defaultLoadingBar = () => <LoadingBar />;
export const withText = () => <LoadingBar>Uploading</LoadingBar>;
