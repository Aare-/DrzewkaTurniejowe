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
                    file: `./app/templates/tree_viewer/index.html`
                }
            }
        }]);

    next();
};

exports.register.attributes = {
    name: 'tree_viewer',
    once: true
};
