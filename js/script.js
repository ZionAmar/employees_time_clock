let raw_data=[];
console.log("הדף עובד");
function CreateTble(){
    let str="";
    for(let line of raw_data){
        str+="<tr>";
        str+=`<td><button class="btn" onclick="editLine(${line.id})">עדכן</button></td>`;
        str+=`<td>${line.id}</td>`;
        str+=`<td>${line.fullName}</td>`;
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
    let lastName = document.getElementById("lastName").value;
    let response = await fetch('/emp/Add',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({firstName:firstName,lastName:lastName})
        }
    );
    let data = await response.json();
    console.log(data);
    getList();
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
getList();
updateTime();
setInterval(updateTime, 1000);