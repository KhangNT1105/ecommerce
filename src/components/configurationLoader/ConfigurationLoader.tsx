import React, { useEffect } from 'react';

import useConfiguration from './../../stores/ConfigurationStore/configuration';

const ConfigurationLoader: React.FC = () => {
  const [, actions] = useConfiguration();
  useEffect(() => {
    actions.fetchConfiguration();
    actions.fetchCountries();
    actions.fetchGenres();
    // eslint-disable-next-line
  }, []);
  return <></>;
};

export default ConfigurationLoader;
