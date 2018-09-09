module.exports = function (client) {
    async function landing (req, res) {
        try {

            res.render('index');
        } catch (err) {
            res.send(err.stack);
        }
    }
    async function home (req, res) {
        try {

            res.render('clients');
        } catch(err) {

        }
    }
    return {
        landing,
        home
    }
}