const express = require('express');
const multer = require("multer");
const router = express.Router();
module.exports = router;


router.get("/", (req, res) => {
    res.render("mainPage", {pageTitle: "photos"});
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // ספריית היעד להכנסת התמונות
        cb(null, 'photos/')
    },
    filename: function (req, file, cb) {
        // שינוי שם הקובץ לשם ייחודי
        cb(null,file.originalname)
    }
});
const upload = multer({ storage: storage });

// המסלול הזה יאפשר לך להעלות קובץ תמונה מהלקוח
router.post('/upload', upload.single('image'), (req, res) => {
    res.send('התמונה הועלתה בהצלחה');
});