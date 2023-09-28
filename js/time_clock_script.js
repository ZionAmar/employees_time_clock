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
}// async function editLine(id) {
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