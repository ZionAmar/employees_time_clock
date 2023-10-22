const express = require('express');
const router = express.Router();
module.exports = router;
// const multer = require('multer');
// const {extname} = require("path"); // הרשות של השרת להעלות קבצים
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'photos/'); // התיקייה שבה ישמרו התמונות
//     },
//     filename: (req, file, cb) => {
//         let firstName = req.body.firstName;
//         let lastName = req.body.lastName;
//
//         // שמירת שם הקובץ על פי השם של העובד בלבד
//         let imageFileName = `${firstName}_${lastName}`;
//
//         // נוסיף את הסיומת המקורית של הקובץ לשם הקובץ
//         imageFileName += extname(file.originalname);
//
//         cb(null, imageFileName);
//     },
// });
//
//
// const upload = multer({ storage: storage });
router.get("/", (req, res) => {
    res.render("mainPage", {pageTitle: "Employees"});
});
// router.post('/Add', upload.single('image'), (req, res) => {
//     let firstName = req.body.firstName;
//     let lastName = req.body.lastName;
//     // בדיקה אם יש עובד כבר עם השמות האלו
//     let q = `SELECT * FROM employees WHERE FirstName = '${firstName}' AND LastName = '${lastName}'`;
//     db_pool.query(q, [firstName, lastName], function (err, rows, fields) {
//         if (err) {
//             res.status(500).json({message: err});
//         } else {
//             if (rows.length > 0) {
//                 res.status(400).json({message: 'עובד כבר קיים'});
//             } else {
//                 let imageFile = req.file; // הקובץ שהועלה
//                 let imageUrl = '/photos/' + imageFile.filename;
//
//                 let q = `INSERT INTO \`employees\` (\`FirstName\`,\`LastName\`,\`ImageURL\`) VALUES ('${firstName}','${lastName}','${imageUrl}')`;
//
//                 db_pool.query(q, function (err, rows, fields) {
//
//                     if (err) {
//                         res.status(500).json({message: err});
//                     } else {
//                         res.status(200).json({message: "OK"});
//                     }
//
//                 });
//             }
//         }
//     });
// });

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
router.delete("/Delete/:id", (req, res) => {
    let id = req.params.id;
    let q = `DELETE FROM \`employees\` WHERE EmployeeID = '${id}'`;
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
        q+= ` SET FirstName = '${firstName}', LastName = '${lastName}'`;
        q+= ` WHERE EmployeeID = '${id}'`;

    console.log(q);
    db_pool.query(q, function (err, rows, fields) {
        if (err) {
            res.status(500).json({message: err})
        } else {
            res.status(200).json({message: "OK"});
        }

    });
});
