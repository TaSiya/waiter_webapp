const assert = require('assert');
const Client = require('../src/services/clientServices');
const Employee = require('../src/services/employeeServices');
const pg = require('pg');

const Pool = pg.Pool;
let useSSL = false;
let local = process.env.LOCAL || false;

if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/waiter_database';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});


describe('Waiter Web Application tests', function () {
    describe('Employee Side tests', function () {
        describe('select user by name', function () {
            it('select the admin', async function () {
                let employeeService = Employee(pool);
                let user = await employeeService.selectEmployee('admin');
                let admin = user[0].employee;
                assert.strictEqual(admin, 'admin');
            });
            it('select the employee Odwa', async function () {
                let employeeService = Employee(pool);
                let user = await employeeService.selectEmployee('Odwa');
                let odwa = user[0].employee;
                assert.strictEqual(odwa, 'Odwa');
            });
        });
        describe('check if the passcode is correct', function () {
            it('check admin password', async function () {
                let employeeService = Employee(pool);
                let code = await employeeService.selectEmployee('admin');
                let pass = code[0].passcode;
                assert.strictEqual(pass, 2018);
            })
            it('check Siyamanga\'s passcode', async function () {
                let employeeService = Employee(pool);
                let code = await employeeService.selectEmployee('Siyamanga');
                let pass = code[0].passcode;
                assert.strictEqual(pass, 1994);
            })
            it('check Siyanda\'s passcode', async function () {
                let employeeService = Employee(pool);
                let code = await employeeService.selectEmployee('Siyanda');
                let pass = code[0].passcode;
                assert.strictEqual(pass, 1994);
            })
        });
    });

    describe('Client side tests', function () {

    });

    after( function () {
        pool.end();
    })
});