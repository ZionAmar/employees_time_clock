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
    recordEntry();
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
    recordExit();
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
    const employeeSelect = document.getElementById("employeeName");
    const selectedEmployee =
        employeeSelect.options[employeeSelect.selectedIndex];
    const employeeDetails = document.getElementById("employee-details");
    const entryMessage = document.getElementById("entry-message");
    const employeeImage = document.getElementById("employee-image");

    // נבדוק אם נבחר עובד מהרשימה
    if (selectedEmployee) {
        // נציג את פרטי העובד והודעת כניסה
        employeeDetails.style.display = "block";
        employeeImage.src = "employee_image.jpg";
        const employeeId = document.getElementById("employee-id");
        const employeeName = document.getElementById("employee-name");
        const employeeRole = document.getElementById("employee-role");

        employeeId.textContent = "תעודת זהות: " + selectedEmployee.value;
        employeeName.textContent = "שם: " + selectedEmployee.text;
        employeeRole.textContent = "תפקיד: מנהל משאבי אנוש";
        entryMessage.textContent = "החתימה בוצעה בהצלחה.";

        // הצגת הפרטים למשך 4 שניות
        setTimeout(function () {
            employeeDetails.style.display = "none";
        }, 4000);
    } else {
        alert("יש לבחור עובד מהרשימה");
    }
}
function recordExit() {
    const employeeSelect = document.getElementById("employeeName");
    const selectedEmployee =
        employeeSelect.options[employeeSelect.selectedIndex];
    const employeeDetails = document.getElementById("employee-details");
    const entryMessage = document.getElementById("entry-message");
    const employeeImage = document.getElementById("employee-image");

    // נבדוק אם נבחר עובד מהרשימה
    if (selectedEmployee) {
        // נציג את פרטי העובד והודעת יציאה
        employeeDetails.style.display = "block";
        employeeImage.src = "employee_image.jpg";
        const employeeId = document.getElementById("employee-id");
        const employeeName = document.getElementById("employee-name");
        const employeeRole = document.getElementById("employee-role");

        employeeId.textContent = "תעודת זהות: " + selectedEmployee.value;
        employeeName.textContent = "שם: " + selectedEmployee.text;
        employeeRole.textContent = "תפקיד: מנהל משאבי אנוש";
        entryMessage.textContent = "החתימה בוצעה בהצלחה.";

        // הצגת הפרטים למשך 4 שניות
        setTimeout(function () {
            employeeDetails.style.display = "none";
        }, 4000);
    } else {
        alert("יש לבחור עובד מהרשימה");
    }
}
updateTime();
setInterval(updateTime, 1000);