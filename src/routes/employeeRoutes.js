module.exports = function (employeeService, weekdaysService) {
    async function home (req, res, next) {
        try{
            let users = await employeeService.allEmployees();
            res.render('login', {users})
        } catch (err) {
            next(err);
        }
    }
    async function getData (req, res, next) {
        try{
            let user = req.body.name_employee;
            let pass = parseInt(req.body.pass_code);
            console.log(pass);
            let username = await employeeService.selectEmployee(user);
            let userData = await weekdaysService.allDays();
            if(user === 'admin' && pass === username[0].passcode){
                res.render('adminPage', user);
            }
            else if(user !== '' && pass === username[0].passcode){
                res.render('employeePage', {userData, user});
            }
            else{
                req.flash('info', 'Please enter a valid username or passcode');
            }
            
        } catch (err) {
            next(err);
        }
    }
    async function displayDays (req, res, next) {
        try{
            
            res.redirect('/employeePage');
        } catch(err) {
            next(err);
        }
    }
    return {
        home,
        getData,
        displayDays
    }
}