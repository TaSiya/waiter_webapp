module.exports = function (employee) {
    async function home (req, res, next) {
        try{

            res.render('employee')
        } catch (err) {
            next(err);
        }
    }
    return {
        home
    }
}