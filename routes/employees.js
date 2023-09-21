const express = require('express');
const router = express.Router();
module.exports = router;

router.get("/", (req, res) => {
    res.render("mainPage", {pageTitle: "categories"});
});
router.post("/Add", (req, res) => {
    let name = req.body.name;
    let q = `INSERT INTO \`categories\` (\`name\`) VALUES ('${name}')`;

    db_pool.query(q, function (err, rows, fields) {

        if (err) {
            res.status(500).json({message: err})
            // throw err;
        } else {
            res.status(200).json({message: "OK"});
            // res.status(200).json({message: "Added"});
            // res.status(200).json(req.crs_data_filtered);
        }

    });


    // res.send("good morning");
});
router.get("/List", (req, res) => {
    let q = `SELECT * FROM \`categories\``;
    db_pool.query(q, function (err, rows, fields) {
        if (err) {
            res.status(500).json({message: err})
            // throw err;
        } else {
            res.status(200).json({rows: rows});
            // res.status(200).json({message: "Added"});
            // res.status(200).json(req.crs_data_filtered);
        }
    });
});
router.delete("/Delete/:id", (req, res) => {
    let id = req.params.id;
    // let id = req.body.id;
    let q = `DELETE FROM \`categories\` WHERE id = '${id}'`;
    db_pool.query(q, function (err, rows, fields) {
        if (err) {
            res.status(500).json({message: err})
            // throw err;
        } else {
            res.status(200).json({message: `row'${id}'deleted!`});
            // res.status(200).json({message: "Added"});
            // res.status(200).json(req.crs_data_filtered);
        }
    });
});
router.patch("/Update", (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let q = `UPDATE \`categories\` SET \`name\` = '${name}' WHERE id =${id}`;
    db_pool.query(q, function (err, rows, fields) {

        if (err) {
            res.status(500).json({message: err})
            // throw err;
        } else {
            res.status(200).json({message: "OK"});
            // res.status(200).json({message: "Added"});
            // res.status(200).json(req.crs_data_filtered);
        }

    });


    // res.send("good morning");
});
