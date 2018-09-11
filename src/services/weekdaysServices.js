module.exports = function (pool) {
    async function allDays () {
        let days = await pool.query('select * from weekdays');
        return days.rows;
    }
    async function selectDay (day) {
        let day = await pool.query('select * from weekdays where day = $1', [day]);
        return day.rows;
    }

    return {
        allDays,
        selectDay
    }
}