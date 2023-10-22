const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require("path");
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine","ejs");
var db_M = require('./database');
global.db_pool = db_M.pool;
const port = 5656;
app.use(express.json());
app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
});
//הפניות בראוטר
const employees =require('./routes/employees');
app.use('/emp',employees);
const time_clock =require('./routes/time_clock');
app.use('/timeClock',time_clock);
const emp_data =require('./routes/emp_data');
app.use('/empData',emp_data);
const Add_Emp =require('./routes/Add_Employee');
app.use('/AddEmp',Add_Emp);
