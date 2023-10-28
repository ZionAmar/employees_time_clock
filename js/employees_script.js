let raw_data=[];
console.log("הדף עובד");
function CreateTble(){
    let str="";
    for(let line of raw_data){
        str+="<tr>";
        str+=`<td><button class="btn" onclick="editLine(${line.EmployeeID})">הצג</button></td>`;
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
    var confirmation = window.confirm("האם אתה בטוח שברצונך להמשיך?");
    if (confirmation){
    let response = await fetch(`/emp/Delete/${id}`,{
            method: 'DELETE',
        }
    );}
    getList();
}
function updateTime() {
    document.getElementById("title").innerHTML="רשימת העובדים";
    document.getElementById("addEmp").src="/photos/add_emp.jpg";
    document.getElementById("timeClock").src="/photos/my_clock.png";
}
async function editLine(id) {
    window.location.href = `${window.location.origin}/emp/EmpCard?id=${id}`;
}

getList();
updateTime();
