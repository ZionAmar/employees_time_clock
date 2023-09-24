let raw_data=[];
console.log("הדף עובד");
function CreateTble(){
    let empName="";
    for(let line of raw_data){
        empName+="<option>";
        empName+= line.name;
        empName+="</option>";
    }
    document.getElementById("employeeName").innerHTML=empName;

}
async function getList() {
    let response = await fetch('/timeClock/List');
    let data = await response.json();
    raw_data = data.rows;
    console.log(raw_data);
    CreateTble();
}
async function AddNewLine() {
    let name = document.getElementById("employeeName").value;
    let entry_time = document.getElementById("entry_time").value;
    let exit_time = document.getElementById("exit_time").value;
    if(exit_time<entry_time || !entry_time || !exit_time){
        alert("הערכים אינם יכולים להיות ריקים. וכן זמן יציאה אינו יכול להיות קטן מזמן הכניסה");
    }else{
        let response = await fetch('/timeClock/Add',{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({name:name,entry_time:entry_time,exit_time:exit_time})
            }
        );
        let data = await response.json();
        console.log(data);
        getList();
    }
}
getList();