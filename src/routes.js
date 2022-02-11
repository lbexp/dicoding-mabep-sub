import {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
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
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler,
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
