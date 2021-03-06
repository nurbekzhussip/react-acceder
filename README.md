# react-acceder

React Context driven role-based-access-control package

## Installing

Using npm:

```
npm i react-acceder
```

Using yarn:

```
yarn add react-acceder
```

## Quick Start

There are two ways to pass user permissions:

- pass permissions via ReactAccederProvider
- pass permissions via useAccess

**Pass permissions via ReactAccederProvider**

```js
import { ReactAccederProvider } from 'react-acceder';
import App from './App';

const userPermissions = {
  ADMIN: ['CREATE', 'EDIT']
};

ReactDOM.render(
  <React.StrictMode>
    <ReactAccederProvider permissions={userPermissions.ADMIN}>
      <App />
    </ReactAccederProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

function App() {
  const user = useAccess();

  console.log(user.can('CREATE')); // true
  console.log(user.can('EDIT')); // true
  console.log(user.can('DELETE')); // false

  return (
    <div>
      <h1>React app</h1>
    </div>
  );
}
```

**Pass permissions via useAccess**

```js
const userPermissions = {
  ADMIN: ['CREATE', 'EDIT']
};

function App() {
  const user = useAccess(userPermissions.ADMIN);

  console.log(user.can('CREATE')); // true
  console.log(user.can('EDIT')); // true
  console.log(user.can('DELETE')); // false

  return (
    <div>
      <h1>React app</h1>
    </div>
  );
}
```

## Examples

`.can(ACTION_NAME)`

```js
function App() {
  const user = useAccess(userPermissions.ADMIN);

  console.log(user.can('CREATE')); // true
  console.log(user.can('EDIT')); // true
  console.log(user.can('DELETE')); // false

  return (
    <div>
      <h1>React app</h1>
    </div>
  );
}
```

`.can(ACTION_NAME, ...rest)`\
This method also accepts several params. Checks all params if all condition is true then the method will return **true** else **false**

```js
function Post({ item }) {
  const user = useAccess();
  const userId = 1;

  console.log(user.can('CREATE', item.author_id === userId));

  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <div className="post">
      <h1 className="post__title">{item.title}</h1>
      <div className="post__content">{item.text}</div>

      <div className="post__actions">
        {user.can(
          'EDIT',
          item.author_id === userId,
          item.status !== 'published'
        ) && <button onClick={handleEdit}>Edit</button>}

        {user.can('DELETE', item.author_id === userId) && (
          <button onClick={handleDelete}>Delete Post</button>
        )}
      </div>
    </div>
  );
}
```

`.some(ACTION_NAME, ...rest)` works exactly the same as `.can(ACTION_NAME, ...rest)` The difference is that it returns true if at least one of the conditions is true (but the ACTION_NAME must be true).

```js
function App() {
  const user = useAccess();

  console.log(user.can('CREATE')); // true
  console.log(user.can('DELETE')); // false
  console.log(user.some('DELETE', true)); // true
  console.log(user.some('DELETE', false)); // false

  return (
    <div>
      <h1>React app</h1>
    </div>
  );
}
```
