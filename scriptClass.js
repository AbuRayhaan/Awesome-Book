let books = JSON.parse(localStorage.getItem('books'));
const addButton = document.querySelector('#add-book');
const bookList = document.querySelector('#books-list');

/*  Error Message Declaration required before usage */
const ErrorMsg = (error) => {
  document.querySelector('.error-msg').innerHTML = error;
  setTimeout(() => {
    document.querySelector('.error-msg').innerHTML = '';
  }, 2000);
};

/*  Declaring the class first */
class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  addBooks() {
    const { id, title, author } = this;
    const object = { id, title, author };
    books = JSON.parse(localStorage.getItem('books'));
    if (title === '' || author === '') {
      ErrorMsg('Kindly fill the fields');
    } else if (books !== null) {
      books.push(object);
      localStorage.setItem('books', JSON.stringify(books));
      books = JSON.parse(localStorage.getItem('books'));
      document.getElementById('bookTitle').value = '';
      document.getElementById('bookAuthor').value = '';
    } else {
      books = [];
      books.push(object);
      localStorage.setItem('books', JSON.stringify(books));
      books = JSON.parse(localStorage.getItem('books'));
      document.getElementById('bookTitle').value = '';
      document.getElementById('bookAuthor').value = '';
    }
  }

  removeBook() {
    const { id } = this;
    books = books.filter((book) => {
      if (book.id !== id) {
        return true;
      }
      return false;
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

/*  DOM ELEMENTS  */
const displayBooks = (id, title, author) => {
  bookList.classList.add('booklist-border');
  const li = document.createElement('li');
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';

  li.innerHTML = `<div class= "book-info">
      <p>"${title}"</p>
      <span>by</span>
      <p>${author}</p>
      </div>
    `;
  li.appendChild(removeButton);
  bookList.appendChild(li);

  removeButton.addEventListener('click', () => {
    const book = new Book(id, title, author);
    id = removeButton.id;
    book.removeBook();
    if (li.nextElementSibling === null && li.previousElementSibling === null) {
      li.remove();
      bookList.classList.remove('booklist-border');
    } else {
      li.remove();
      bookList.classList.add('booklist-border');
    }
  });
};

if (bookList !== null) {
  bookList.classList.add('list-border');
} else {
  bookList.classList.remove('list-border');
}

document.addEventListener('DOMContentLoaded', () => {
  addButton.addEventListener('click', (n) => {
    n.preventDefault();
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const id = Date.now();
    const book = new Book(id, title, author);
    book.addBooks();
    if (title && author) {
      displayBooks(book.id, book.title, book.author);
    }
  });
});

if (books !== null) {
  books.forEach((book) => {
    displayBooks(book.id, book.title, book.author);
  });
}

/*  NAVIGATION-BAR  */
const date = document.getElementById('date');
const dateNow = new Date();
date.innerText = dateNow;

const listBooks = document.getElementById('listBooks');
const addBook = document.getElementById('addBook');
const contactUs = document.getElementById('contactInfo');

listBooks.addEventListener('click', () => {
  listBooks.classList.add('active');
  addBook.classList.remove('active');
  contactUs.classList.remove('active');
  document.getElementById('bookList-container').classList.remove('hide');
  document.getElementById('addBook-container').classList.add('hide');
  document.getElementById('contactUs-container').classList.add('hide');
});

addBook.addEventListener('click', () => {
  listBooks.classList.remove('active');
  addBook.classList.add('active');
  contactUs.classList.remove('active');
  document.getElementById('addBook-container').classList.remove('hide');
  document.getElementById('bookList-container').classList.add('hide');
  document.getElementById('contactUs-container').classList.add('hide');
});

contactUs.addEventListener('click', () => {
  listBooks.classList.remove('active');
  addBook.classList.remove('active');
  contactUs.classList.add('active');
  document.getElementById('contactUs-container').classList.remove('hide');
  document.getElementById('bookList-container').classList.add('hide');
  document.getElementById('addBook-container').classList.add('hide');
});
