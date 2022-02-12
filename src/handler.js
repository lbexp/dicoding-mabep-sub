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
  const finished = pageCount === readPage ?? false;
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

const getAllBooksHandler = (request, h) => {
  const {
    name: qName,
    reading: qReading,
    finished: qFinished,
  } = request.query;

  let result = books;

  if (qName !== undefined) {
    result = result.filter((item) => (item.name).toLowerCase().includes(qName.toLowerCase()));
  }

  if (qReading !== undefined) {
    if (parseInt(qReading) === 1) {
      result = result.filter((item) => item.reading === true);
    } else {
      result = result.filter((item) => item.reading === false);
    }
  }

  if (qFinished !== undefined) {
    if (parseInt(qFinished) === 1) {
      result = result.filter((item) => item.finished === true);
    } else {
      result = result.filter((item) => item.finished === false);
    }
  }

  result = result.map(({
    id,
    name,
    publisher,
  }) => ({
    id,
    name,
    publisher,
  }));

  return {
    status: 'success',
    data: {
      books: result,
    },
  };
};

const getBookByIdHandler = (request, h) => {
  const {id} = request.params;

  const book = books.filter((item) => item.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  return response.notFound(h, 'Buku tidak ditemukan');
};

const editBookByIdHandler = (request, h) => {
  const {id} = request.params;
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

  const index = books.findIndex((item) => item.id === id);

  if (index === -1) {
    return response.notFound(h, 'Gagal memperbarui buku. Id tidak ditemukan');
  }

  if (!name) {
    return response.badRequest(h, 'Gagal memperbarui buku. Mohon isi nama buku');
  }

  if (readPage > pageCount) {
    return response.badRequest(h, 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount');
  }

  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  };

  return {
    status: 'success',
    message: 'Buku berhasil diperbarui',
  };
};

const deleteBookByIdHandler = (request, h) => {
  const {id} = request.params;

  const index = books.findIndex((item) => item.id === id);

  if (index === -1) {
    return response.notFound(h, 'Buku gagal dihapus. Id tidak ditemukan');
  }

  books.splice(index, 1);

  return {
    status: 'success',
    message: 'Buku berhasil dihapus',
  };
};

export {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
