let raw_data=[];
console.log("הדף עובד");
function CreateTble(){
    let str="";
    let EMPname = "";
    for(let line of raw_data){
        EMPname =`שלום ${line.name}`;
        str+="<tr>";
        str+=`<td>${line.name}</td>`;
        str+=`<td>${line.FormattedDate}</td>`;
        str+=`<td>${line.entry_time}</td>`;
        str+=`<td>${line.exit_time}</td>`;
        str+=`<td><button class="btn" onclick="deleteLine(${line.id})">מחק</button></td>`;
        str+="</tr>";
    }
    document.getElementById("mainTable").innerHTML= str;
    document.getElementById("empName").innerHTML= EMPname;
}
async function showList(x) {
    let objToServer={};
    objToServer.id=x;
    console.log(x);
    let response = await fetch('/empData/Update', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objToServer)
        }
    );
    if (response.ok) {
        let data = await response.json();
        raw_data = data.rows;
        console.log(raw_data);
    } else {
        console.error('Error');
    }
    CreateTble();
}
async function getEmpList() {
    let response = await fetch('/timeClock/List');
    let data = await response.json();
    raw_data = data.rows;
    console.log(raw_data);
    // selectEmp();
}

// function selectEmp(){
//     let empName="";
//     for(let line of raw_data){
//         empName+="<option>";
//         empName+= line.fullName;
//         empName+="</option>";
//     }
//     document.getElementById("employeeName").innerHTML= empName;
// }
async function deleteLine(id) {
    let response = await fetch(`/empData/Delete/${id}`,{
            method: 'DELETE',
        }
    );
    showList();
}
function updateTime() {
    document.getElementById("title").innerHTML="השעות שלי";
    const timestampElement = document.getElementById("timestamp");
    const datestampElement = document.getElementById("datestamp");
    const now = new Date();
    timestampElement.textContent = now.toLocaleTimeString();
    datestampElement.textContent = now.toLocaleDateString();
}
function getIDFromURL() {
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');

    console.log(id);
    return id;
}

console.log(getIDFromURL());
showList(getIDFromURL());
getEmpList();
updateTime();
setInterval(updateTime, 1000);