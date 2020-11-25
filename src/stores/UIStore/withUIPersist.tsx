import React, { FC, ComponentType, useState, useLayoutEffect } from 'react';

import databases from '../../cache';
import { UIContainer, storeKey, initialState as initialStoreState } from './uiStore';

const withUIPersist = <P extends object>(Component: ComponentType<P>): FC<P & any> => ({ ...props }: any) => {
  const [storePersisted, setStorePersisted] = useState(initialStoreState);

  useLayoutEffect(() => {
    (async function getPersistData() {
      const data = await databases.getItem(storeKey);
      if (data) {
        setStorePersisted({
          ...data,
          initiated: true
        });
      } else {
        setStorePersisted({
          ...initialStoreState,
          initiated: true
        });
      }
    })();
  }, []);
  if (storePersisted && !storePersisted.initiated) return null;
  return (
    <UIContainer isGlobal={true} initialState={storePersisted}>
      <Component {...(props as P)} />
    </UIContainer>
  );
};

export default withUIPersist;
