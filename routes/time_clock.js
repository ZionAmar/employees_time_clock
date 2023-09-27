const express = require('express');
const router = express.Router();
module.exports = router;

router.get("/", (req, res) => {
    res.render("time_clock_page", {pageTitle: "time_clock"});
});
router.post("/Add", (req, res) => {
    let { name, date, entry_time, exit_time } = req.body;
    let Query = "INSERT INTO time_clock";
    Query += " (name, date, entry_time, exit_time)";
    Query += " VALUES (";
    entry_time = entry_time ? `'${entry_time}'` : 'NULL';
    exit_time = exit_time ? `'${exit_time}'` : 'NULL';
    Query += ` '${name}', '${date}', ${entry_time}, ${exit_time})`;
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
