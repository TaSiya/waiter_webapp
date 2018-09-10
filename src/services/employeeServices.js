module.exports = function (pool) {
    async function allEmployees () {
        let result = await pool.query('select * from employee_table');
        return result.rows;
    }
    async function selectEmployee (name) {
        let result = await pool.query('select * from employee_table where employee = $1', [name]);
        return result.rows;
    }
    return {
        allEmployees,
        selectEmployee
    }
}