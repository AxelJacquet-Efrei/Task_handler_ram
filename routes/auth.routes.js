module.exports = function(app) {
    app.get('/auth/example', example);

    app.get('/auth/example/return', example, (req, res) => {
    
    });

    app.get('/login', (req, res) => {
        res.redirect('/auth/example');
    });

    app.get('/logout', (req, res) => {
        req.logout();
        req.session.destroy(function (err) {
            res.redirect('/');
        });
    });
}
