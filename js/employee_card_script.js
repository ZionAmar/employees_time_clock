let raw_data = [];
function CreateTable(){
    for(let line of raw_data) {
        document.querySelector("#firstName").innerHTML = `${line.FirstName}`;
        document.querySelector("#lastName").innerHTML = `${line.LastName}`;
        document.querySelector("#phone").innerHTML = `${line.PhoneNumber}`;
        document.querySelector("#id").innerHTML = `${line.IDNumber}`;
        document.querySelector("#address").innerHTML = `${line.Address}`;
        document.querySelector("#email").innerHTML = `${line.Email}`;
        document.querySelector("#jobTitle").innerHTML = `${line.JobTitle}`;
        document.querySelector("#startDate").innerHTML = `${line.FormattedDate}`;
        document.querySelector("#hourlyRate").innerHTML = `${line.HourlySalary}`;
        document.querySelector("#bankDetails").innerHTML = `${line.BankAccountDetails}`;
        document.querySelector("#image-preview").src = `${line.ImageURL}`;
    }
}
async function updateLine(id){
    let objToServer={};
    objToServer.id=id;
    console.log(id);
    let response = await fetch('/emp/Update', {
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
    CreateTable();
}
function updateTime() {
    document.getElementById("title").innerHTML="פרטי העובד";
}
var url = new URL(window.location.href);
var id_value = url.searchParams.get("id");
console.log(id_value);
updateTime();
updateLine(id_value);