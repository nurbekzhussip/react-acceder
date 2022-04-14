import { useContext } from 'react';
import { ReactAccederContext } from './ReactAcceder.context';

export const useAccess = (hookPermissions: string[]) => {
  const context = useContext(ReactAccederContext);
  let permissions: string[];

  if (hookPermissions) {
    permissions = hookPermissions;
  } else if (context) {
    permissions = context;
  } else {
    throw new Error('ReactAcceder: undefined permissions');
  }

  const checkAction = (action: string) => {
    return permissions.includes(action);
  };

  const checkEvery = (options: boolean[]) => {
    return options.every(option => option);
  };

  const checkSome = (options: boolean[]) => {
    return options.some(option => option);
  };

  const can = (action: string, ...rest: boolean[]) => {
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

  const some = (action: string, ...rest: boolean[]) => {
    let hasActionAccess = true;
    let hasSomeAccess = false;

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
