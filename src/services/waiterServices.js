module.exports = function (pool) {
    async function allEmployees () {
        let result = await pool.query('select * from waiters');
        return result.rows;
    }
    async function selectEmployee (name) {
        let result = await pool.query('select * from waiters where first_name = $1', [name]);
        return result.rows;
    }
    return {
        allEmployees,
        selectEmployee
    }
}