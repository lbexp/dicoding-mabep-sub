import {
  addBookHandler,
} from './handler';

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: () => null,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: () => null,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: () => null,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: () => null,
  },
];

export default routes;
