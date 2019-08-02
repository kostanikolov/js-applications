const userController = function () {

    const getRegister = function (context) {
        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
        }).then(function () {
            this.partial('../views/user/register.hbs');
        });
    };

    const getLogin = function (context) {
        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
        }).then(function () {
            this.partial('../views/user/login.hbs');
        });
    };

    const postRegister = function (context) {
        const payload = {
            username: context.params.username,
            password: context.params.password,
        }

        requester.post('', 'user', 'Basic', payload)
            .then(helper.handler)
            .then((data) => {
                sessionStorage.setItem('username', data.username);
                sessionStorage.setItem('authtoken', data._kmd.authtoken);

                context.redirect('#/home');
            });
    };

    const postLogin = function (context) {
        const payload = {
            username: context.params.username,
            password: context.params.password,
        }

        requester.post('login', 'user', 'Basic', payload)
            .then(helper.handler)
            .then((data) => {
                sessionStorage.setItem('username', data.username);
                sessionStorage.setItem('authtoken', data._kmd.authtoken);

                context.redirect('#/home');
            });
    };

    const logout = function (context) {
        requester.post('_logout', 'user', 'Kinvey')
            .then(helper.handler)
            .then(() => {
                sessionStorage.clear();
                context.redirect('#/home');
            });
    };

    return {
        getRegister,
        postRegister,

        getLogin,
        postLogin,

        logout,
    }
}();
