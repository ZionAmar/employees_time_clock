const express = require('express');
const router = express.Router();
module.exports = router;

router.get("/", (req, res) => {
    res.render("mainPage", {pageTitle: "Employees"});
});
router.post("/Add", (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let q = `INSERT INTO \`employees\` (\`firstName\`,\`lastName\`) VALUES ('${firstName}','${lastName}')`;

    db_pool.query(q, function (err, rows, fields) {

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
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let q = "UPDATE employees";
        q+= ` SET firstName = '${firstName}', lastName = '${lastName}'`;
        q+= ` WHERE id = '${id}'`;

    console.log(q);
    db_pool.query(q, function (err, rows, fields) {
        if (err) {
            res.status(500).json({message: err})
        } else {
            res.status(200).json({message: "OK"});
        }

    });
});
