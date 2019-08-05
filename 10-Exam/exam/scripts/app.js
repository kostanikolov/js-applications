const app = Sammy('#root', function () {
    this.use('Handlebars', 'hbs');

    // Home
    this.get('#/home', homeController.getHome);

    // User
    this.get('#/register', userController.getRegister);
    this.get('#/login', userController.getLogin);
    this.get('#/logout', userController.logout);
    this.get('#/profile', userController.getProfile);

    this.post('#/register', userController.postRegister);
    this.post('#/login', userController.postLogin);

    // Offer
    this.get('#/dashboard', offerController.getDashboard);
    this.get('#/createOffer', offerController.getCreateOffer);
    this.get('#/offerDetails/:id', offerController.getDetailsOffer);
    
    this.get('#/getDeleteOffer/:id', offerController.getDeleteOffer);
    this.get('#/postDeleteOffer/:id', offerController.postDeleteOffer);
    
    this.get('#/getEditOffer/:id', offerController.getEditOffer);
    this.post('#/postEditOffer/:id', offerController.postEditOffer);

    this.post('#/createOffer', offerController.postCreateOffer);
});

(() => {
    app.run('#/home');
})();
