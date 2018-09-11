module.exports = function (pool) {
    async function allEmployees () {
        let result = await pool.query('select * from waiters');
        return result.rows;
    }
    async function selectEmployee (name) {
        let result = await pool.query('select * from waiters where first_name = $1', [name]);
        return result.rows;
    }
    async function getPasscode(user) {
        let code = await pool.query('select * from waiters where first_name = $1', [user]);
        return code[0].passcode;
    }
    return {
        allEmployees,
        selectEmployee,
        getPasscode
    }
}