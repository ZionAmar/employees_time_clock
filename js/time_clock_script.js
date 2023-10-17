let raw_data=[];
console.log(raw_data);
function CreateEmpList(){
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
    CreateEmpList();
}
async function AddNewLine() {
    let name = document.getElementById("employeeName").value;
    let response = await fetch('/timeClock/Add',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:name})
        }
    );
    let data = await response.json();
    console.log(data);
    getList();
}
async function editLine() {
    let objToServer={};
    objToServer.name=document.getElementById("employeeName").value;
    let response = await fetch('/timeClock/Update', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objToServer)
        }
    );
    getList();
}

getList();

function updateTime() {
    document.getElementById("title").innerHTML="שעון נוכחות";
    const timestampElement = document.getElementById("timestamp");
    const datestampElement = document.getElementById("datestamp");
    const now = new Date();
    timestampElement.textContent = now.toLocaleTimeString();
    datestampElement.textContent = now.toLocaleDateString();
}

function recordEntry() {
    const employeeInput = document.getElementById("employee-input");
    const selectedEmployee = employeeInput.value;
    const employeeDetails = document.getElementById("employee-details");
    const entryMessage = document.getElementById("entry-message");

    if (selectedEmployee) {
        AddNewLine();
        employeeDetails.style.display = "block";
        entryMessage.textContent = "החתימה בוצעה בהצלחה.";
        document.getElementById("employee-id").textContent = selectedEmployee;
        document.getElementById("employee-name").textContent = "גיל כהן";
        document.getElementById("employee-image").src = "employee_image.jpg"; // הוסף את כתובת קובץ התמונה
        setTimeout(function () {
            employeeDetails.style.display = "none";
            entryMessage.textContent = "";
            employeeInput.value = "";
        }, 4000);
    } else {
        alert("אנא הכנס מספר עובד");
    }
}
function recordExit() {
    const employeeInput = document.getElementById("employee-input");
    const selectedEmployee = employeeInput.value;
    const employeeDetails = document.getElementById("employee-details");
    const entryMessage = document.getElementById("entry-message");

    if (selectedEmployee) {
        editLine();
        employeeDetails.style.display = "block";
        entryMessage.textContent = "יציאה בוצעה בהצלחה.";
        document.getElementById("employee-id").textContent = selectedEmployee;
        document.getElementById("employee-name").textContent = "גיל כהן";
        document.getElementById("employee-image").src = "employee_image.jpg"; // הוסף את כתובת קובץ התמונה
        setTimeout(function () {
            employeeDetails.style.display = "none";
            entryMessage.textContent = "";
            employeeInput.value = "";
        }, 4000);
    } else {
        alert("אנא הכנס מספר עובד");
    }
}
function queryEmployee() {
    // שימוש בכתובת דף אחר לפי המספר שנמצא באינפוט
    const employeeInput = document.getElementById("employee-input");
    const selectedEmployee = employeeInput.value;
    if (selectedEmployee) {
        window.location.href = `http://localhost:5656/empData?id=${selectedEmployee}`;
    } else {
        alert("אנא הכנס מספר עובד");
    }
}
updateTime();
setInterval(updateTime, 1000);