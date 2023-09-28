const express = require('express');
const router = express.Router();
module.exports = router;

router.get("/", (req, res) => {
    res.render("time_clock_page", {pageTitle: "time_clock"});
});
router.post("/Add", (req, res) => {
    let {name} = req.body;
    let now = new Date();
    const date = now.toISOString().slice(0, 10); // משיג תאריך בפורמט "YYYY-MM-DD"
    let entry_time = now.toLocaleTimeString();
    let Query = "INSERT INTO time_clock";
    Query += " (name, date, entry_time)";
    Query += " VALUES (";
    entry_time = entry_time ? `'${entry_time}'` : 'NULL';
    Query += ` '${name}', '${date}', ${entry_time})`;
    console.log("adding task",Query);
    db_pool.query(Query, function (err, rows, fields) {

        if (err) {
            res.status(500).json({message: err})
        } else {
            res.status(200).json({message: "OK"});
        }
    });
});
router.get("/List", (req, res) => {
    let q = `SELECT id, CONCAT(firstName, ' ', lastName) AS fullName FROM employees`;
    db_pool.query(q, function (err, rows, fields) {
        if (err) {
            res.status(500).json({message: err})
        } else {
            res.status(200).json({rows: rows});
        }
    });
});
router.patch("/Update", (req, res) => {
    let {name} = req.body;
    let now = new Date();
    const date = now.toISOString().slice(0, 10); // משיג תאריך בפורמט "YYYY-MM-DD"
    let exit_time = now.toLocaleTimeString();
    let Query = "UPDATE time_clock SET exit_time";
    Query += `= '${exit_time}'`;
    Query += " WHERE name";
    Query += `= '${name}'`;
    Query += " AND date";
    Query += `= '${date}'`;
    Query += " AND entry_time";
    Query += " IS NOT NULL";
    console.log("adding task",Query);
    db_pool.query(Query, function (err, rows, fields) {

        if (err) {
            res.status(500).json({message: err})
        } else {
            res.status(200).json({message: "OK"});
        }

    });
});
