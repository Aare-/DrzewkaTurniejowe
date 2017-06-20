/**
 * Hapi Plugin Index
 */

exports.register = (server, options, next) => {

    server.route([
        {
            method: 'GET',
            path: '/',
            config: {
                handler: {
                    file: `./app/templates/main_page/index.html`
                }
            }
        }]);

    next();
};

exports.register.attributes = {
    name: 'main_page',
    once: true
};
