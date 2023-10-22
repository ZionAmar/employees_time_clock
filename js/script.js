let raw_data=[];
console.log("הדף עובד");
function CreateTble(){
    let str="";
    for(let line of raw_data){
        str+="<tr>";
        str+=`<td><button class="btn" onclick="editLine(${line.EmployeeID})">עדכן</button></td>`;
        str+=`<td>${line.EmployeeID}</td>`;
        str+=`<td>${line.FullName}</td>`;
        str += `<td><img src="${line.ImageURL}" alt="${line.FullName}" width="30px" height="30px"></td>`;
        str+=`<td><button class="btn" onclick="deleteLine(${line.EmployeeID})">מחק</button></td>`;
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
    document.querySelector(".signature-image").src="photos/my_employees.png";
}


getList();
updateTime();
