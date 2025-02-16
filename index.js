'use strict';

const express = require('express');
const handleBars = require('express-handlebars');
const bodyParser = require('body-parser')
const flash = require('express-flash');
const session = require('express-session');
const ClientRoutes = require('./src/routes/clientRoutes');
const EmployeeRoutes = require('./src/routes/employeeRoutes');
const ClientServices = require('./src/services/clientServices');
const WaiterServices = require('./src/services/waiterServices');
const WeekdaysServices = require('./src/services/weekdaysServices');
const pg = require("pg");
const Pool = pg.Pool;

const app = express();

app.engine('handlebars', handleBars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(session({
    secret : "<add a secret string here>",
    resave: false,
    saveUninitialized: true
  }));
  // initialise the flash middleware
app.use(flash());

app.use(express.static('public'));

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/waiter_database';

const pool = new Pool({
    connectionString,
    ssl : useSSL
  });

const clientServices = ClientServices(pool);
const waiterServices = WaiterServices(pool);
const weekdays = WeekdaysServices(pool);
const clientRoutes = ClientRoutes(clientServices);
const employeeRoutes = EmployeeRoutes(waiterServices, weekdays);

function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', { error: err });
  }

app.get('/', clientRoutes.landing);
app.get('/client', clientRoutes.home);
app.get('/login', employeeRoutes.home);
app.post('/waiters/:username', employeeRoutes.getData);
app.get('/waiters/', employeeRoutes.displayDays);

app.use(errorHandler);

const PORT = process.env.PORT || 2018 ;
app.listen(PORT, function () {
    console.log('Starting port...'+PORT);
})