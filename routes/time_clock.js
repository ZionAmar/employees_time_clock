const express = require('express');
const router = express.Router();
module.exports = router;

router.get("/", (req, res) => {
    res.render("time_clock_page", {pageTitle: "time_clock"});
});
router.post("/Add", (req, res) => {
    let { id } = req.body;
    let now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;
    let entry_time = now.toLocaleTimeString();

    // שאילתת SELECT כדי לקבל את השם מטבלת העובדים
    let selectQuery = `SELECT CONCAT(firstName, ' ', lastName) AS name FROM employees WHERE id = ${id}`;

    db_pool.query(selectQuery, (error, results, fields) => {
        if (error) {
            res.status(500).json({ message: error });
        } else {
            // שם העובד מהתוצאה שקיבלנו
            let name = results[0].name;

            // שאילתת INSERT לטבלת הזמנים
            let insertQuery = `INSERT INTO time_clock (name, date, entry_time) VALUES ('${name}', '${date}', '${entry_time}')`;

            db_pool.query(insertQuery, (error, results, fields) => {
                if (error) {
                    res.status(500).json({ message: error });
                } else {
                    res.status(200).json({ message: "OK" });
                }
            });
        }
    });
});

router.get("/List", (req, res) => {
    let q = `SELECT id, CONCAT(firstName, ' ', lastName) AS name FROM employees`;
    db_pool.query(q, function (err, rows, fields) {
        if (err) {
            res.status(500).json({message: err})
        } else {
            res.status(200).json({rows: rows});
        }
    });
});
router.patch("/Update", (req, res) => {
    let { id } = req.body;
    let now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;
    let exit_time = now.toLocaleTimeString();

    // שאילתת SELECT כדי לקבל את השם מטבלת העובדים
    let selectQuery = `SELECT CONCAT(firstName, ' ', lastName) AS name FROM employees WHERE id = ${id}`;

    db_pool.query(selectQuery, (error, results, fields) => {
        if (error) {
            res.status(500).json({ message: error });
        } else {
            // שם העובד מהתוצאה שקיבלנו
            let name = results[0].name;

            // שאילתת INSERT לטבלת הזמנים
            let insertQuery = "UPDATE time_clock";
            insertQuery += " SET exit_time ";
            insertQuery += `= '${exit_time}'`;
            insertQuery += " , total ";
            insertQuery += `= TIMEDIFF(exit_time, entry_time)`;
            insertQuery += " WHERE name";
            insertQuery += `= '${name}'`;
            insertQuery += " AND date";
            insertQuery += `= '${date}'`;
            insertQuery += " AND entry_time";
            insertQuery += " IS NOT NULL";
            console.log(insertQuery);
            db_pool.query(insertQuery, (error, results, fields) => {
                if (error) {
                    res.status(500).json({ message: error });
                } else {
                    res.status(200).json({ message: "OK" });
                }
            });
        }
    });
});