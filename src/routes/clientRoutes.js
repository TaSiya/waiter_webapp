module.exports = function (client) {
    async function home (req, res) {
        try {

            res.render('index');
        } catch (err) {
            res.send(err.stack);
        }
    }
    return {
        home
    }
}