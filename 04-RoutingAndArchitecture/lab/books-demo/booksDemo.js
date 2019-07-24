let books = [
    {
        id: 1,
        title: 'Harry Potter',
        author: 'J.K. Rowling',
        releaseDate: 1995,
    },
    {
        id: 2,
        title: 'Lord of the Rings',
        author: 'J.R.R. Tolkien',
        releaseDate: 1954,
    }
]

const harryPotterTrigger = document.getElementById('harry-potter-trigger');
const lotrTrigger = document.getElementById('lotr-trigger');
const bookContent = document.getElementById('book-content');

function showBook(id) {
    const book = books.find(book => book.id === id);

    if (book) {
        bookContent.innerHTML = `
            <h1>Title: ${book.title}</h1>
            <h1>Title: ${book.author}</h1>
            <h1>Title: ${book.releaseDate}</h1>
        `;
    }
}

harryPotterTrigger.addEventListener('click', function () {
    const bookId = 1;

    history.pushState({ bookId }, '', `#/books/${bookId}`);
    showBook(bookId);
});

lotrTrigger.addEventListener('click', function () {
    const bookId = 2;

    history.pushState({ bookId }, '', `#/books/${bookId}`);
    showBook(bookId);
});

window.addEventListener('popstate', ({ state }) => {
    if (!state) {
        bookContent.innerHTML = `<h1>Try reading a book for change</h1>`;
    }

    const { bookId } = state;
    showBook(bookId);
});
