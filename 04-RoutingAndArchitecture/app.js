const app = Sammy('#main', function () {
    this.use('Handlebars', 'hbs');

    const handleHome = () => {
        this.swap('<h2>Home Page</h2>');
    };

    const handleAbout = () => {
        this.swap('<h2>About Page</h2>');
    };

    const handleContact = () => {
        this.swap('<h2>Contact Page</h2>');
    };

    const handleBook = (context) => {
        const books = [
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
        const bookId = parseInt(context.params.bookId);
        const book = books.find(book => book.id === bookId);

        context.book = book;
        context.partial('book-info.hbs');
    };

    const getLogin = () => {
        this.swap(`
            <form method="POST" action="#/login">
                <label for="user-email">Email:</label>
                <input type="email" id="user-email" name="email" />

                <label for="user-password">Password:</label>
                <input type="password" id="user-password" name="password" />

                <button type="submit">Login</button>
            </form>
        `);
    };

    const handleLogin = ({ params }) => {
        const { email, password } = params;

        this.swap(`
            <div>You have been hacked! Your email and password are: ${email}; ${password}</div>
        `)
    };

    this.get('/index.html', handleHome);
    this.get('#/about', handleAbout);
    this.get('#/contact', handleContact);

    this.get('#/books/:bookId', handleBook);
    this.get('#/login', getLogin);
    this.post('#/login', handleLogin);
});

$(() => app.run());
