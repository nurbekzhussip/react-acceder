import { ReactNode, FC } from 'react';
import { ReactAccederContext } from './ReactAcceder.context';

type PropTypes = {
  children: ReactNode;
  permissions: string[];
};

const ReactAcceder: FC<PropTypes> = ({ children, permissions }) => {
  return (
    <ReactAccederContext.Provider value={permissions}>
      {children}
    </ReactAccederContext.Provider>
  );
};

export default ReactAcceder;
