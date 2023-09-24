let raw_data=[];
console.log("הדף עובד");
function CreateTble(){
    // let str="";
    // for(let line of raw_data){
    //     str+="<tr>";
    //     str+=`<td><button class="btn" onclick="editLine(${line.id})">עדכן</button></td>`;
    //     str+=`<td>${line.id}</td>`;
    //     str+=`<td>${line.name}</td>`;
    //     str+=`<td><button class="btn" onclick="deleteLine(${line.id})">מחק</button></td>`;
    //     str+="</tr>";
    // }
    // document.getElementById("mainTable").innerHTML=str;
    let empName="";
    for(let line of raw_data){
        empName+="<option>";
        empName+= line.name;
        empName+="</option>";
    }
    document.getElementById("employeeName").innerHTML=empName;

}
async function getList() {
    let response = await fetch('/t_c/List');
    let data = await response.json();
    raw_data = data.rows;
    console.log(raw_data);
    CreateTble();
}
async function AddNewLine() {
    let name = document.getElementById("employeeName").value;
    let response = await fetch('/t_c/Add',{
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
async function deleteLine(id) {
    let response = await fetch(`/t_c/Delete/${id}`,{
            method: 'DELETE',
        }
    );
    getList();
}
async function editLine(id) {
    let objToServer={};
    objToServer.id=id;
    objToServer.name=document.getElementById("name").value;
    let response = await fetch('/t_c/Update', {
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