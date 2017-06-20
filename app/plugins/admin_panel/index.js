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
                    file: `./app/templates/admin_panel/index.html`
                }
            }
        }]);

  next();
};

exports.register.attributes = {
  name: 'admin_panel',
  once: true
};
