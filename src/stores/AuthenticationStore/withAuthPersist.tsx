import React, { FC, ComponentType, useState, useLayoutEffect } from 'react';

import databases from '../../cache';
import { AuthenticationContainer, storeKey, initialState as initialStoreState } from './authentication';

const withAuthPersist = <P extends object>(Component: ComponentType<P>): FC<P & any> => ({ ...props }: any) => {
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
    <AuthenticationContainer isGlobal={true} initialState={storePersisted}>
      <Component {...(props as P)} />
    </AuthenticationContainer>
  );
};

export default withAuthPersist;
