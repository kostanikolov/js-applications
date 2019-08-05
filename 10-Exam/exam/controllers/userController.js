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

    const getProfile = function (context) {
        helper.addHeaderInfo(context);

        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
        }).then(function () {
            this.partial('../views/user/profile.hbs');
        });
    }

    const postRegister = function (context) {
        const username = context.params.username;
        const password = context.params.password;
        const rePassword = context.params.rePassword;

        if (username === '' || password === '' || rePassword === '') {
            context.redirect('#/register');
            return;
        } 

        if (!helper.passwordCheck(context.params)) {
            context.redirect('#/register');
            return;
        }

        const payload = {
            username: context.params.username,
            password: context.params.password,
        }

        requester.post('', 'user', 'Basic', payload)
            .then(helper.handler)
            .then((data) => {
                sessionStorage.setItem('userId', data._id);
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
                sessionStorage.setItem('userId', data._id);
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
        getProfile,
        logout,
    }
}();
