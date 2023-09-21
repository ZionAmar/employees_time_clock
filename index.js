const bodyParser = require('body-parser');
const path = require("path");
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine","ejs");
var db_M = require('./database');
const express = require("express");
global.db_pool = db_M.pool;
const port = 5454;
app.use(express.json());
app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port http://localhost:${port}`);
});
//הפניות בראוטר
const emp =require('./routes/employees');
app.use('/C',emp);