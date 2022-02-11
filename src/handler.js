import {nanoid} from 'nanoid';
import books from './books';
import response from './response';

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    return response.badRequest(h, 'Gagal menambahkan buku. Mohon isi nama buku');
  }

  if (readPage > pageCount) {
    return response.badRequest(h, 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount');
  }

  const id = nanoid(16);
  const finished = false;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((item) => item.id === id).length > 0;

  if (isSuccess) {
    return response.created(h, 'Buku berhasil ditambahkan', {
      bookId: id,
    });
  }

  return response.serverError(h, 'Buku gagal ditambahkan');
};

export {
  addBookHandler,
};
