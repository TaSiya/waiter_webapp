module.exports = function (employeeService) {
    async function home (req, res, next) {
        try{
            let users = await employeeService.allEmployees();
            res.render('employee', {users})
        } catch (err) {
            next(err);
        }
    }
    async function getData (req, res, next) {
        try{
            let user = req.body.name_employee;
            let pass = parseInt(req.body.pass_code);
            console.log(pass);
            let userData = await employeeService.selectEmployee(user);
            if(user === 'admin' && pass === userData[0].passcode){
                res.render('days');
            }
            else if(user !== '' && pass === userData[0].passcode){
                res.render('logged');
            }
            else{
                req.flash('info', 'Please enter a valid username or passcode');
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