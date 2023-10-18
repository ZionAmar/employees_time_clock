const express = require('express');
const router = express.Router();
module.exports = router;

router.get("/", (req, res) => {
    res.render("emp_data_page", {pageTitle: "data_page"});
});
router.patch("/Update", (req, res) => {
    let { id } = req.body;
    // שאילתת SELECT כדי לקבל את השם מטבלת העובדים
    let selectQuery = `SELECT CONCAT(firstName, ' ', lastName) AS name FROM employees WHERE id = ${id}`;

    db_pool.query(selectQuery, (error, results, fields) => {
        if (error) {
            res.status(500).json({ message: error });
        } else {
            // שם העובד מהתוצאה שקיבלנו
            let name = results[0].name;

            // שאילתת INSERT לטבלת הזמנים
            let insertQuery =`SELECT *, DATE_FORMAT(date, '%Y-%m-%d') AS FormattedDate FROM \`time_clock\` WHERE \`name\` = '${name}'`

            db_pool.query(insertQuery, (error, rows, fields) => {
                if (error) {
                    res.status(500).json({ message: error });
                } else {
                    res.status(200).json({rows: rows});
                }
            });
        }
    });
});
// router.patch("/Update", (req, res) => {
//     let id = req.body.id;
//     let q =`SELECT *, DATE_FORMAT(date, '%Y-%m-%d') AS FormattedDate FROM \`time_clock\` WHERE \`id\` = '${id}'`
//     db_pool.query(q, function (err, rows, fields) {
//
//         if (err) {
//             res.status(500).json({message: err})
//         } else {
//             res.status(200).json({rows: rows});
//         }
//
//     });
// });
router.delete("/Delete/:id", (req, res) => {
    let id = req.params.id;
    let q = `DELETE FROM \`time_clock\` WHERE id = '${id}'`;
    db_pool.query(q, function (err, rows, fields) {
        if (err) {
            res.status(500).json({message: err})
        } else {
            res.status(200).json({message: `row'${id}'deleted!`});
        }
    });
});
