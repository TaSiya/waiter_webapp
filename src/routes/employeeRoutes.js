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
            let user = req.body.name_employee;
            console.log(user);
            if(user === 'admin'){
                res.render('days');
            }
            else {
                res.render('logged');
            }
            
        } catch (err) {
            next(err);
        }
    }
    return {
        home,
        getData
    }
}