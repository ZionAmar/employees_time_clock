const express = require('express');
const router = express.Router();
module.exports = router;

router.get("/", (req, res) => {
    res.render("mainPage", {pageTitle: "Employees"});
});
router.post("/Add", (req, res) => {
    let name = req.body.name;
    let q = `INSERT INTO \`employees\` (\`name\`) VALUES ('${name}')`;

    db_pool.query(q, function (err, rows, fields) {

        if (err) {
            res.status(500).json({message: err})
        } else {
            res.status(200).json({message: "OK"});
        }

    });
});
router.get("/List", (req, res) => {
    let q = `SELECT * FROM \`employees\``;
    db_pool.query(q, function (err, rows, fields) {
        if (err) {
            res.status(500).json({message: err})
        } else {
            res.status(200).json({rows: rows});
        }
    });
});
router.delete("/Delete/:id", (req, res) => {
    let id = req.params.id;
    let q = `DELETE FROM \`employees\` WHERE id = '${id}'`;
    db_pool.query(q, function (err, rows, fields) {
        if (err) {
            res.status(500).json({message: err})
        } else {
            res.status(200).json({message: `row'${id}'deleted!`});
        }
    });
});
router.patch("/Update", (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let q = `UPDATE \`employees\` SET \`name\` = '${name}' WHERE id =${id}`;
    db_pool.query(q, function (err, rows, fields) {

        if (err) {
            res.status(500).json({message: err})
        } else {
            res.status(200).json({message: "OK"});
        }

    });
});
