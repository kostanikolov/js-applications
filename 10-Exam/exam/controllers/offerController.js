const offerController = function () {
    const getDashboard = function (context) {
        helper.addHeaderInfo(context);

        requester.get('offers', 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((offers) => {
                context.offers = offers;
                offers.forEach(offer => {
                    const currentUser = sessionStorage.getItem('userId');
                    const creator = offer._acl.creator;

                    if (currentUser === creator) {
                        offer.isCreator = true;
                    } else {
                        offer.isCreator = false;
                    }
                });
              
                context.loadPartials({
                    header: '../views/common/header.hbs',
                    footer: '../views/common/footer.hbs',
                }).then(function () {
                    this.partial('../views/offer/dashboard.hbs');
                });
            });
    }

    const getCreateOffer = function (context) {
        helper.addHeaderInfo(context);

        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
        }).then(function () {
            this.partial('../views/offer/create-offer.hbs');
        });
    }

    const getDetailsOffer = function (context) {
        helper.addHeaderInfo(context);

        const offerId = context.params.id;
        const endpoint = `offers/${offerId}`;

        requester.get(endpoint, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((offer) => {
                context.offer = offer;

                context.loadPartials({
                    header: '../views/common/header.hbs',
                    footer: '../views/common/footer.hbs',
                }).then(function () {
                    this.partial('../views/offer/product-details.hbs');
                });
            });
    }

    const getDeleteOffer = function (context) {
        helper.addHeaderInfo(context);

        const offerId = context.params.id;
        const endpoint = `offers/${offerId}`;

        requester.get(endpoint, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((offer) => {
                context.offer = offer;

                context.loadPartials({
                    header: '../views/common/header.hbs',
                    footer: '../views/common/footer.hbs',
                }).then(function () {
                    this.partial('../views/offer/delete-offer.hbs');
                });
            })
    }

    const getEditOffer = function (context) {
        helper.addHeaderInfo(context);

        const offerId = context.params.id;
        const endpoint = `offers/${offerId}`;

        requester.get(endpoint, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((offer) => {
                context.offer = offer;

                context.loadPartials({
                    header: '../views/common/header.hbs',
                    footer: '../views/common/footer.hbs',
                }).then(function () {
                    this.partial('../views/offer/edit-offer.hbs');
                });
            })
    }

    const postCreateOffer = function (context) {
        const product = context.params.product;
        const description = context.params.description;
        const price = context.params.price;
        const pictureUrl = context.params.pictureUrl;

        if (product === '' || description === '' || price === '' || pictureUrl === '') {
            context.redirect('#/createOffer');
            return;
        }

        const payload = { ...context.params };

        requester.post('offers', 'appdata', 'Kinvey', payload)
            .then(helper.handler)
            .then(() => context.redirect('#/dashboard'));
    }

    const postDeleteOffer = function (context) {
        const offerId = context.params.id;
        const endpoint = `offers/${offerId}`;
        
        requester.del(endpoint, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then(() => {
                context.redirect('#/dashboard');
            });
    }

    const postEditOffer = function (context) {
        const payload = { ...context.params };

        const offerId = context.params.id;
        const endpoint = `offers/${offerId}`;
        
        requester.put(endpoint, 'appdata', 'Kinvey', payload)
            .then(helper.handler)
            .then(() => {
                context.redirect('#/dashboard');
            });
    }

    return {
        getDashboard,
        getCreateOffer,
        getDetailsOffer,
        getDeleteOffer,
        getEditOffer,
        postCreateOffer,
        postDeleteOffer,
        postEditOffer
    }
}();
