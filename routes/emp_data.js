const express = require('express');
const router = express.Router();
module.exports = router;

router.get("/", (req, res) => {
    res.render("emp_data_page", {pageTitle: "data_page"});
});
router.patch("/Update", (req, res) => {

    let id = req.body.id;
    let name = req.body.name;

    let q =`SELECT *, DATE_FORMAT(date, '%Y-%m-%d') AS FormattedDate FROM \`time_clock\` WHERE \`name\` = '${name}'`
    db_pool.query(q, function (err, rows, fields) {

        if (err) {
            res.status(500).json({message: err})
        } else {
            res.status(200).json({rows: rows});
        }

    });
});
