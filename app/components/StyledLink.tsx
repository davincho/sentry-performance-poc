import { ComponentProps } from 'react';

import { NavLink } from 'remix';

const StyledLink: React.FC<ComponentProps<typeof NavLink>> = props => {
  const { className, children, ...rest } = props;

  return (
    <NavLink
      {...rest}
      className={({ isActive }) =>
        (isActive
          ? 'border-b-2 border-blue-600'
          : 'border-b-2 border-white hover:border-blue-200') +
        ` ${className} p-2`
      }
    >
      {children}
    </NavLink>
  );
};

export default StyledLink;
