import React from 'react';
import { Container } from 'reactstrap';

import LoggedInLayout from '../LoggedInLayout/LoggedInLayout';

const MiscPagesLayout: React.FC = ({ children }) => {
  return (
    <LoggedInLayout>
      <Container>{children}</Container>
    </LoggedInLayout>
  );
};

export default MiscPagesLayout;
