let books = [];
const addButton = document.querySelector('#add-book');
const bookList = document.querySelector('#books-list');

const displayBooks = (id, title, author) => {
  const li = document.createElement('li');
  const br = document.createElement('br');
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';

  li.innerHTML = `
      <p>${title}</p>
      <p>${author}</p>
      <br>
      <div class="hr"></div>
    `;
  li.insertBefore(removeButton, li.lastElementChild);
  li.appendChild(br);
  bookList.appendChild(li);

  removeButton.addEventListener('click', () => {
    books = books.filter((book) => {
      if (book.id !== id) {
        return true;
      }
      return false;
    });
    localStorage.setItem('books', JSON.stringify(books));
    li.remove();
  });
};

const ErrorMsg = (error) => {
  document.querySelector('.error-msg').innerHTML = error;
  setTimeout(() => {
    document.querySelector('.error-msg').innerHTML = '';
  }, 2000);
};

const addBooks = (title, author) => {
  const id = Date.now();
  const object = { id, title, author };
  if (title === '' || author === '') {
    ErrorMsg('Kindly fill the fields');
  } else {
    books.push(object);
    localStorage.setItem('books', JSON.stringify(books));
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    displayBooks(object.id, object.title, object.author);
  }
};

const getBookFromStorage = JSON.parse(localStorage.getItem('books'));
if (getBookFromStorage) {
  books = getBookFromStorage;
}

books.forEach((book) => {
  displayBooks(book.id, book.title, book.author);
});

document.addEventListener('DOMContentLoaded', () => {
  addButton.addEventListener('click', (n) => {
    n.preventDefault();
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    addBooks(title, author);
  });
});