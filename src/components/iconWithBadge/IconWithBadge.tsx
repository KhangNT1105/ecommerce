import React from 'react';
import { Badge } from 'reactstrap';
import { IconWithBadgeProps } from './IconWithBadge.d';

const IconWithBadge: React.FC<IconWithBadgeProps> = ({ badgeNumber, badgeBackground, children, className }) => {
  return (
    <div className={`icon-with-badge ${className}`}>
      {children}
      <Badge pill={true} className="icon-with-badge__badge" color={badgeBackground}>
        {badgeNumber}
      </Badge>
    </div>
  );
};

export default IconWithBadge;
