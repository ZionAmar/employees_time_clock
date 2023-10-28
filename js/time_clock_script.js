let raw_data=[];
console.log(raw_data);
function inputView(){
    const numericInput = document.getElementById("employee-input");
    numericInput.addEventListener("input", function() {
        this.value = this.value.replace(/\D/g, ''); // מסנן רק מספרים
    });
    numericInput.addEventListener("focus", function() {
        this.type = "password";
    });
}

function EmpList(x){
    let i = 0;
    for(let line of raw_data) {
        if (line.EmployeeID == x) {
            i++;
        }
    }
        return i > 0;

}
function signing(x){
    for(let line of raw_data) {
        if (line.EmployeeID == x) {
            document.getElementById("employee-name").textContent = `${line.FullName}`;
            document.getElementById("employee-image").src = `${line.ImageURL}`; // הוסף את כתובת קובץ התמונה
        }
    }
}
async function getList() {
    let response = await fetch('/timeClock/List');
    let data = await response.json();
    raw_data = data.rows;
    console.log(raw_data);
}
async function AddNewLine() {
    let id = document.getElementById("employee-input").value;
    let response = await fetch('/timeClock/Add',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({id:id})
        }
    );
    let data = await response.json();
    console.log(data);
}
async function editLine() {
    let objToServer={};
    objToServer.id=document.getElementById("employee-input").value;
    let response = await fetch('/timeClock/Update', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objToServer)
        }
    );
}


function updateTime() {
    document.getElementById("title").innerHTML="שעון נוכחות";
    document.querySelector(".signature-image").src="photos/my_clock.png";
    const timestampElement = document.getElementById("timestamp");
    const datestampElement = document.getElementById("datestamp");
    const now = new Date();
    timestampElement.innerHTML =`שעה: ${now.toLocaleTimeString()}`;
    datestampElement.textContent =` תאריך: ${now.toLocaleDateString()}`;
}

function recordEntry() {
    const employeeInput = document.getElementById("employee-input");
    const selectedEmployee = employeeInput.value;
    const employeeDetails = document.getElementById("employee-details");
    const entryMessage = document.getElementById("entry-message");
    console.log(EmpList(selectedEmployee));
    if (selectedEmployee && EmpList(selectedEmployee)) {
        AddNewLine();
        signing(selectedEmployee);
        employeeDetails.style.display = "block";
        entryMessage.textContent = "החתימה בוצעה בהצלחה.";
        setTimeout(function () {
            employeeDetails.style.display = "none";
            entryMessage.textContent = "";
            employeeInput.value = "";
            employeeInput.type = "text";
        }, 3000);
    }
    else {
        alert("אנא הכנס מספר עובד תקין");
    }
}
function recordExit() {
    const employeeInput = document.getElementById("employee-input");
    const selectedEmployee = employeeInput.value;
    const employeeDetails = document.getElementById("employee-details");
    const entryMessage = document.getElementById("entry-message");

    if (selectedEmployee && EmpList(selectedEmployee)) {
        editLine();
        signing(selectedEmployee);
        employeeDetails.style.display = "block";
        entryMessage.textContent = "יציאה בוצעה בהצלחה.";
        setTimeout(function () {
            employeeDetails.style.display = "none";
            entryMessage.textContent = "";
            employeeInput.value = "";
        }, 3000);
    } else {
        alert("אנא הכנס מספר עובד תקין");
    }
}
function queryEmployee() {
    // שימוש בכתובת דף אחר לפי המספר שנמצא באינפוט
    const employeeInput = document.getElementById("employee-input");
    const selectedEmployee = employeeInput.value;
    if (EmpList(selectedEmployee) && selectedEmployee) {
        window.location.href = `${window.location.origin}/empData?id=${selectedEmployee}`;
        // alert("hhh");
    } else {
        alert("אנא הכנס מספר עובד תקין");
    }
}
updateTime();
setInterval(updateTime, 1000);
inputView();
getList();