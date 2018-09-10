module.exports = function (employee) {
    async function home (req, res, next) {
        try{

            res.render('employee')
        } catch (err) {
            next(err);
        }
    }
    async function getData (req, res, next) {
        try{

            res.render('logged');
        } catch (err) {
            next(err);
        }
    }
    return {
        home,
        getData
    }
}