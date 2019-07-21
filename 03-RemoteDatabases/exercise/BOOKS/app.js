const kinveyUsername = 'admin';
const kinveyPassword = 'admin';
const appKey = 'kid_rJwuNgyMS';
const appSecret = 'd6dbb827325a413baf32b3ebf80b2e74';

const baseUrl = `https://baas.kinvey.com/appdata/${appKey}/books`;

const elements = {
    btnSubmit: document.getElementById('submitBtn'),
    btnLoadBooks: document.getElementById('loadBooks'),
    btnCancelEdit: document.getElementById('cancelBtn'),
    btnDoneEdit: document.getElementById('editBtn'),

    inputTitle: document.getElementById('title'),
    inputAuthor: document.getElementById('author'),
    inputIsbn: document.getElementById('isbn'),

    tbodyBooks: document.querySelector('.tbodyBooks'),
    formHeader: document.getElementById('formHeader'),
}

elements.btnSubmit.addEventListener('click', addBook);
elements.btnLoadBooks.addEventListener('click', loadBooks);
elements.btnDoneEdit.addEventListener('click', editBook);
elements.btnCancelEdit.addEventListener('click', cancelEdit);

function addBook(event) {
    event.preventDefault();

    let title = elements.inputTitle.value;
    let author = elements.inputAuthor.value;
    let isbn = elements.inputIsbn.value;

    if (title && author && isbn) {
        const dataObject = {
            title,
            author,
            isbn,
        }

        const headers = {
            method: 'POST',
            body: JSON.stringify(dataObject),
            credentials: 'include',
            authorization: 'Basic ' + btoa(`${kinveyUsername}:${kinveyPassword}`),
            headers: {
                'Content-type': 'application/json',
            },
        };

        fetch(baseUrl, headers)
            .then(handler)
            .then(loadBooks)
            .catch((err) => console.log(err));
    }
}

function loadBooks() {
    const headers = {
        method: 'GET',
        credentials: 'include',
        authorization: 'Kinvey ' + localStorage.getItem('authToken'),
    }

    fetch(baseUrl, headers)
        .then(handler)
        .then((data) => {
            elements.tbodyBooks.innerHTML = '';

            data.forEach(book => {
                let trNextBook = document.createElement('tr');
                trNextBook.setAttribute('id', book._id);
                trNextBook.innerHTML = `
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td>
                        <button class="btnEdit" value="${book._id}">Edit</button>
                        <button class="btnDelete" value="${book._id}">Delete</button>
                    </td>`;

                trNextBook.querySelector('button.btnEdit')
                    .addEventListener('click', () => loadEditForm(book._id));

                trNextBook.querySelector('button.btnDelete')
                    .addEventListener('click', () => deleteBook(book._id));

                elements.tbodyBooks.appendChild(trNextBook);
            });
        })
        .catch((err) => console.log(err));
}

function editBook(event) {
    event.preventDefault();

    let bookId = event.target.value;
    event.target.value = '';

    const bookData = {
        'title': elements.inputTitle.value,
        'author': elements.inputAuthor.value,
        'isbn': elements.inputIsbn.value,
    };

    let editUrl = `${baseUrl}/${bookId}`;

    let headers = {
        method: 'PUT',
        body: JSON.stringify(bookData),
        credentials: 'include',
        authorization: 'Kinvey ' + localStorage.getItem('authToken'),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(editUrl, headers)
        .then(handler)
        .then(loadBooks)
        .catch((err) => console.log(err));

    fromEditToSubmitForm();
}

function deleteBook(bookId) {
    let deleteUrl = `${baseUrl}/${bookId}`;

    const headers = {
        method: 'DELETE',
        credentials: 'include',
        authorization: 'Kinvey ' + localStorage.getItem('authToken'),
        headers: {
            'Content-Type': 'application/json'
        },
    };

    fetch(deleteUrl, headers)
        .then(handler)
        .then(loadBooks)
        .catch((err) => console.log(err));
}

function cancelEdit(event) {
    event.preventDefault();
    fromEditToSubmitForm();
}

function loadEditForm(bookId) {
    let dataToEdit = document.getElementById(bookId)
        .querySelectorAll('td');

    elements.inputTitle.value = dataToEdit[0].textContent;
    elements.inputAuthor.value = dataToEdit[1].textContent;
    elements.inputIsbn.value = dataToEdit[2].textContent;

    elements.formHeader.textContent = 'EDIT BOOK';
    elements.btnSubmit.style.display = 'none';
    elements.btnDoneEdit.style.display = 'block';
    elements.btnCancelEdit.style.display = 'block';

    elements.btnDoneEdit.value = bookId;
}

function fromEditToSubmitForm() {
    clearElementValue(elements.inputAuthor, elements.inputTitle, elements.inputIsbn)
    elements.formHeader.textContent = 'FORM';

    elements.btnSubmit.style.display = 'block';
    elements.btnDoneEdit.style.display = 'none';
    elements.btnCancelEdit.style.display = 'none';
}

function clearElementValue(...args) {
    args.forEach(element => {
        element.value = '';
    });
}

function handler(response) {
    if (response.status >= 400) {
        throw new Error('Something went wrong!');
    }

    return response.json();
}
