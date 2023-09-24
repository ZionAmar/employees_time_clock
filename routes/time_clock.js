const express = require('express');
const router = express.Router();
module.exports = router;

router.get("/", (req, res) => {
    res.render("time_clock_page", {pageTitle: "time_clock"});
});
router.post("/Add", (req, res) => {
    let {name,entry_time,exit_time}=req.body;
    let Query="INSERT INTO time_clock";
    Query +="(name,entry_time,exit_time)";
    Query +="VALUES";
    Query +=`('${name}','${entry_time}','${exit_time}')`
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
    let q = `SELECT * FROM \`time_clock\``;
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
    let q = `DELETE FROM \`time_clock\` WHERE id = '${id}'`;
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
    let entry_time = req.body.entry_time;
    let exit_time = req.body.exit_time;
    let q = `UPDATE \`time_clock\` SET \`name\` = '${name}',\`entry_time\` = '${entry_time}',\`exit_time\` = '${exit_time}' WHERE id =${id}`;
    db_pool.query(q, function (err, rows, fields) {

        if (err) {
            res.status(500).json({message: err})
        } else {
            res.status(200).json({message: "OK"});
        }

    });
});
