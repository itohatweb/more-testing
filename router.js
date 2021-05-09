module.exports = (app) => {
    // '/'
    app.use('/', require('./routes/index'));

    // '/api'
    app.use('/api', require('./routes/api'));
}