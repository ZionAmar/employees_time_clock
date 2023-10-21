let raw_data=[];
console.log("הדף עובד");
function CreateTble(){
    let str="";
    for(let line of raw_data){
        str+="<tr>";
        str+=`<td><button class="btn" onclick="editLine(${line.id})">עדכן</button></td>`;
        str+=`<td>${line.id}</td>`;
        str+=`<td>${line.name}</td>`;
        str += `<td><img src="${line.imageUrl}" alt="${line.name}" width="30px" height="30px"></td>`;
        str+=`<td><button class="btn" onclick="deleteLine(${line.id})">מחק</button></td>`;
        str+="</tr>";
    }
    document.getElementById("mainTable").innerHTML=str;
}
async function getList() {
    let response = await fetch('/emp/List');
    let data = await response.json();
    raw_data = data.rows;
    console.log(raw_data);
    CreateTble();
}
async function AddNewLine() {
    let firstName = document.getElementById("firstName").value;
        firstName = firstName.replace(/[.,\/#!$%^&*;:{}=\-_\s`~()]/g, '');
    let lastName = document.getElementById("lastName").value;
        lastName = lastName.replace(/[.,\/#!$%^&*;:{}=\-_\s`~()]/g, '');
    let image = document.getElementById("image").files[0];

    if (!firstName || !lastName || !image) {
        alert("יש למלא את כל השדות");
        return;
    }

    let formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('image', image);


    // כאן אתה משתמש ב-try/catch עבור הבקשה fetch
    try {
        const response = await fetch('/emp/Add', {
            method: 'POST',
            body: formData
        });

        if (response.status === 200) {
            // הפונקציה תמשיך לכאן רק אם הבקשה הצליחה
            // אפשר להוסיף הודעת הצלחה או לרענן את העמוד
            // alert('עובד נוסף בהצלחה!');
            getList();
        } else if (response.status === 400) {
            // אם יש כבר עובד בשם זה
            alert('שם עובד כבר קיים');
        } else {
            // אם יש שגיאה אחרת מצד השרת
            console.error('שגיאה בהעלאת התמונה: ');
        }
    } catch (error) {
        console.error('שגיאה:', error);
    }
    clearInputs();
}

async function deleteLine(id) {
    let response = await fetch(`/emp/Delete/${id}`,{
            method: 'DELETE',
        }
    );
    getList();
}
async function editLine(id) {
    let objToServer={};
    objToServer.id=id;
    objToServer.firstName = document.getElementById("firstName").value;
    objToServer.lastName = document.getElementById("lastName").value;
    let response = await fetch('/emp/Update', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objToServer)
        }
    );
    getList();
}
function updateTime() {
    document.getElementById("title").innerHTML="רשימת העובדים";
    document.querySelector(".signature-image").src="https://www.liquidplanner.com/wp-content/uploads/2021/04/339hgg-1.png";
    const timestampElement = document.getElementById("timestamp");
    const datestampElement = document.getElementById("datestamp");
    const now = new Date();
    timestampElement.textContent = now.toLocaleTimeString();
    datestampElement.textContent = now.toLocaleDateString();
}
function clearInputs() {
    document.getElementById("firstName").value = '';
    document.getElementById("lastName").value = '';
    document.getElementById("image").value = ''; // או שנקה גם כאן, אם זה אפשרי בהקשר שלך
}

getList();
updateTime();
setInterval(updateTime, 1000);