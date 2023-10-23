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

    // שאילתת SELECT כדי לקבל את השם וה-ImageURL מטבלת העובדים
    let selectQuery = `SELECT CONCAT(FirstName, ' ', LastName) AS name, ImageURL FROM employees WHERE EmployeeID = ${id}`;

    db_pool.query(selectQuery, (error, results, fields) => {
        if (error) {
            res.status(500).json({ message: error });
        } else {
            // שם העובד מהתוצאה שקיבלנו
            let name = results[0].name;
            // ImageURL מהתוצאה שקיבלנו
            let imageURL = results[0].ImageURL;

            // שאילתת INSERT לטבלת הזמנים כוללת גם את ה-ImageURL
            let insertQuery = `INSERT INTO time_clock (name, date, entry_time, ImageURL) VALUES ('${name}', '${date}', '${entry_time}', '${imageURL}')`;

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
    let q = `SELECT EmployeeID, CONCAT(FirstName, ' ', LastName) AS FullName, ImageURL FROM employees`;
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

    // שאילתת SELECT כדי לקבל את השם וה-ImageURL מטבלת העובדים
    let selectQuery = `SELECT CONCAT(FirstName, ' ', LastName) AS name, ImageURL FROM employees WHERE EmployeeID = ${id}`;

    db_pool.query(selectQuery, (error, results, fields) => {
        if (error) {
            res.status(500).json({ message: error });
        } else {
            // שם העובד מהתוצאה שקיבלנו
            let name = results[0].name;
            // ImageURL מהתוצאה שקיבלנו
            let imageURL = results[0].ImageURL;

            // שאילתת UPDATE לטבלת הזמנים
            let updateQuery = "UPDATE time_clock";
            updateQuery += ` SET exit_time = '${exit_time}',`;
            updateQuery += ` ImageURL = '${imageURL}',`;
            updateQuery += " total = TIMEDIFF(exit_time, entry_time)";
            updateQuery += ` WHERE name = '${name}' AND date = '${date}' AND entry_time IS NOT NULL`;

            console.log(updateQuery);
            db_pool.query(updateQuery, (error, results, fields) => {
                if (error) {
                    res.status(500).json({ message: error });
                } else {
                    res.status(200).json({ message: "OK" });
                }
            });
        }
    });
});
