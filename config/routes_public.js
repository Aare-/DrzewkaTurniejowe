module.exports =
    [
        {
        method : 'GET',
        path : '/img/{path*}',
        handler : { directory : { path: './assets/img', listing: false, index: false } }
        },
        {
        method : 'GET',
        path : '/css/{path*}',
        handler : { directory : { path: './assets/css', listing: false, index: false } }
        },
        {
        method : 'GET',
        path : '/scripts/{path*}',
        handler : { directory : { path: './assets/scripts', listing: false, index: false } }
        },
        {
        method : 'GET',
        path : '/angular/{path*}',
        handler : { directory : { path: './angular-quickstart', listing: false, index: false } }
        },
        {
        method : 'GET',
        path : '/node_modules/{path*}',
        handler : { directory : { path: './node_modules', listing: false, index: false } }
        }

    ];
