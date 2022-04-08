import { ReactAccederContext } from './ReactAcceder.context';

const ReactAcceder = ({ children, permissions }) => {
  return (
    <ReactAccederContext.Provider value={permissions}>
      {children}
    </ReactAccederContext.Provider>
  );
};

export default ReactAcceder;
