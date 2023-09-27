let raw_data=[];
console.log("הדף עובד");
function CreateTble(){
    let empName="";
    for(let line of raw_data){
        empName+="<option>";
        empName+= line.fullName;
        empName+="</option>";
    }
    document.getElementById("employeeName").innerHTML=empName;

}
async function getList() {
    let response = await fetch('/timeClock/List');
    let data = await response.json();
    raw_data = data.rows;
    console.log(raw_data);
    CreateTble();
}
// async function AddNewLine() {
//     let name = document.getElementById("employeeName").value;
//     let date = document.getElementById("date").value;
//     let entry_time = document.getElementById("entry_time").value;
//     let exit_time = document.getElementById("exit_time").value;
//         if (!date){
//         alert("חייב להכניס תאריך");
//     }
//     else if (exit_time && exit_time <= entry_time){
//         alert("שעת היציאה אינו יכול להיות קטן או שווה לשעת הכניסה");
//     }
//     else {
//         let response = await fetch('/timeClock/Add', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({name: name, date: date, entry_time: entry_time, exit_time: exit_time})
//             }
//         );
//         let data = await response.json();
//         console.log(data);
//         getList();
//     }
// }
// let isEntrySent = false;
// async function AddNewLine() {
//     let name = document.getElementById("employeeName").value;
//     let date = document.getElementById("date").value;
//     let entry_time = document.getElementById("entry_time").value;
//     let exit_time = document.getElementById("exit_time").value;
//
//     if (!date) {
//         alert("חייב להכניס תאריך");
//     } else if (exit_time && exit_time <= entry_time) {
//         alert("שעת היציאה אינה יכולה להיות קטנה או שווה לשעת הכניסה");
//     }
//     else if(!isEntrySent || !entry_time ) {
//         let response = await fetch('/timeClock/Add', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({name: name, date: date, entry_time: entry_time, exit_time: exit_time})
//         });
//         let data = await response.json();
//         console.log(data);
//         getList();
//         isEntrySent = true;
//     }
//     else{
//         alert("כבר נכנסת היום לעבודה");
//     }
// }
// let isEntrySent = false;
// let entryData = {}; // משתנה לאחזור מידע על הכניסות שנשלחו לשרת
//
// async function AddNewLine() {
//     let name = document.getElementById("employeeName").value;
//     let date = document.getElementById("date").value;
//     let entry_time = document.getElementById("entry_time").value;
//     let exit_time = document.getElementById("exit_time").value;
//
//     if (!date) {
//         alert("חייב להכניס תאריך");
//     }else if (!exit_time && !entry_time) {
//         alert("הכנס שעה בבקשה");
//     } else if (exit_time && exit_time <= entry_time) {
//         alert("שעת היציאה אינה יכולה להיות קטנה או שווה לשעת הכניסה");
//     } else {
//         // בדוק האם יש כבר כניסה עבור אותו עובד באותו תאריך
//         const existingEntry = entryData[name + date];
//
//         if (existingEntry) {
//             alert("כבר הכנסת היום ערך לרשומה זו");
//         } else {
//             let response = await fetch('/timeClock/Add', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ name: name, date: date, entry_time: entry_time, exit_time: exit_time })
//             });
//
//             if (response.ok) {
//                 let data = await response.json();
//                 console.log(data);
//                 entryData[name + date] = data; // שמור את הנתונים במשתנה החיצוני
//                 isEntrySent = true;
//             } else {
//                 console.error('שגיאה בבקשה לשרת');
//             }
//         }
//     }
// }
let submittedEntries = []; // מערך לשמירת הרשומות שנשלחו

async function AddNewLine() {
    let name = document.getElementById("employeeName").value;
    let date = document.getElementById("date").value;
    let entry_time = document.getElementById("entry_time").value;
    let exit_time = document.getElementById("exit_time").value;

    // בדיקה שהתאריך מוזן
    if (!date) {
        alert("חייב להכניס תאריך");
    }
    // בדיקה ששעת הכניסה ושעת היציאה מוזנות בצורה תקינה
    else if (!entry_time && !exit_time) {
        alert("יש למלא שעת הכניסה או שעת יציאה");
    }
    // בדיקה ששעת היציאה גדולה משעת הכניסה (אם הן מוזנות)
    else if (entry_time && exit_time && exit_time <= entry_time) {
        alert("שעת היציאה אינה יכולה להיות קטנה או שווה לשעת הכניסה");
    }
    else {
        // יצירת אובייקט עם הנתונים
        const newEntry = { name, date, entry_time, exit_time };

        // בדיקה שהאובייקט לא כבר קיים במערך
        const isDuplicate = submittedEntries.some(entry => (
            entry.name === newEntry.name &&
            entry.date === newEntry.date &&
            entry.entry_time === newEntry.entry_time &&
            entry.exit_time === newEntry.exit_time
        ));

        if (isDuplicate) {
            alert("הנתונים כפולים - אותו עובד באותו תאריך ושעות");
        } else {
            // שליחת הנתונים לשרת
            let response = await fetch('/timeClock/Add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newEntry)
            });

            let data = await response.json();
            console.log(data);
            getList();

            // שמירת הרשומה הנוכחית כרשומה שנשלחה כבר
            submittedEntries.push(newEntry);
        }
    }
}

getList();