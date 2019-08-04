const movieController = function () {
    const getUserMovies = function (context) {
        helper.addHeaderInfo(context);
       
        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
        }).then(function () {
            this.partial('../views/movie/userMovies.hbs');
        });
    };

    const getCinemaMovies = function (context) {
        helper.addHeaderInfo(context);

        requester.get('movies?query={}&sort={}', 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((movies) => {
                context.movies = movies;

                context.loadPartials({
                    header: '../views/common/header.hbs',
                    footer: '../views/common/footer.hbs',
                    singleMovie: '../views/movie/singleCinemaMovie.hbs',
                }).then(function () {
                    this.partial('../views/movie/cinemaMovies.hbs');
                });
            });
    };

    const getDetailsMovie = function (context) {
        helper.addHeaderInfo(context);

        requester.get('movies/${}')

        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
        }).then(function () {
            this.partial('../views/movie/detailsMovie.hbs');
        });
    }

    const getAddMovies = function (context) {
        helper.addHeaderInfo(context);

        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
        }).then(function () {
            this.partial('../views/movie/addMovie.hbs');
        });
    };

    const postAddMovie = function (context) {
        const payload = { ...context.params };

        requester.post('movies', 'appdata', 'Kinvey', payload)
            .then(helper.handler)
            .then(() => {
                context.redirect('#/home');
            });
    };

    return {
        getUserMovies,
        getCinemaMovies,
        getDetailsMovie,
        getAddMovies,
        postAddMovie,
    }
}();
