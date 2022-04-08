import { useContext } from 'react';
import { ReactAccederContext } from './ReactAcceder.context';

export const useAccess = (hookPermissions = []) => {
  const context = useContext(ReactAccederContext);
  let permissions;

  if (hookPermissions) {
    permissions = hookPermissions;
  } else if (context) {
    permissions = context;
  } else {
    throw new Error('ReactAcceder: undefined permissions');
  }

  const checkAction = action => {
    return permissions.includes(action);
  };

  const checkEvery = options => {
    return options.every(option => option);
  };

  const checkSome = options => {
    return options.some(option => option);
  };

  const can = (action, ...rest) => {
    let hasActionAccess = true;
    let hasSomeAccess = true;

    if (action) {
      hasActionAccess = checkAction(action);
    }

    if (rest.length) {
      hasSomeAccess = checkEvery(rest);
    }

    return hasActionAccess && hasSomeAccess;
  };

  const some = (action, ...rest) => {
    let hasActionAccess = true;
    let hasSomeAccess = true;

    if (action) {
      hasActionAccess = checkAction(action);
    }

    if (rest.length) {
      hasSomeAccess = checkSome(rest);
    }

    return hasActionAccess ?? hasSomeAccess;
  };

  return {
    can,
    some
  };
};
