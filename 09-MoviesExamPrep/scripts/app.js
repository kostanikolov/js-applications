const app = Sammy('#container', function () {
    this.use('Handlebars', 'hbs');

    // Home
    this.get('#/home', homeController.getHome);

    // User
    this.get('#/register', userController.getRegister);
    this.get('#/login', userController.getLogin);
    this.get('#/logout', userController.logout);

    this.post('#/register', userController.postRegister);
    this.post('#/login', userController.postLogin);

    // Movies
    this.get('#/userMovies', movieController.getUserMovies);
    this.get('#/cinemaMovies', movieController.getCinemaMovies);
    this.get('#/addMovies', movieController.getAddMovies);

    this.post('#/addMovie', movieController.postAddMovie);
});

(() => {
    app.run('#/home');
})();
