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
        }
    ];