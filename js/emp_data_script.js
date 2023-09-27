let raw_data=[];
console.log("הדף עובד");
function CreateTble(){
    let str="";
    for(let line of raw_data){
        str+="<tr>";
        str+=`<td>${line.name}</td>`;
        str+=`<td>${line.FormattedDate}</td>`;
        str+=`<td>${line.entry_time}</td>`;
        str+=`<td>${line.exit_time}</td>`;
        str+="</tr>";
    }
    document.getElementById("mainTable").innerHTML=str;
}
async function updateList(id) {
    let objToServer={};
    objToServer.id=id;
    objToServer.name=document.getElementById("employeeName").value;
    let response = await fetch('/empData/Update', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objToServer)
        }
    );
    if (response.ok) {
        let data = await response.json(); // קבל את הנתונים כ-JSON מהתגובה
        raw_data = data.rows;
        console.log(raw_data); // עשה משהו עם הנתונים שקיבלת
    } else {
        console.error('שגיאה בבקשה לשרת');
    }
    CreateTble();
}
async function getListEmp() {
    let response = await fetch('/timeClock/List');
    let data = await response.json();
    raw_data = data.rows;
    console.log(raw_data);
    selectEmp();
}

function selectEmp(){
    let empName="";
    for(let line of raw_data){
        empName+="<option>";
        empName+= line.fullName;
        empName+="</option>";
    }
    document.getElementById("employeeName").innerHTML=empName;
}
getListEmp();